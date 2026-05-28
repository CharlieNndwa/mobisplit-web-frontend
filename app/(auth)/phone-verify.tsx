import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, CheckCircle2 } from "lucide-react-native";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://mobisplit-backend-production.up.railway.app";
const BACKEND_URL = `${API_URL}/api/auth`;

export default function PhoneVerifyScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleVerifyOTP = async () => {
    if (code.length !== 6 || loading) return;

    setLoading(true);
    try {
      // 1. Verify the OTP with Twilio via Backend
      const response = await fetch(`${BACKEND_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone, code: code }),
      });

      const data = await response.json();

      if (data.success) {
        setShowToast(true);

        // 2. Check if user already exists in the database
        const checkRes = await fetch(`${BACKEND_URL}/check-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: phone }),
        });
        const checkData = await checkRes.json();

        // Wait for the toast animation before navigating[cite: 13]
        setTimeout(() => {
          setShowToast(false);

          if (checkData.exists) {
            // User exists: Send to Sign In to verify Email/Password
            router.push({
              pathname: "/(auth)/sign-in",
              params: { phone, email: checkData.email },
            });
          } else {
            // New User: Send to Password Setup
            router.push({
              pathname: "/(auth)/password-setup",
              params: { phone },
            });
          }
        }, 1500);
      } else {
        Alert.alert("Verification Failed", data.error || "Invalid code.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not connect to server. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatePresence>
        {showToast && (
          <MotiView
            from={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 50, opacity: 1 }}
            exit={{ translateY: -100, opacity: 0 }}
            style={styles.toaster}
          >
            <CheckCircle2 color="#FFF" size={24} />
            <Text style={styles.toasterText}>Phone Verified Successfully!</Text>
          </MotiView>
        )}
      </AnimatePresence>

      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ChevronLeft color="#0F172A" size={28} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          <MotiView
            from={{ opacity: 0, transform: [{ translateY: 10 }] }}
            animate={{ opacity: 1, transform: [{ translateY: 0 }] }}
          >
            <Text style={styles.title}>Verify Phone</Text>
            <Text style={styles.subtitle}>Enter the code sent to {phone}</Text>
          </MotiView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.otpInput}
              placeholder="000000"
              placeholderTextColor="#CBD5E1"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={styles.legoBtn}
            onPress={handleVerifyOTP}
            disabled={loading || code.length < 6}
          >
            <View style={[styles.legoBtnMain, { backgroundColor: "#000" }]}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.legoBtnText}>Verify & Continue</Text>
              )}
            </View>
            <View style={styles.legoShadow} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  toaster: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    backgroundColor: "#059669",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    borderWidth: 2,
    borderColor: "#000",
    elevation: 5,
  },
  toasterText: {
    color: "#FFF",
    fontWeight: "900",
    marginLeft: 10,
    fontSize: 16,
  },
  backBtn: { padding: 20 },
  content: { paddingHorizontal: 25, flex: 1 },
  title: { fontSize: 32, fontWeight: "900", color: "#0F172A" },
  subtitle: { fontSize: 16, color: "#64748B", marginTop: 10, marginBottom: 40 },
  inputContainer: {
    height: 80,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    marginBottom: 30,
  },
  otpInput: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 12,
    color: "#0F172A",
  },
  legoBtn: { height: 65, position: "relative" },
  legoBtnMain: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  legoBtnText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  legoShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "#000",
    borderRadius: 16,
    zIndex: 1,
  },
});
