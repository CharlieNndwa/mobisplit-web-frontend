import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Plus,
  Download,
  History,
  Ticket,
  RefreshCw,
  Send,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import io from "socket.io-client";

const API_BASE = "https://daringly-tacky-anemic.ngrok-free.dev";

export default function WalletScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ balance: "0.00", transactions: [] });
  const [voucherPin, setVoucherPin] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const fetchWallet = useCallback(async () => {
    try {
      const userId = await SecureStore.getItemAsync("user_id");
      const response = await fetch(`${API_BASE}/api/payments/wallet/${userId}`);
      const result = await response.json();
      setData({
        balance: result.balance || "0.00",
        transactions: result.history || [],
      });
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

// 🪙 CONSOLIDATED REAL-TIME SYNC
useEffect(() => {
  let socket: any;

  const setupSocket = async () => {
    const userId = await SecureStore.getItemAsync("user_id");
    if (!userId) return;

    // Single connection for the whole screen
    socket = io(API_BASE, {
      transports: ['websocket'], // Faster & lighter for 4GB RAM systems
    });

    // 1. Identify this connection
    socket.emit("register_user", userId);

    // 2. Listen for the specific balance update
    socket.on(`balance_update:${userId}`, (payload: any) => {
      setData((prev) => ({ 
        ...prev, 
        balance: payload.balance 
      }));
      
      // Trigger a list refresh so the history shows the new transaction
      fetchWallet();

      if (payload.message) {
        Alert.alert("MobiSplit Wallet", payload.message);
      }
    });

    // 3. Optional: Generic broadcast listener if used by backend
    socket.on("wallet:update", (newBalance: any) => {
      setData(prev => ({ ...prev, balance: newBalance }));
    });
  };

  // Initial data fetch
  fetchWallet();
  setupSocket();

  // 🪙 CLEANUP: Crucial for your laptop's stability
  return () => {
    if (socket) {
      socket.disconnect();
    }
  };
}, [fetchWallet]); // Added fetchWallet as dependency

  const handleFlashRedeem = async () => {
    if (voucherPin.length < 5)
      return Alert.alert("Error", "Enter valid Flash PIN");
    setRedeeming(true);
    try {
      const userId = await SecureStore.getItemAsync("user_id");
      const res = await fetch(`${API_BASE}/api/payments/topup/flash`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, voucherPin }),
      });
      const json = await res.json();
      if (json.success) {
        setVoucherPin("");
        Alert.alert("Success", "Funds added!");
      } else {
        throw new Error(json.error);
      }
    } catch (e: any) {
      Alert.alert("Failed", e.message);
    } finally {
      setRedeeming(false);
    }
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.legoHeader}>MobiWallet</Text>

        <View style={styles.legoBrickYellow}>
          <View style={styles.brickStuds}>
            <View style={styles.stud} />
            <View style={styles.stud} />
          </View>
          <Text style={styles.label}>TOTAL BALANCE</Text>
          <Text style={styles.balanceText}>
            R {parseFloat(data.balance).toFixed(2)}
          </Text>
        </View>

        {/* FLASH VOUCHER SECTION */}
        <View style={styles.flashSection}>
          <Text style={styles.sectionTitle}>
            <Ticket color="#BADA55" size={16} /> FLASH TOP-UP
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="1VOUCHER PIN"
              placeholderTextColor="#666"
              value={voucherPin}
              onChangeText={setVoucherPin}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.redeemBtn}
              onPress={handleFlashRedeem}
              disabled={redeeming}
            >
              {redeeming ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.btnTxt}>ADD</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonRow}>
  {/* DEPOSIT / ADD FUNDS */}
  <TouchableOpacity
    style={styles.legoButtonBlue}
    onPress={() => router.push("/add-funds")}
  >
    <Plus color="#FFF" size={24} strokeWidth={3} />
    <Text style={styles.buttonText}>ADD FUNDS</Text>
  </TouchableOpacity>

  {/* NEW: P2P TRANSFER */}
  <TouchableOpacity
    style={styles.legoButtonPurple}
    onPress={() => router.push("/transfer")}
  >
    <Send color="#FFF" size={24} strokeWidth={3} />
    <Text style={styles.buttonText}>TRANSFER</Text>
  </TouchableOpacity>

  {/* CASHOUT / WITHDRAW */}
  <TouchableOpacity
    style={styles.legoButtonRed}
    onPress={() =>
      router.push({
        pathname: "/withdraw",
        params: { currentBalance: data.balance },
      })
    }
  >
    <Download color="#FFF" size={24} strokeWidth={3} />
    <Text style={styles.buttonText}>CASHOUT</Text>
  </TouchableOpacity>
