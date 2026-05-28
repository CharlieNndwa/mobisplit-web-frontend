import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image, // 🪙 Ensure this is from react-native
  Dimensions, // 🪙 Added to fix the 'width' error
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// 🪙 Added Ionicons for the eye toggle
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { authAPI } from "../../config/api"; // 🚀 Clean API Import

// 🪙 Define width and height at the top level
const { width } = Dimensions.get("window");
const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://mobisplit-backend-production.up.railway.app";

export default function SignInScreen() {
  const router = useRouter();
  const { phone, email: savedEmail } = useLocalSearchParams();
  const USER_NAME_KEY = "user_full_name";
  // 🎠 Fixed: Convert search params to string to resolve TS2339 and TS2769
  const [email, setEmail] = useState(savedEmail ? String(savedEmail) : "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // 🪙 State for password visibility
  const [showPassword, setShowPassword] = useState(false);

const handleSignIn = async () => {
    const emailString = String(email).trim().toLowerCase();

    if (!emailString || !password) {
      return Alert.alert(
        "Missing Info",
        "Please enter both email and password.",
      );
    }

    setLoading(true);
    try {
      // 🚀 CENTRALIZED AXIOS AUTH CALL
      const response = await authAPI.login({ email: emailString, password });
      const data = response.data;

      if (data.success) {
        // Save core authentication tokens and identifiers
        if (data.token) {
          await SecureStore.setItemAsync("user_token", data.token);
        }

        // 🪙 CRITICAL FIX: Resolve ID property schema variants safely
        const backendUserId = data.user?.id || data.user?._id;
        if (backendUserId) {
          await SecureStore.setItemAsync("user_id", String(backendUserId));
        }

        // Resolve name payload structures safely
        const resolvedName = data.user?.fullName || data.user?.full_name || "";
        if (resolvedName) {
          await SecureStore.setItemAsync("user_full_name", resolvedName);
        }

        // Cache baseline fields to optimize layout rendering
        if (data.user?.email) {
          await SecureStore.setItemAsync("saved_email", String(data.user.email).toLowerCase().trim());
        }
        if (data.user?.phone) {
          await SecureStore.setItemAsync("phone", String(data.user.phone));
        }

        // Set initial driver status values from backend response safely
        const isDriverUser = data.user?.isDriver || data.user?.is_driver || false;
        await SecureStore.setItemAsync("is_verified_driver", String(isDriverUser));

        // Determine identity and set the user_type session value explicitly
        if (isDriverUser === true) {
          await SecureStore.setItemAsync("user_type", "driver");
        } else {
          await SecureStore.setItemAsync("user_type", "rider");
        }

        // 🚗 ROUTE DIRECTLY TO WELCOME SCREEN AFTER SIGN IN
        router.replace("/welcome");
        
      } else {
        Alert.alert(
          "Login Failed",
          data.error || "Please check your email and password.",
        );
      }
    } catch (e: any) {
      console.error("Sign-In Error:", e);

      if (e.response && e.response.status === 403) {
        Alert.alert(
          "Account Not Verified",
          "Please check your inbox and click the verification link to activate your account.",
        );
      } else {
        const serverMessage =
          e.response?.data?.error ||
          "Server unreachable. Please check your network or Ngrok tunnel.";
        Alert.alert("Error", serverMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert(
      "Email Required", 
      "Please enter your registered email address in the field above to receive a reset token."
    );
    return;
  }

  setLoading(true);
  try {
    // 🚀 INJECT AXIOS FORGOT PASSWORD ROUTE DISPATCHER
    const response = await authAPI.forgotPassword(email.trim().toLowerCase());
    const data = response.data;

    if (data.success) {
      Alert.alert(
        "Reset Token Sent",
        data.message || "Check your mailbox for instructions to secure your profile access parameters.",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert("Reset Failed", data.error || "Could not dispatch reset token link.");
    }
  } catch (err: any) {
    console.error("🚨 Forgot Password Stream Interrupted:", err);
    
    // Fall back safely to internal Axios error layers if present
    const backendError = err.response?.data?.error || err.response?.data?.message;
    Alert.alert(
      "Request Failed",
      backendError || "Unable to reach the authentication sub-clusters. Confirm your backend instance is running."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {phone ? "Link Account" : "Welcome Back"}
        </Text>
        <Text style={styles.subtitle}>
          {phone
            ? `Sign in to link ${phone} to your profile`
            : "Enter your credentials to access your MobiSplit account"}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email} // 🎠 Now correctly typed as string
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* 🪙 PASSWORD INPUT WITH EYE ICON */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#64748B"
            />
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity
            onPress={handleForgotPassword}
            style={{
              alignSelf: "flex-end",
              marginTop: 5,
              marginBottom: 20,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: "#64748B", fontWeight: "700", fontSize: 14 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={styles.legoBtn}
          onPress={handleSignIn}
          disabled={loading}
        >
          <View style={styles.legoShadow} />
          <View style={[styles.legoBtnMain, { backgroundColor: "#4C1D95" }]}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnText}>SIGN IN</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 25, alignItems: "center" }}
        >
          <Text style={{ color: "#64748B", fontWeight: "800" }}>
            BACK TO GATEWAY
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { padding: 25, justifyContent: "center", flex: 1 },
  title: { fontSize: 32, fontWeight: "900", color: "#0F172A" },
  subtitle: { fontSize: 16, color: "#64748B", marginBottom: 35 },
  // inputContainer: {
  //   height: 65,
  //   backgroundColor: "#F8FAFC",
  //   borderRadius: 16,
  //   borderWidth: 2,
  //   borderColor: "#000",
  //   justifyContent: "center",
  //   paddingHorizontal: 20,
  //   marginBottom: 15,
  // },
  input: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  legoBtn: { height: 65, position: "relative", marginTop: 10 },
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
  // 🪙 Hero Styles
  heroContainer: { width: width, height: 220, marginBottom: 20 },
  heroImage: { width: "100%", height: "100%" },
  // content: { paddingHorizontal: 25 },
  inputContainer: {
    height: 65,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row", // 🪙 Required for Eye Icon alignment
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  eyeIcon: { paddingLeft: 10 },
});
