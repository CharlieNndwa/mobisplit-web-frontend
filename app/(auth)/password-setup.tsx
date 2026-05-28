import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { MotiView, AnimatePresence } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2 } from 'lucide-react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const BACKEND_URL = `${API_URL}/api/auth`;

export default function PasswordSetupScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams(); // From gateway -> onboard -> here
  
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

const handleFinishRegistration = async () => {
  if (!firstName.trim() || !surname.trim() || !email.trim()) {
    Alert.alert("Missing Information", "Please fill in all fields to continue.");
    return;
  }
  
  const fullName = `${firstName.trim()} ${surname.trim()}`;

  setLoading(true);
  try {
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        phone: phone, 
        email: email.trim().toLowerCase(),
        password: password,
        fullName: fullName
      }),
    });

    const data = await response.json();

    if (data.success) {
      await SecureStore.setItemAsync('userId', data.user?.id?.toString() || "");
      await SecureStore.setItemAsync('user_token', data.token);
      await SecureStore.setItemAsync('fullName', fullName);
      await SecureStore.setItemAsync('email', email.trim().toLowerCase());
      await SecureStore.setItemAsync('phone', phone as string);

      setIsSuccess(true);
      setTimeout(() => {
        // UPDATED: Route to welcome screen
        router.replace('/(auth)/user-type');
      }, 2000);
    } else {
      Alert.alert("Registration Failed", data.error || "Check your details.");
    }
  } catch (error) {
    Alert.alert("Network Error", "Check if your backend server is running.");
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <AnimatePresence>
        {isSuccess && (
          <MotiView 
            from={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 50, opacity: 1 }}
            style={styles.toaster}
          >
            <CheckCircle2 color="#FFF" size={24} />
            <Text style={styles.toasterText}>Welcome to MobiSplit!</Text>
          </MotiView>
        )}
      </AnimatePresence>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>Final Touches</Text>
          <Text style={styles.subtitle}>Setting up profile for {phone}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#94A3B8"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Surname"
              placeholderTextColor="#94A3B8"
              value={surname}
              onChangeText={setSurname}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Create Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            style={styles.legoBtn} 
            onPress={handleFinishRegistration}
            disabled={loading || isSuccess}
          >
            <View style={styles.legoShadow} />
            <View style={[styles.legoBtnMain, { backgroundColor: '#7C3AED' }]}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>FINISH REGISTRATION</Text>}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  toaster: { position: 'absolute', top: 0, left: '10%', right: '10%', backgroundColor: '#059669', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: 999, borderWidth: 2, borderColor: '#000' },
  toasterText: { color: '#FFF', fontWeight: '900', marginLeft: 10 },
  content: { paddingHorizontal: 25, flex: 1, paddingTop: 40 },
  title: { fontSize: 32, fontWeight: '900', color: '#0F172A' },
  subtitle: { fontSize: 16, color: '#64748B', marginBottom: 20 },
  inputContainer: { height: 60, backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 2, borderColor: '#000', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 12 },
  input: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  legoBtn: { height: 65, position: 'relative', marginTop: 10 },
  legoBtnMain: { flex: 1, borderRadius: 16, borderWidth: 2, borderColor: '#000', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  legoShadow: { position: 'absolute', top: 4, left: 4, right: -4, bottom: -4, backgroundColor: '#000', borderRadius: 16, zIndex: 1 },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 16, textTransform: 'uppercase' }
});