</View>

        <Text style={styles.sectionTitle}>
          <History color="#FFF" size={16} /> ACTIVITY LOG
        </Text>
        {data.transactions.map((tx: any, i) => (
          <View key={i} style={styles.legoListBrick}>
            <View>
              <Text style={styles.txDesc}>
                {tx.reference_text || tx.transaction_type}
              </Text>
              <Text style={styles.txDate}>
                {new Date(tx.created_at).toLocaleDateString()}
              </Text>
            </View>
            <Text
              style={[
                styles.txAmount,
                { color: tx.amount < 0 ? "#FF4444" : "#BADA55" },
              ]}
            >
              {tx.amount < 0 ? `- R${Math.abs(tx.amount)}` : `+ R${tx.amount}`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  legoHeader: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 20,
  },
  legoBrickYellow: {
    backgroundColor: "#FFD700",
    borderWidth: 4,
    borderColor: "#FFF",
    padding: 25,
    borderRadius: 4,
  },
  brickStuds: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  stud: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderColor: "#000",
  },
  label: { fontWeight: "900", color: "#000", fontSize: 12 },
  balanceText: { fontSize: 44, fontWeight: "900", color: "#000" },
  flashSection: {
    marginTop: 20,
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#BADA55",
  },
  inputRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#FFF",
    padding: 10,
    borderRadius: 4,
    fontWeight: "bold",
  },
  redeemBtn: {
    backgroundColor: "#BADA55",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
  },
  btnTxt: { color: "#000", fontWeight: "900" },
  // buttonRow: { flexDirection: "row", gap: 15, marginVertical: 25 },
  // legoButtonBlue: {
  //   flex: 1,
  //   backgroundColor: "#0055FF",
  //   borderWidth: 4,
  //   borderColor: "#FFF",
  //   padding: 15,
  //   alignItems: "center",
  //   borderRadius: 4,
  // },
  // legoButtonRed: {
  //   flex: 1,
  //   backgroundColor: "#FF0000",
  //   borderWidth: 4,
  //   borderColor: "#FFF",
  //   padding: 15,
  //   alignItems: "center",
  //   borderRadius: 4,
  // },
  // buttonText: { color: "#FFF", fontWeight: "900", marginTop: 5 },
  // sectionTitle: {
  //   fontWeight: "900",
  //   fontSize: 18,
  //   color: "#FFF",
  //   marginBottom: 15,
  // },
  legoListBrick: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#333",
  },
  txDesc: { fontWeight: "800", color: "#FFF", textTransform: "uppercase" },
  txDate: { fontSize: 11, color: "#666" },
  txAmount: { fontWeight: "900", fontSize: 16 },
  buttonRow: { 
    flexDirection: "row", 
    gap: 10, // Reduced gap slightly to fit 3 buttons better
    marginVertical: 25 
  },
  legoButtonBlue: {
    flex: 1,
    backgroundColor: "#0055FF",
    borderWidth: 4,
    borderColor: "#FFF",
    padding: 12, // Reduced padding for better fit
    alignItems: "center",
    borderRadius: 4,
  },
  // NEW PURPLE BUTTON FOR TRANSFER
  legoButtonPurple: {
    flex: 1,
    backgroundColor: "#8A2BE2",
    borderWidth: 4,
    borderColor: "#FFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  legoButtonRed: {
    flex: 1,
    backgroundColor: "#FF0000",
    borderWidth: 4,
    borderColor: "#FFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: { 
    color: "#FFF", 
    fontWeight: "900", 
    fontSize: 10, // Slightly smaller text to prevent wrapping on 3-column layout
    marginTop: 5 
  },
  sectionTitle: {
  fontWeight: "900",
  fontSize: 18,
  color: "#FFF",
  marginBottom: 15,
  textTransform: "uppercase", // Keeps with the 'Lego' blocky aesthetic
},
});
