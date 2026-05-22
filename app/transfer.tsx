import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ArrowLeftRight, Smartphone } from 'lucide-react-native';

const API_BASE = "https://daringly-tacky-anemic.ngrok-free.dev";

export default function TransferScreen() {
  const router = useRouter();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

// 1. Add the utility function inside your TransferScreen component
const normalizePhone = (phone: string) => {
  // Remove all spaces, dashes, or special characters
  let cleaned = phone.replace(/[^0-9+]/g, ''); 
  
  // Convert +27 prefix to 0 for local compatibility
  if (cleaned.startsWith('+27')) {
    return '0' + cleaned.slice(3);
  }
  return cleaned;
};

// 2. Updated handleP2PTransfer function
const handleP2PTransfer = async () => {
  if (!recipient || !amount) return Alert.alert("Error", "Fill in all fields");

  // Apply normalization before the API call
  const cleanRecipient = normalizePhone(recipient);
  const transferAmount = parseFloat(amount);

  if (isNaN(transferAmount) || transferAmount <= 0) {
    return Alert.alert("Error", "Please enter a valid amount.");
  }

  setLoading(true);
  try {
    const userId = await SecureStore.getItemAsync('user_id');
    const res = await fetch(`${API_BASE}/api/payments/transfer-p2p`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        senderId: userId, 
        recipientPhone: cleanRecipient, // Sending the normalized number
        amount: transferAmount 
      })
    });

    const data = await res.json();
    
    if (data.success) {
      Alert.alert("Success", data.message);
      router.back();
    } else {
      throw new Error(data.message || "Transfer failed");
    }
  } catch (e: any) {
    Alert.alert("Transfer Failed", e.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEND MONEY</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Recipient Phone Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="071 234 5678" 
          placeholderTextColor="#666" 
          value={recipient}
          onChangeText={setRecipient}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>Amount (ZAR)</Text>
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
            <>
              <ArrowLeftRight color="#000" size={20} />
              <Text style={styles.btnText}>TRANSFER TO WALLET</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 60 },
  title: { color: '#FFF', fontSize: 28, fontWeight: '900', marginBottom: 20 },
  card: { backgroundColor: '#111', padding: 20, borderRadius: 10, borderWidth: 2, borderColor: '#333' },
  label: { color: '#888', marginBottom: 5, fontWeight: 'bold' },
  input: { backgroundColor: '#222', color: '#FFF', padding: 15, borderRadius: 5, marginBottom: 20, fontSize: 18 },
  btn: { backgroundColor: '#BADA55', padding: 18, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#000', fontWeight: '900', fontSize: 16 }
});