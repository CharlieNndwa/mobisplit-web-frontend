import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView as GestureScrollView } from "react-native-gesture-handler";
import { MotiView, MotiText } from "moti";
import { Landmark, History as HistoryIcon, TrendingUp } from "lucide-react-native";
import { useRouter } from "expo-router";

// Define Transaction Interface to fix "never" errors
interface Transaction {
  id: number;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'RIDE_PAYMENT';
  description: string;
  created_at: string;
}

export default function EarningsDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<{balance: string, ledger: Transaction[]}>({ 
    balance: "0.00", 
    ledger: [] 
  });

  const fetchWalletData = useCallback(async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/payments/wallet/YOUR_USER_ID`);
      const data = await response.json();
      if (data) setWallet(data);
    } catch (error) {
      console.error("Finance Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWalletData(); }, [fetchWalletData]);

  const recentTransactions = useMemo(() => wallet.ledger?.slice(0, 5) || [], [wallet.ledger]);

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#1E40AF" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <GestureScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MotiView 
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.balanceCard}
        >
          <View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <MotiText style={styles.balanceAmount}>R{wallet.balance}</MotiText>
          </View>
          <View style={styles.statsBadge}><TrendingUp size={16} color="#10B981" /><Text style={styles.statsText}>+12.5%</Text></View>
        </MotiView>

        <View style={styles.actionGrid}>
          {/* Fix: Explicitly casting path to avoid TS2345 */}
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push("/driver/withdraw" as any)}>
            <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}><Landmark color="#1E40AF" size={24} /></View>
            <Text style={styles.actionTitle}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push("/driver/history" as any)}>
            <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}><HistoryIcon color="#7C3AED" size={24} /></View>
            <Text style={styles.actionTitle}>History</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((tx, index) => (
          <MotiView 
            key={tx.id}
            from={{ opacity: 0, translateX: -20 }} // Fix: Changed 'x' to 'translateX'
            animate={{ opacity: 1, translateX: 0 }} // Fix: Changed 'x' to 'translateX'
            transition={{ delay: index * 100 }}
            style={styles.txItem}
          >
            <View style={styles.txInfo}>
              <Text style={styles.txDesc}>{tx.description}</Text>
              <Text style={styles.txDate}>{new Date(tx.created_at).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.txVal, { color: tx.type === 'WITHDRAWAL' ? '#EF4444' : '#10B981' }]}>
              {tx.type === 'WITHDRAWAL' ? '-' : '+'}R{tx.amount}
            </Text>
          </MotiView>
        ))}
      </GestureScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { padding: 20 },
    balanceCard: { backgroundColor: '#1E40AF', borderRadius: 30, padding: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    balanceLabel: { color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: 13 },
    balanceAmount: { color: '#FFF', fontSize: 40, fontWeight: '900' },
    statsBadge: { backgroundColor: 'rgba(16,185,129,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row' },
    statsText: { color: '#10B981', fontWeight: '800', fontSize: 12, marginLeft: 4 },
    actionGrid: { flexDirection: 'row', gap: 15, marginVertical: 30 },
    actionCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 25, padding: 20, alignItems: 'center', elevation: 2 },
    iconBox: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    actionTitle: { fontWeight: '800', color: '#1E293B' },
    txItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 22, marginBottom: 12 },
    txInfo: { flex: 1 },
    txDesc: { fontWeight: '800', color: '#1E293B' },
    txDate: { color: '#94A3B8', fontSize: 12 },
    txVal: { fontWeight: '900', fontSize: 16 }
});