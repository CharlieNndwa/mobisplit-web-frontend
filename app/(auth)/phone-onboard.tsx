import React, { useState, useEffect } from "react";
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput,
  Dimensions, ActivityIndicator, Alert, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { ChevronLeft, HelpCircle, ArrowRight } from "lucide-react-native";
import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const BACKEND_URL = `${API_URL}/api/auth`;

export default function PhoneOnboardScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("ZA");
  const [callingCode, setCallingCode] = useState("27");
  const [loading, setLoading] = useState(false);

  // 1. Google Auth Request
  const [gRequest, gResponse, gPromptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID", // From Google Console
    iosClientId: "YOUR_IOS_CLIENT_ID",         // From Google Console
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, 
  });

  // 2. Facebook Auth Request - FIXED: Fallback strings prevent Android crash[cite: 14]
  const [fRequest, fResponse, fPromptAsync] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || "",
    androidClientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || "", 
    iosClientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || "",
  });

  // Handle Social Responses
  useEffect(() => {
    if (gResponse?.type === 'success') {
      handleSocialLogin(gResponse.authentication?.accessToken, 'google');
    }
    if (fResponse?.type === 'success') {
      handleSocialLogin(fResponse.authentication?.accessToken, 'facebook');
    }
  }, [gResponse, fResponse]);

  const handleSocialLogin = async (token: string | undefined, provider: string) => {
    setLoading(true);
    try {
      // Fetch user info from provider
      const url = provider === 'google' 
        ? 'https://www.googleapis.com/oauth2/v3/userinfo'
        : `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`;

      const userResponse = await fetch(url, {
        headers: provider === 'google' ? { Authorization: `Bearer ${token}` } : {},
      });
      const userData = await userResponse.json();

      // Send to your backend
      const response = await fetch(`${BACKEND_URL}/social-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          full_name: userData.name,
          social_id: userData.sub || userData.id,
          provider: provider,
          profile_pic: userData.picture?.data?.url || userData.picture
        }),
      });

      const result = await response.json();
      if (result.success) {
        await SecureStore.setItemAsync('user_token', result.token);
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      Alert.alert("Login Error", "Failed to authenticate with " + provider);
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleSubmitNumber = async () => {
    if (phoneNumber.length < 9) {
      Alert.alert("Invalid Number", "Please enter a valid phone number.");
      return;
    }
    const cleanNumber = phoneNumber.replace(/\D/g, '').replace(/^0+/, '');
    const fullPhone = `+${callingCode}${cleanNumber}`;
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: fullPhone }),
      });
      const data = await response.json();
      if (data.success) {
        router.push({ pathname: "/(auth)/phone-verify", params: { phone: fullPhone } });
      } else {
        Alert.alert("Error", data.error || "Failed to send SMS.");
      }
    } catch (error) {
      Alert.alert("Connection Error", "Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconCircle}><ChevronLeft color="#020617" size={24} /></TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}><HelpCircle color="#020617" size={24} /></TouchableOpacity>
            </View>

            <MotiView 
  from={{ opacity: 0, transform: [{ translateX: -20 }] }} 
  animate={{ opacity: 1, transform: [{ translateX: 0 }] }} 
  style={styles.titleSec}
>
              <Text style={styles.title}>Welcome to MobiSplit</Text>
              <Text style={styles.subTitle}>Enter your number or use social login.</Text>
            </MotiView>

            <View style={styles.inputStack}>
              <View style={styles.countryBox}>
                <CountryPicker countryCode={countryCode} withCallingCode onSelect={onSelect} withFilter />
                <Text style={styles.codeText}>+{callingCode}</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="81 234 5678" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
              </View>
            </View>

            {/* <View style={styles.divider}>
              <View style={styles.line} /><Text style={styles.orText}>OR</Text><View style={styles.line} />
            </View> */}

            {/* Social Buttons */}
            {/* <TouchableOpacity 
                style={[styles.socialBtn, { borderColor: '#E2E8F0' }]} 
                onPress={() => gPromptAsync()}
                disabled={!gRequest}
            >
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.socialBtn, { backgroundColor: '#1877F2', borderColor: '#1877F2' }]} 
                onPress={() => fPromptAsync()}
                disabled={!fRequest}
            >
              <Text style={[styles.socialText, { color: '#FFF' }]}>Continue with Facebook</Text>
            </TouchableOpacity> */}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.continueBtn, (loading || phoneNumber.length < 9) && { opacity: 0.7 }]}
              onPress={handleSubmitNumber}
              disabled={loading || phoneNumber.length < 9}
            >
              {loading ? <ActivityIndicator color="#FFF" /> : <><Text style={styles.btnText}>Send Code</Text><ArrowRight color="#FFF" size={22} /></>}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  iconCircle: { width: 45, height: 45, borderRadius: 12, backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center" },
  titleSec: { marginTop: 20, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: "900", color: "#0F172A" },
  subTitle: { fontSize: 15, color: "#64748B", marginTop: 8 },
  inputStack: { flexDirection: "row", gap: 12, marginBottom: 25 },
  countryBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", paddingHorizontal: 12, borderRadius: 12, height: 60 },
  codeText: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginLeft: 5 },
  inputWrapper: { flex: 1, backgroundColor: "#F1F5F9", borderRadius: 12, height: 60, justifyContent: "center", paddingHorizontal: 15 },
  input: { fontSize: 20, fontWeight: "700", color: "#0F172A" },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  orText: { marginHorizontal: 10, color: '#94A3B8', fontWeight: '700' },
  socialBtn: { height: 60, borderRadius: 16, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  socialText: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  footer: { padding: 20 },
  continueBtn: { height: 65, backgroundColor: "#059669", borderRadius: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 },
  btnText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
});