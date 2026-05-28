import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { Fingerprint, Mail, Lock, User, Phone, ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti'; 
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app/api/auth";
const { width } = Dimensions.get('window');

// 🐯 ADDED: Robust Top-Center Toaster
const ComicalToast = ({ visible, message }: { visible: boolean, message: string }) => {
  return (
    <AnimatePresence>
      {visible && (
        <MotiView 
          from={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 50, opacity: 1 }}
          exit={{ translateY: -100, opacity: 0 }}
          style={styles.toastContainer}
        >
          <View style={styles.toastBadge}>
            <Text style={styles.toastText}>✨ {message} ✨</Text>
          </View>
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default function AuthScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // 🐯 ADDED: Toast visibility state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      return Alert.alert("Not Supported", "Biometrics not set up.");
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });

    if (result.success) {
      const storedEmail = await SecureStore.getItemAsync('saved_email');
      const storedPass = await SecureStore.getItemAsync('saved_password');

      if (storedEmail && storedPass) {
        performLogin(storedEmail, storedPass);
      } else {
        Alert.alert("Setup Required", "Please log in manually once first.");
      }
    }
  };

  const performLogin = async (loginEmail: string, loginPass: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });
      const data = await res.json();

      if (res.ok) {
        // 🐯 Tiger Change: Store email for the Home screen dynamic header
        await SecureStore.setItemAsync('user_email', loginEmail);
        
        triggerToast("SUCCESSFULLY LOGGED IN!");
        
        const alreadySaved = await SecureStore.getItemAsync('saved_email');
        if (!alreadySaved) {
          Alert.alert("Enable Biometrics?", "Use Fingerprint next time?", [
            { text: "No", onPress: () => router.replace('/') },
            { text: "Yes", onPress: async () => {
              await SecureStore.setItemAsync('saved_email', loginEmail);
              await SecureStore.setItemAsync('saved_password', loginPass);
              router.replace('/');
            }}
          ]);
        } else {
          setTimeout(() => router.replace('/'), 1000);
        }
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (e) {
      Alert.alert("Server Error", "Check connection.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, phone_number: phone, password }),
      });
      if (res.ok) {
        triggerToast("VERIFY YOUR EMAIL!");
        setTimeout(() => setIsLogin(true), 2000);
      } else {
        const data = await res.json();
        Alert.alert("Error", data.error);
      }
    } catch (e) {
      Alert.alert("Server Error", "Check connection.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0B0E14', '#111827', '#064E3B']} style={StyleSheet.absoluteFill} />

      {/* 🐯 Tiger Change: Toast at the top center */}
      <ComicalToast visible={toastVisible} message={toastMsg} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          <Text style={styles.subtitle}>{isLogin ? 'Sign in to ride' : 'Join MobiSplit today'}</Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <>
              <View style={styles.inputBox}><User color="#00F2C3" size={20} /><TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#64748B" onChangeText={setFullName} /></View>
              {/* 🐯 Tiger Change: phone-pad keyboard for numbers */}
              <View style={styles.inputBox}><Phone color="#00F2C3" size={20} /><TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" placeholderTextColor="#64748B" onChangeText={setPhone} /></View>
            </>
          )}
          <View style={styles.inputBox}><Mail color="#00F2C3" size={20} /><TextInput style={styles.input} placeholder="Email" placeholderTextColor="#64748B" autoCapitalize="none" onChangeText={setEmail} /></View>
          <View style={styles.inputBox}>
            <Lock color="#00F2C3" size={20} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={!showPassword} placeholderTextColor="#64748B" onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff color="#64748B" size={20} /> : <Eye color="#64748B" size={20} />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={isLogin ? () => performLogin(email, password) : handleSignup}>
            <Text style={styles.btnText}>{isLogin ? 'LOGIN' : 'SIGN UP'}</Text>
            <ChevronRight color="#000" size={20} />
          </TouchableOpacity>
        </View>

        {isLogin && (
          <TouchableOpacity style={styles.bioContainer} onPress={handleBiometricAuth}>
            <Fingerprint color="#00F2C3" size={40} />
            <Text style={styles.bioText}>Use Fingerprint</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 25, paddingTop: 100 },
  toastContainer: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: 9999 },
  toastBadge: { backgroundColor: '#00F2C3', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 30, borderWidth: 2, borderColor: '#000', elevation: 10 },
  toastText: { color: '#000', fontWeight: '900', fontSize: 14 },
  header: { marginBottom: 40 },
  title: { color: '#FFF', fontSize: 36, fontWeight: '900' },
  subtitle: { color: '#94A3B8', fontSize: 16 },
  form: { gap: 15 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(31,41,55,0.6)', borderRadius: 15, paddingHorizontal: 15, height: 60, borderWidth: 1, borderColor: '#1F2937' },
  input: { flex: 1, color: '#FFF', marginLeft: 10 },
  btn: { backgroundColor: '#00F2C3', height: 60, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 18, marginRight: 10 },
  bioContainer: { alignSelf: 'center', marginTop: 40, alignItems: 'center' },
  bioText: { color: '#94A3B8', fontSize: 12, marginTop: 8 }
});