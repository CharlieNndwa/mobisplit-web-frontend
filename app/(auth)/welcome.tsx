import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView, MotiText } from "moti";
import MaskedView from "@react-native-masked-view/masked-view";
import { ArrowRight, ShieldCheck, Globe } from "lucide-react-native";
import * as SecureStore from 'expo-secure-store'; // Import SecureStore to bypass auth guard

const { width, height } = Dimensions.get("window");

const HERO_IMG = require("../images/welcomez.png");
const LOGO_IMG = require("../images/logo__3_-removebg-preview.png");

export default function WelcomeScreen() {
  const router = useRouter();

// welcome.tsx handleGetStarted logic
const handleGetStarted = async () => {
  try {
    // 🧊 FIX: Standardized key to 'user_type' matching registration clusters to fix parsing crashes
    const existingRole = await SecureStore.getItemAsync('user_type');
    
    if (!existingRole) {
      await SecureStore.setItemAsync('user_type', 'rider');
    }
    
    // Ensure the baseline parameters are wiped before loading home layout
    await SecureStore.deleteItemAsync('has_seen_advertiser_modal');
    
    // 🧊 ROUTE NAVIGATION RESETTING: Force dynamic routing parameters into Layout Tab
    router.replace({
      pathname: "/(tabs)/home",
      params: { triggerPromo: "true" }
    });
  } catch (error) {
    console.error("Welcome Navigation Error:", error); //[cite: 16]
    router.replace("/(tabs)/home"); //[cite: 16]
  }
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* --- HERO SECTION --- */}
      <View style={styles.heroContainer}>
        <Image source={HERO_IMG} style={styles.heroImage} resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(2, 6, 23, 0.7)", "#020617"]}
          style={styles.heroOverlay}
        />
      </View>

      {/* --- LOGO ALIGNMENT --- */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.logoWrapper}
      >
        <Image
          source={LOGO_IMG}
          style={styles.brandLogo}
          resizeMode="contain"
        />
      </MotiView>

      {/* --- MIDNIGHT CONTENT --- */}
      <View style={styles.contentContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <Text style={styles.welcomeLabel}>WELCOME TO</Text>

            {/* GREEN & WHITE GRADIENT HEADING[cite: 26] */}
            <MaskedView
              style={styles.maskedView}
              maskElement={<Text style={styles.headingText}>MOBISPLIT</Text>}
            >
              <LinearGradient
                colors={["#22C55E", "#FFFFFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </MaskedView>
          </MotiView>

          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 400 }}
            style={styles.description}
          >
            100% South African owned commute app. Choose your destination,
            choose your driver, and travel on your terms.
          </MotiText>

          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <ShieldCheck color="#22C55E" size={18} />
              <Text style={styles.featureText}>Verified Safety</Text>
            </View>
            <View style={styles.featureItem}>
              <Globe color="#3B82F6" size={18} />
              <Text style={styles.featureText}>Locally Owned</Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* PRIMARY ACTION BUTTON[cite: 26] */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGetStarted}
            style={styles.primaryButton}
          >
            <LinearGradient
              colors={["#22C55E", "#166534"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <ArrowRight color="#FFF" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  heroContainer: { height: height * 0.45, width: width },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  logoWrapper: {
    position: "absolute",
    top: height * 0.38,
    alignSelf: "center",
    zIndex: 10,
  },
  brandLogo: { width: 160, height: 50 },
  contentContainer: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  welcomeLabel: {
    color: "#94A3B8",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  },
  maskedView: { height: 60, width: "100%" },
  headingText: { fontSize: 48, fontWeight: "900", color: "black" }, // Black for MaskedView logic
  description: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 15,
  },
  featureRow: { flexDirection: "row", gap: 15, marginTop: 20 },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 8,
    borderRadius: 10,
  },
  featureText: { color: "#F8FAFC", fontSize: 12, fontWeight: "700" },
  primaryButton: { marginBottom: 30, borderRadius: 16, overflow: "hidden" },
  buttonGradient: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});