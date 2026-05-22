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

// 🪙 Define width and height at the top level
const { width } = Dimensions.get("window");

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
      const response = await fetch(
        "https://daringly-tacky-anemic.ngrok-free.dev/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailString, password }),
        },
      );

      // 💎 A++ LOGIC: Handle Unverified Status (HTTP 403)
      if (response.status === 403) {
        return Alert.alert(
          "Account Not Verified",
          "Please check your inbox and click the verification link to activate your account.",
        );
      }

      const data = await response.json();

      // 🪙 UPGRADED: Add this directly inside your successful login check inside handleSignIn()
      if (data.success) {
        // Save core authentication tokens and identifiers
        await SecureStore.setItemAsync("user_token", data.token);
        await SecureStore.setItemAsync("user_id", data.user.id);
        await SecureStore.setItemAsync("user_full_name", data.user.full_name);

        // Set initial driver status values from backend response
        await SecureStore.setItemAsync(
          "is_verified_driver",
          String(data.user.is_driver),
        );

        // Determine Routing Intersection
        const savedUserType = await SecureStore.getItemAsync("user_type");

        if (!savedUserType) {
          // If no onboarding role choice is registered locally, send to role picker screen
          router.replace("/(auth)/user-type");
        } else if (
          savedUserType === "driver" &&
          data.user.is_driver === false
        ) {
          router.replace("/onboarding/driver-setup");
        } else {
          router.replace("/(tabs)/home");
        }
      } else {
        Alert.alert(
          "Login Failed",
          data.error || "Please check your email and password.",
        );
      }
    } catch (e) {
      console.error("Sign-In Error:", e);
      Alert.alert("Error", "Server unreachable. Check your Ngrok tunnel.");
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
