import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { authAPI } from "../../config/api"; // 🪙

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://mobisplit-backend-production.up.railway.app";

export default function SignUpScreen() {
  const router = useRouter();
  const { phone: incomingPhone } = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: (incomingPhone as string) || "",
    password: "",
  });

  const handleSignUp = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      Alert.alert("Missing Info", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // 🚀 AXIOS ENGINE SUBMISSION PIPELINE
      const response = await authAPI.register({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      const data = response.data;

      if (data.success) {
        // 🚗 CLEAN & PROFESSIONAL ROUTING ALERT
        Alert.alert(
          "🚗 Account Created",
          "Your account has been created successfully! Please choose your role to continue setup.",
          [
            {
              text: "Continue",
              onPress: async () => {
                try {
                  // Clear any leftover configuration records safely
                  await SecureStore.deleteItemAsync("user_type");
                  await SecureStore.deleteItemAsync("needs_driver_setup");
                  await SecureStore.deleteItemAsync("is_verified_driver");

                

                  // 🪙 CRITICAL FIX: Persist Session Tokens & Identity Vectors to kill 404s
                  if (data.token) {
                    await SecureStore.setItemAsync("user_token", data.token);
                  }
                  
                  const verifiedId = data.user?.id || data.user?._id;
                  if (verifiedId) {
                    await SecureStore.setItemAsync("user_id", String(verifiedId));
                  }

                  // Keep the profile contexts cached for swift screen mounting
                  await SecureStore.setItemAsync("saved_email", form.email.toLowerCase().trim());
                  await SecureStore.setItemAsync("phone", form.phone.trim());
                  await SecureStore.setItemAsync("user_full_name", form.fullName.trim());

                  // 🪙 Routes cleanly to role selection setup
                  router.replace("/user-type");
                } catch (storeError) {
                  console.error("SecureStore Reset Error:", storeError);
                  router.replace("/user-type");
                }
              },
            },
          ],
        );
      } else {
        Alert.alert(
          "Registration Failed",
          data.error || "Could not create account. Please try again.",
        );
      }
    } catch (e: any) {
      const backendError = e.response?.data?.error || e.response?.data?.message;
      Alert.alert(
        "Registration Error",
        backendError || "Connection error. Please check if the server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill in your details to start using MobiSplit
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(t) => setForm({ ...form, fullName: t })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
            keyboardType="phone-pad"
          />
        </View>

        {/* 🪙 UPGRADED PASSWORD LAYOUT WITH INLINE FLEX & ABSOLUTE RIGHT ICON BOUNDARIES */}
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.passwordField}
            placeholder="Create Password"
            placeholderTextColor="#64748B"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIconWrapper}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.6}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.legoBtn}
          onPress={handleSignUp}
          disabled={loading}
        >
          <View style={styles.legoShadow} />
          <View style={[styles.legoBtnMain, { backgroundColor: "#4C1D95" }]}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnText}>SIGN UP</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          style={{ marginTop: 25, alignItems: "center" }}
        >
          <Text style={{ color: "#64748B", fontWeight: "800" }}>
            ALREADY REGISTERED? LOG IN
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { padding: 25 },
  title: { fontSize: 32, fontWeight: "900", color: "#0F172A" },
  subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
  inputContainer: {
    height: 60,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  input: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  legoBtn: { height: 60, position: "relative", marginTop: 10 },
  legoBtnMain: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
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
  btnText: { color: "#FFF", fontWeight: "900", fontSize: 16, letterSpacing: 1 },
  /* 🪙 REFACTORED INLINE PASSWORD STRUCTURE */
  passwordInputWrapper: {
    height: 60,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingLeft: 20,
    paddingRight: 55, // Ensures the text entry path never hits the boundary of the eye toggle icon
    marginBottom: 15,
  },
  passwordField: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    height: "100%",
  },
  eyeIconWrapper: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
