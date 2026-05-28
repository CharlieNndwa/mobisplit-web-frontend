import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://mobisplit-backend-production.up.railway.app";

export default function WithdrawScreen() {
  const router = useRouter();
  const { currentBalance } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("BANK"); // BANK or EWALLET
  const [bankProvider, setBankProvider] = useState("FNB");

  const handleWithdraw = async () => {
    const val = parseFloat(amount);
    const balanceLimit = parseFloat((currentBalance as string) || "0");

    if (isNaN(val) || val <= 0)
      return Alert.alert("Error", "Enter a valid amount.");
    if (val > balanceLimit)
      return Alert.alert(
        "Insufficient Funds",
        "Your balance is insufficient to route this withdrawal transaction.",
      );
    if (!account)
      return Alert.alert(
        "Error",
        "Destination routing target parameter cannot be empty.",
      );

    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("user_token");
      if (!token) {
        setLoading(false);
        return Alert.alert("Authentication Error", "Session expired.");
      }

      // Routes dynamically down selected clearing pipeline infrastructure
      const targetEndpoint =
        withdrawalMethod === "BANK" ? "withdraw-bank" : "withdraw-ewallet";

      const response = await fetch(
        `${API_BASE}/api/payments/${targetEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: val,
            destinationAccount: account,
            provider:
              withdrawalMethod === "BANK" ? bankProvider : "CELL_REMITTANCE",
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert(
          "Processing Complete",
          `Withdrawal Request for R${val} successfully dispatched.`,
        );
        router.back();
      } else {
        Alert.alert(
          "Transaction Rejected",
          data.message || "Failed processing internal financial ledger update.",
        );
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        "Connection Failure",
        "Server mesh could not establish transactional connection context.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Withdraw</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>AVAILABLE DISBURSEMENT POOL</Text>
        <Text style={styles.cardVal}>
          R {parseFloat((currentBalance as string) || "0.00").toFixed(2)}
        </Text>
      </View>

      <Text style={styles.label}>DISBURSEMENT MODE METHOD</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={withdrawalMethod}
          onValueChange={(itemValue) => setWithdrawalMethod(itemValue)}
          dropdownIconColor="#FFF"
          style={{ color: "#FFF" }}
        >
          <Picker.Item label="Traditional Bank Transfer" value="BANK" />
          <Picker.Item label="Instant Mobile E-Wallet" value="EWALLET" />
        </Picker>
      </View>

      {withdrawalMethod === "BANK" && (
        <>
          <Text style={styles.label}>
            SELECT FINANCIAL CLEARING INSTITUTION
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={bankProvider}
              onValueChange={(itemValue) => setBankProvider(itemValue)}
              dropdownIconColor="#FFF"
              style={{ color: "#FFF" }}
            >
              <Picker.Item label="First National Bank (FNB)" value="FNB" />
              <Picker.Item label="Standard Bank" value="STANDARD" />
              <Picker.Item label="Capitec Bank" value="CAPITEC" />
              <Picker.Item label="Nedbank" value="NEDBANK" />
              <Picker.Item label="ABSA" value="ABSA" />
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>
        {withdrawalMethod === "BANK"
          ? "ACCOUNT NUMBER"
          : "RECIPIENT PHONE NUMBER (E-WALLET)"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={
          withdrawalMethod === "BANK"
            ? "Enter Bank Account Number"
            : "Enter cell number for cash out token"
        }
        placeholderTextColor="#444"
        keyboardType="numeric"
        value={account}
        onChangeText={setAccount}
      />

      <Text style={styles.label}>WITHDRAW AMOUNT (ZAR)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#444"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.btn, loading && { opacity: 0.7 }]}
        onPress={handleWithdraw}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.btnText}>PROCEED WITHDRAWAL</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 25, paddingTop: 60 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: { color: "#FFF", fontSize: 28, fontWeight: "900", marginLeft: 10 },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
    marginBottom: 25,
  },
  cardLabel: { color: "#888", fontWeight: "800", fontSize: 11 },
  cardVal: { color: "#FFF", fontSize: 30, fontWeight: "900", marginTop: 5 },
  label: { color: "#888", marginBottom: 8, fontWeight: "700", fontSize: 12 },
  pickerContainer: {
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
    overflow: "hidden",
  },
  input: {
    backgroundColor: "#111",
    color: "#FFF",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#000", fontWeight: "900", fontSize: 16 },
});
