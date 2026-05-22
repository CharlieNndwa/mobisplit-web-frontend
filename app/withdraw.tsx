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
import { Picker } from "@react-native-picker/picker"; // Run: npx expo install @react-native-picker/picker

const API_BASE = "https://daringly-tacky-anemic.ngrok-free.dev";

export default function WithdrawScreen() {
  const router = useRouter();
  const { currentBalance } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(""); // This acts as the recipient phone number
  const [bankProvider, setBankProvider] = useState("FNB"); // Default selection

  const handleWithdraw = async () => {
    const val = parseFloat(amount);

    // Validation
    if (!val || val <= 0) return Alert.alert("Error", "Enter a valid amount.");
    if (val > parseFloat(currentBalance as string))
      return Alert.alert("Insufficient Funds", "Balance is too low.");
    if (!account)
      return Alert.alert("Error", "Enter the recipient phone number.");

    setLoading(true);
    try {
      const userId = await SecureStore.getItemAsync("user_id");
      const response = await fetch(`${API_BASE}/api/payments/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: val,
          phoneNumber: account, // Corrected key to match backend expectation
          bankProvider: bankProvider,
        }),
      });

      if (response.ok) {
        Alert.alert(
          "Success",
          `Withdrawal initiated via ${bankProvider}. Check your SMS for the ATM PIN.`,
        );
        router.push("/(tabs)/wallet");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Engine Error");
      }
    } catch (e: any) {
      Alert.alert(
        "Withdrawal Failed",
        e.message || "Bank gateway busy. Try again shortly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronLeft color="#FFD700" size={35} />
      </TouchableOpacity>

      <Text style={styles.title}>CASHOUT</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>AVAILABLE BALANCE</Text>
        <Text style={styles.cardVal}>R {currentBalance || "0.00"}</Text>
      </View>

      <Text style={styles.label}>Select Bank Provider</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bankProvider}
          onValueChange={(itemValue: string) => setBankProvider(itemValue)}
          style={styles.picker}
          dropdownIconColor="#FFD700"
        >
          <Picker.Item label="FNB eWallet" value="FNB" />
          <Picker.Item label="ABSA CashSend" value="ABSA" />
          <Picker.Item label="Standard Bank Instant Money" value="Standard" />
        </Picker>
      </View>

      <Text style={styles.label}>Withdraw Amount (ZAR)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 100"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Recipient Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="071 234 5678"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={account}
        onChangeText={setAccount}
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
  title: { color: "#FFF", fontSize: 32, fontWeight: "900", marginVertical: 20 },
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
    marginBottom: 20,
  },
  cardLabel: { color: "#888", fontWeight: "800" },
  cardVal: { color: "#FFF", fontSize: 30, fontWeight: "900" },
  label: { color: "#888", marginBottom: 8, fontWeight: "700", fontSize: 14 },
  pickerContainer: {
    backgroundColor: "#111",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    color: "#FFF",
    height: 55,
  },
  input: {
    backgroundColor: "#111",
    color: "#FFF",
    padding: 18,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  btn: {
    backgroundColor: "#FFD700",
    padding: 22,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { fontWeight: "900", fontSize: 18, color: "#000" },
});
