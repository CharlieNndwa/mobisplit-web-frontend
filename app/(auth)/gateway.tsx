import React, { useState, useEffect } from "react"; // 🪙 Added useEffect here
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { Phone, Mail, UserPlus, Fingerprint } from "lucide-react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

// Updated to use the local image from your app/images folder
const HERO_IMAGE = require("../images/herro.png");
const FACEBOOK_ICON = "https://cdn-icons-png.flaticon.com/128/5968/5968764.png";
const API_URL = "https://daringly-tacky-anemic.ngrok-free.dev/api/auth";

export default function GatewayScreen() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<CountryCode>("ZA");
  const [callingCode, setCallingCode] = useState("27");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

// 🪙 REFINED: AUTO-REDIRECT WITH ROLE-BASED NAVIGATION
useEffect(() => {
  const checkExistingSession = async () => {
    try {
      const session = await SecureStore.getItemAsync("user_session");
      const token = await SecureStore.getItemAsync("user_token");

      if (session && token) {
        const response = await fetch(`${API_URL}/validate-token`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
          },
        });

        const data = await response.json(); // 🪙 Get the data to check role

        if (response.ok && data.valid) {
          // Check role and route accordingly
          if (data.isDriver) {
             router.replace("/onboarding/driver-dashboard");
          } else {
             router.replace("/(tabs)/home");
          }
        } else {
          // Token is dead or user not found! Wipe it.
          await SecureStore.deleteItemAsync("user_session");
          await SecureStore.deleteItemAsync("user_token");
        }
      }
    } catch (e) {
      console.error("Session Validation Error:", e);
    }
  };
  checkExistingSession();
}, []);

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      return Alert.alert(
        "Not Supported",
        "Biometrics not set up on this device.",
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login to MobiSplit with Biometrics",
    });

    if (result.success) {
      const storedEmail = await SecureStore.getItemAsync("saved_email");
      const storedPass = await SecureStore.getItemAsync("saved_password");

      if (storedEmail && storedPass) {
        performLogin(storedEmail, storedPass);
      } else {
        Alert.alert(
          "Setup Required",
          "Please sign in with email/password once to enable fingerprint.",
        );
      }
    }
  };

  const performLogin = async (loginEmail: string, loginPass: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });
      const data = await res.json();

      if (res.ok) {
        await SecureStore.setItemAsync("user_email", loginEmail);
        // UPDATED: Route to welcome screen instead of home
        router.replace("/(auth)/welcome"); 
      } else {
        Alert.alert("Authentication Failed", data.error || "Please sign in manually.");
      }
    } catch (e) {
      Alert.alert("Server Error", "Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneContinue = async () => {
    if (!phone || phone.length < 9) {
      Alert.alert("Invalid Number", "Please enter your mobile number.");
      return;
    }
    setLoading(true);
    const fullPhone = `+${callingCode}${phone}`;
    try {
      const response = await fetch(`${API_URL}/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: fullPhone }),
      });
      const data = await response.json();
      if (data.exists) {
        router.push({
          pathname: "/(auth)/sign-in",
          params: { email: data.email },
        });
      } else {
        router.push({
          pathname: "/(auth)/sign-up",
          params: { phone: fullPhone },
        });
      }
    } catch (error) {
      Alert.alert("Error", "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const LegoButton = ({
    title,
    iconUrl,
    icon: Icon,
    onPress,
    color = "#FBBF24",
    textColor = "#000",
    isPrimary = false,
  }: any) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.legoBtnContainer}
        onPress={onPress}
        disabled={loading}
      >
        <View style={styles.legoShadow} />
        <View
          style={[
            styles.legoBtnMain,
            { backgroundColor: color, height: isPrimary ? 65 : 60 },
          ]}
        >
          {loading && title === "Continue" ? (
            <ActivityIndicator color={textColor} />
          ) : (
            <>
              {iconUrl ? (
                <Image source={{ uri: iconUrl }} style={styles.btnIconImage} />
              ) : (
                Icon && (
                  <Icon
                    color={textColor}
                    size={20}
                    style={{ marginRight: 12 }}
                  />
                )
              )}
              <Text
                style={[
                  styles.legoBtnText,
                  { color: textColor, fontSize: isPrimary ? 17 : 15 },
                ]}
              >
                {title}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FFF" }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Navy Blue Hero Section with Magic Glow */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={["#001F3F", "#003366", "#001F3F"]}
            style={StyleSheet.absoluteFill}
          />

          {/* Animated Magic Effects */}
          <MotiView
            from={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ type: "timing", duration: 3000, loop: true }}
            style={styles.magicGlow}
          />

          <View style={styles.imageContainer}>
            <Image source={HERO_IMAGE} style={styles.heroImage} />
          </View>
        </View>

        {/* Clipped Content Card */}
        <View style={styles.contentCard}>
          <Text style={styles.heading}>Move with MobiSplit</Text>

          <View style={styles.phoneInputRow}>
            <TouchableOpacity style={styles.countryPickerBox}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withCallingCode
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCallingCode(c.callingCode[0]);
                }}
              />
              <Text style={styles.callingCodeText}>+{callingCode}</Text>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Mobile number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={styles.pillInput}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <LegoButton
            title="Continue"
            icon={Phone}
            onPress={handlePhoneContinue}
          />

          <TouchableOpacity
            style={styles.bioContainer}
            onPress={handleBiometricAuth}
          >
            <View style={styles.bioCircle}>
              <Fingerprint color="#001F3F" size={32} />
            </View>
            <Text style={styles.bioText}>Sign in with Fingerprint</Text>
          </TouchableOpacity>

          <LegoButton
            title="Create New Account"
            icon={UserPlus}
            color="#10B981"
            textColor="#FFF"
            isPrimary={true}
            onPress={() => router.push("/(auth)/sign-up")}
          />

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR SIGN IN WITH</Text>
            <View style={styles.line} />
          </View>

          <LegoButton
            title="Sign in with Email"
            icon={Mail}
            color="#FFF"
            onPress={() => router.push("/(auth)/sign-in")}
          />
          <View style={{ height: 10 }} />
          <LegoButton
            title="Sign in with Facebook"
            iconUrl={FACEBOOK_ICON}
            color="#1877F2"
            textColor="#FFF"
            onPress={() => {}}
          />
          <View style={styles.footerSpacer} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: "#FFF" },
  heroSection: {
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  magicGlow: {
    position: "absolute",
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    backgroundColor: "rgba(76, 29, 149, 0.4)",
    zIndex: 1,
  },
  imageContainer: {
    width: width,
    height: 280,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "90%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  contentCard: {
    flex: 1,
    padding: 25,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40, // Visual "Clipping" effect
    borderTopRightRadius: 40,
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 20,
    textAlign: "center",
  },
  phoneInputRow: { flexDirection: "row", gap: 10, marginBottom: 15 },
  countryPickerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#000",
  },
  callingCodeText: { fontWeight: "800", color: "#0F172A", marginLeft: 2 },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  pillInput: { height: 50, fontSize: 16, fontWeight: "700", color: "#0F172A" },
  legoBtnContainer: { marginBottom: 18, position: "relative" },
  legoBtnMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 2,
  },
  btnIconImage: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: "contain",
  },
  legoBtnText: { fontWeight: "900", textTransform: "uppercase" },
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  line: { flex: 1, height: 2, backgroundColor: "#E2E8F0" },
  orText: {
    color: "#94A3B8",
    paddingHorizontal: 15,
    fontSize: 11,
    fontWeight: "900",
  },
  footerSpacer: { height: 40 },
  bioContainer: { alignSelf: "center", marginBottom: 25, alignItems: "center" },
  bioCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#001F3F",
    marginBottom: 8,
  },
  bioText: { color: "#64748B", fontSize: 13, fontWeight: "700" },
});
