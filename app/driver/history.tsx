import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reuse the interface
interface Transaction {
  id: number;
  amount: number;
  type: string;
  description: string;
  created_at: string;
}

export default function EarningsHistory() {
  // Fix: Initialize with the correct type instead of never[]
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/api/payments/wallet/YOUR_USER_ID`)
      .then(res => res.json())
      .then(data => setHistory(data.ledger || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()} // No longer errors on .id
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.type}>{item.description}</Text>
              <Text style={styles.amount}>R{item.amount}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    row: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderColor: '#EEE' },
    type: { fontWeight: '700' },
    amount: { fontWeight: '900', color: '#10B981' }
});