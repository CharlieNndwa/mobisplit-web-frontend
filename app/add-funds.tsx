import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { WebView } from 'react-native-webview'; // Standard, highly stable component
import { CreditCard, ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function AddFundsScreen() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('100');
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const router = useRouter();

  // 1. Initialize Payment via your Backend (Port 5000)
  const initializePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) return Alert.alert("Error", "Enter amount");
    
    setLoading(true);
    try {
      const email = "user@mobisplit.app"; // Replace with dynamic email if available
      const response = await fetch(`https://daringly-tacky-anemic.ngrok-free.dev/api/payments/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) * 100, email }) // Paystack uses cents[cite: 10]
      });

      const data = await response.json();
      if (data.authorization_url) {
        setPaymentUrl(data.authorization_url); // This URL opens the bank detail input screen
      } else {
        throw new Error("Init failed");
      }
    } catch (error) {
      Alert.alert("Error", "Could not start payment session.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Monitor WebView for Success
  const handleNavigationChange = (state: any) => {
    if (state.url.includes('callback') || state.url.includes('success')) {
      setPaymentUrl(null);
      Alert.alert("MobiWallet", "Transaction processed successfully!");
      router.replace('/(tabs)/wallet');
    }
  };

  if (paymentUrl) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setPaymentUrl(null)}>
          <Text style={{ color: '#FFF', fontWeight: 'bold' }}>CANCEL</Text>
        </TouchableOpacity>
        <WebView 
          source={{ uri: paymentUrl }} 
          onNavigationStateChange={handleNavigationChange}
          style={{ marginTop: 40 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}><ChevronLeft color="#FFD700" size={32} /></TouchableOpacity>
        <Text style={styles.header}>DEPOSIT</Text>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>AMOUNT (ZAR)</Text>
        <TextInput 
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={initializePayment} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : (
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
  container: { flex: 1, backgroundColor: '#000', padding: 25, paddingTop: 60 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  header: { fontSize: 24, fontWeight: '900', color: '#FFF', marginLeft: 10 },
  inputCard: { backgroundColor: '#111', padding: 20, borderRadius: 8, marginBottom: 30 },
  label: { color: '#888', fontWeight: '800', fontSize: 12 },
  amountInput: { color: '#FFD700', fontSize: 40, fontWeight: '900', marginTop: 10 },
  payButton: { backgroundColor: '#FFD700', padding: 20, borderRadius: 8 },
  btnContent: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { fontWeight: '900', fontSize: 16 },
  closeBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10 },
  footer: { marginTop: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, paddingBottom: 20 },
  footerText: { color: '#444', fontSize: 10, fontWeight: '800' }
});