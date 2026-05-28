import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { WebView } from "react-native-webview";
import { CreditCard, ChevronLeft, ShieldCheck } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://mobisplit-backend-production.up.railway.app";

export default function AddFundsScreen() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("100");
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const router = useRouter();

  const initializePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return Alert.alert("Error", "Enter a valid deposit amount.");
    }

    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("user_token");
      if (!token) {
        setLoading(false);
        return Alert.alert(
          "Authentication Error",
          "Session expired. Re-login to continue."
        );
      }

      // FIX: Payload now provides an explicit email parameter to satisfy Paystack requirements
      const response = await fetch(`${API_BASE}/api/payments/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Math.round(parseFloat(amount) * 100), // Securely parse to absolute integer cents
          email: "customer@mobisplit.app", // Fallback required context parameter mapping
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend Http Operational Rejection Log:", errorText);
        throw new Error(`Server returned status code: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle instances where Paystack maps properties nested inside a secondary 'data' block
      const targetUrl = data.authorization_url || data.data?.authorization_url;

      if (targetUrl) {
        setPaymentUrl(targetUrl);
      } else {
        throw new Error("Missing payload authorization parameters from server structure.");
      }
    } catch (error: any) {
      console.error("Paystack Gateway Error: ", error);
      Alert.alert(
        "Payment Initialization Failure",
        "Could not start transaction session. Please verify connection credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState: any) => {
    if (
      navState.url.includes("checkout/done") ||
      navState.url.includes("callback")
    ) {
      setPaymentUrl(null);
      Alert.alert(
        "Processing",
        "Your transaction is pending update over real-time sockets."
      );
      router.back();
    }
  };

  if (paymentUrl) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <SafeAreaView
          style={{
            backgroundColor: "#111",
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setPaymentUrl(null)}>
            <ChevronLeft color="#FFF" size={28} />
          </TouchableOpacity>
          <Text
            style={{
              color: "#FFF",
              fontSize: 18,
              marginLeft: 15,
              fontWeight: "bold",
            }}
          >
            Secure Payment Gateway
          </Text>
        </SafeAreaView>
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="#FFD700"
              size="large"
              style={StyleSheet.absoluteFill}
            />
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.header}>Add Funds</Text>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>ENTER AMOUNT (ZAR)</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          placeholderTextColor="#444"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={initializePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <View style={styles.btnContent}>
            <CreditCard color="#000" size={24} />
            <Text style={styles.btnText}>PAY WITH CARD</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <ShieldCheck color="#444" size={16} />
        <Text style={styles.footerText}>SECURE PAYSTACK GATEWAY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 25, paddingTop: 60 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 40 },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: { fontSize: 24, fontWeight: "900", color: "#FFF", marginLeft: 10 },
  inputCard: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  label: { color: "#888", fontWeight: "800", fontSize: 12 },
  amountInput: {
    color: "#FFD700",
    fontSize: 40,
    fontWeight: "900",
    marginTop: 10,
  },
  payButton: { backgroundColor: "#FFD700", padding: 20, borderRadius: 8 },
  btnContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btnText: { color: "#000", fontWeight: "900", fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
  footerText: { color: "#444", fontWeight: "bold", fontSize: 11 },
});