import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ArrowLeftRight, ChevronLeft, Smartphone } from 'lucide-react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";

export default function TransferScreen() {
  const router = useRouter();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const normalizePhone = (phone: string) => {
    let cleaned = phone.replace(/[^0-9+]/g, ''); 
    if (cleaned.startsWith('+27')) {
      return '0' + cleaned.slice(3);
    }
    return cleaned;
  };

  const handleP2PTransfer = async () => {
    if (!recipient || !amount) return Alert.alert("Error", "Fill in all fields");
    
    const targetRecipient = normalizePhone(recipient);
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return Alert.alert("Error", "Enter a valid positive transfer amount.");
    }

    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("user_token");
      if (!token) {
        setLoading(false);
        return Alert.alert("Authentication Error", "Session expired.");
      }

      const response = await fetch(`${API_BASE}/api/payments/transfer-p2p`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientPhone: targetRecipient,
          amount: parsedAmount
        })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        Alert.alert("Success", `R${parsedAmount} transferred to ${targetRecipient} successfully.`);
        router.back();
      } else {
        Alert.alert("Transfer Failed", resData.message || "Unable to complete processing execution.");
      }
    } catch (error) {
      console.error("Transfer system error:", error);
      Alert.alert("Network Error", "Unable to route request to backend server clusters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button Header Framework */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Send Funds</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>RECIPIENT CELLPHONE / ID</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 0821234567" 
          placeholderTextColor="#666"
          value={recipient}
          onChangeText={setRecipient}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>AMOUNT (ZAR)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="0.00" 
          placeholderTextColor="#666" 
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.btn} onPress={handleP2PTransfer} disabled={loading}>
          {loading ? <ActivityIndicator color="#000"/> : (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <ArrowLeftRight color="#000" size={20} />
              <Text style={styles.btnText}>TRANSFER TO WALLET</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 60 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  title: { color: '#FFF', fontSize: 28, fontWeight: '900', marginLeft: 10 },
  card: { backgroundColor: '#111', padding: 20, borderRadius: 10, borderWidth: 2, borderColor: '#333' },
  label: { color: '#888', marginBottom: 8, fontWeight: 'bold', fontSize: 12 },
  input: { backgroundColor: '#222', color: '#FFF', padding: 15, borderRadius: 8, marginBottom: 20, fontWeight: 'bold', fontSize: 16 },
  btn: { backgroundColor: '#FFD700', padding: 18, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  btnText: { color: '#000', fontWeight: '900', fontSize: 14 }
});