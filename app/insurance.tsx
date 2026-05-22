import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Linking,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ShieldCheck,
  ArrowLeft,
  Send,
  CheckCircle2,
  XCircle,
  Phone,
  FileText,
  BadgeCheck,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import MaskedView from "@react-native-masked-view/masked-view";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";

// Updated to the requested path
const HERO_IMAGE =
  "https://t4.ftcdn.net/jpg/05/15/30/57/360_F_515305790_58wwwoB0DbvAidgDZbK7U3ZPhUvvfjzy.jpg";

const LOGO_IMG = require("../app/images/logo__3_-removebg-preview.png");

const BROKER_CERT = require("../app/CamScanner 2026-02-03 11.31.pdf");

export default function InsuranceScreen() {
  const router = useRouter();
  const [hasInsurance, setHasInsurance] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  // State variable names consolidated to 'form' to match JSX calls
  const [form, setForm] = useState({
    provider: "",
    policyNumber: "",
    expiry: "",
  });

  const handleSaveInsurance = async () => {
    // 1. Validation
    if (!form.provider || !form.policyNumber) {
      return Alert.alert(
        "Missing Details",
        "Please fill in your provider and policy number.",
      );
    }

    setLoading(true);

    try {
      // 2. Get currentUserId from SecureStore (where you saved it at login)
      const currentUserId = await SecureStore.getItemAsync("user_id");

      if (!currentUserId) {
        setLoading(false);
        return Alert.alert(
          "Session Expired",
          "Please log in again to save details.",
        );
      }

      // 3. API Call to your PostgreSQL Backend
      // Use your ngrok URL to allow your physical phone to talk to your local server
      const response = await fetch(
        "https://daringly-tacky-anemic.ngrok-free.dev/api/insurance/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            userId: currentUserId,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        // 4. Update Local Storage for Instant UI Refresh
        await SecureStore.setItemAsync(
          "user_insurance_data",
          JSON.stringify(form),
        );
        await SecureStore.setItemAsync("has_active_insurance", "true");

        Alert.alert(
          "Success",
          "Your insurance details have been verified and saved.",
          [{ text: "OK", onPress: () => router.back() }],
        );
      } else {
        throw new Error(result.message || "Failed to save to database");
      }
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert(
        "Error",
        "Could not save insurance details. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApplyMobisplit = () => {
    const subject = "Mobisplit Insurance Application";
    const body = `Hi Mobisplit Team,\n\nI would like to apply for the Passenger Liability Cover.\n\nPlease contact me with more details.\n\nRegards.`;
    Linking.openURL(
      `mailto:info@mobisplit.com?subject=${subject}&body=${body}`,
    );
  };

  const handleOpenPDF = async () => {
    try {
      // 2. Load the asset and get a local URI
      const asset = Asset.fromModule(BROKER_CERT);
      await asset.downloadAsync();

      if (asset.localUri) {
        // 3. Open the native sharing/preview sheet
        await Sharing.shareAsync(asset.localUri, {
          mimeType: "application/pdf",
          dialogTitle: "Broker Qualification Certificate",
          UTI: "com.adobe.pdf", // for iOS support
        });
      }
    } catch (error) {
      Alert.alert("Error", "Could not open the certificate at this time.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed: StatusBar imported from react-native */}
      <StatusBar barStyle="light-content" />

      {/* Fixed: 'bounces={false}' used instead of invalid 'bounceless' */}
      <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
        {/* 1. Professional Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(15,23,42,0.9)", "#0F172A"]}
            style={styles.heroOverlay}
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <View style={styles.heroTextContent}>
            {/* --- GRADIENT MASKED TITLE --- */}
            <MaskedView
              style={styles.maskedView}
              maskElement={<Text style={styles.heroTitle}>Insurance </Text>}
            >
              <LinearGradient
                colors={["#38BDF8", "#818CF8", "#C084FC"]} // Sky -> Indigo -> Purple
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </MaskedView>

            <Text style={styles.heroSub}>
              Protecting you and your passengers on every journey.
            </Text>
          </View>
        </View>

        <View style={styles.contentBody}>
          {hasInsurance === null ? (
            <View style={styles.card}>
              <Text style={styles.questionText}>
                Do you currently have active insurance?
              </Text>
              <View style={styles.choiceRow}>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.btnYes]}
                  onPress={() => setHasInsurance(true)}
                >
                  <CheckCircle2 color="#FFF" size={20} />
                  <Text style={styles.choiceBtnText}>YES, I HAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.choiceBtn, styles.btnNo]}
                  onPress={() => setHasInsurance(false)}
                >
                  <XCircle color="#FFF" size={20} />
                  <Text style={styles.choiceBtnText}>NO, I DON'T</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : hasInsurance ? (
            /* --- FORM FOR EXISTING INSURANCE --- */
            <View style={styles.formSection}>
              <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Policy Details</Text>
                <TouchableOpacity onPress={() => setHasInsurance(null)}>
                  <Text style={styles.changeText}>Change Selection</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Insurance Provider (e.g. Discovery, Old Mutual)"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={form.provider}
                onChangeText={(t) => setForm({ ...form, provider: t })}
              />
              <TextInput
                placeholder="Policy Number"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={form.policyNumber}
                onChangeText={(t) => setForm({ ...form, policyNumber: t })}
              />
              <TextInput
                placeholder="Expiry Date (DD/MM/YYYY)"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={form.expiry}
                onChangeText={(t) => setForm({ ...form, expiry: t })}
              />

              <TouchableOpacity
                style={[styles.submitBtn, loading && { opacity: 0.7 }]}
                onPress={handleSaveInsurance}
                disabled={loading}
              >
                <Text style={styles.submitText}>
                  {loading ? "VERIFYING..." : "VERIFY & SAVE"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* --- MOBISPLIT TRUST & INSURANCE CENTER --- */
            <View style={styles.offerSection}>
              {/* 1. Brand Identity */}
              <View style={styles.logoContainer}>
                <Image
                  source={LOGO_IMG}
                  style={styles.brandLogoSmall}
                  resizeMode="contain"
                />
              </View>

              <MaskedView
                style={styles.offerTitleMask}
                maskElement={
                  <Text style={styles.offerTitle}>MobiSplit Insurance</Text>
                }
              >
                <LinearGradient
                  colors={["#38BDF8", "#818CF8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </MaskedView>

              {/* 2. Broker Professional Context */}
              <View style={styles.brokerCard}>
                <View style={styles.brokerHeader}>
                  <BadgeCheck color="#22C55E" size={20} />
                  <Text style={styles.brokerBadgeText}>
                    QUALIFIED BROKER ASSISTED
                  </Text>
                </View>
                <Text style={styles.offerDesc}>
                  Get covered by our certified insurance broker. We provide
                  expert guidance to ensure you have the best passenger
                  liability protection.
                </Text>
              </View>

              {/* 3. Call Center / Direct Contact */}
              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => Linking.openURL("tel:0815198003")}
              >
                <View style={styles.phoneCircle}>
                  <Phone color="#FFF" size={20} />
                </View>
                <View>
                  <Text style={styles.contactLabel}>DIRECT CALL CENTER</Text>
                  <Text style={styles.contactName}>Brian: 081 519 8003</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.pdfPlaceholder}
                onPress={handleOpenPDF}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <FileText color="#CBD5E1" size={20} />
                  <Text style={styles.pdfText}>View Certificate</Text>
                </View>
              </TouchableOpacity>

              {/* 5. Primary Action */}
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={handleApplyMobisplit}
              >
                <Send color="#FFF" size={20} style={{ marginRight: 10 }} />
                <Text style={styles.submitText}>APPLY VIA EMAIL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setHasInsurance(null)}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.changeText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  scroll: { paddingBottom: 40 },
  heroContainer: { height: 300, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 12,
  },
  // heroTextContent: { position: "absolute", bottom: 30, left: 25 },
  // heroTitle: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  // heroSub: { color: "#94A3B8", fontSize: 16, marginTop: 5, maxWidth: "80%" },

  contentBody: { padding: 25, marginTop: -20 },
  card: {
    backgroundColor: "#1E293B",
    padding: 25,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  questionText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 25,
  },
  choiceRow: { gap: 12 },
  choiceBtn: {
    height: 60,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnYes: { backgroundColor: "#22C55E" },
  btnNo: { backgroundColor: "#EF4444" },
  choiceBtnText: { color: "#FFF", fontWeight: "900", fontSize: 16 },

  formSection: { gap: 15 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { color: "#FFF", fontSize: 20, fontWeight: "900" },

  input: {
    backgroundColor: "#1E293B",
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 16,
  },
  submitBtn: {
    height: 60,
    backgroundColor: "#38BDF8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  benefitList: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    marginBottom: 30,
  },
  benefitItem: {
    color: "#38BDF8",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 8,
  },

  heroTextContent: {
    position: "absolute",
    bottom: 70,
    left: 25,
    right: 25,
    zIndex: 20,
  },
  maskedView: {
    height: 55, // Adjust height based on font size
    width: "100%",
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -1.5, // Unique tight spacing for modern look
    color: "black", // MaskedView requires a base color for the mask
    textTransform: "uppercase", // Adds a bold, professional authority
  },
  heroSub: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    lineHeight: 22,
    opacity: 0.9,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Makes text pop against the image
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  offerSection: {
    backgroundColor: "#1E293B",
    padding: 24,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  logoContainer: {
    // Removed background, padding, and borderRadius to let the logo breathe
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  brandLogoSmall: {
    width: 220, // Increased size
    height: 80, // Increased size
    // If your logo has a natural white background in the PNG/JPG,
    // you can add tintColor: '#FFF' here if it's a solid icon,
    // otherwise, leave as is.
  },
  offerTitleMask: { height: 35, width: "100%" },
  offerTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  offerDesc: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  brokerCard: {
    backgroundColor: "rgba(56, 189, 248, 0.05)",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.1)",
  },
  brokerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  brokerBadgeText: {
    color: "#22C55E",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },

  phoneCircle: { backgroundColor: "#38BDF8", padding: 12, borderRadius: 50 },
  contactLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  contactName: { color: "#FFF", fontSize: 16, fontWeight: "800" },

  pdfHeaderText: { color: "#94A3B8", fontSize: 12, fontWeight: "700" },

  pdfText: { color: "#CBD5E1", fontSize: 14, fontWeight: "600" },

  submitText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
  changeText: { color: "#38BDF8", fontWeight: "800" },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    width: "100%",
    padding: 18,
    borderRadius: 20,
    marginTop: 25, // Increased spacing from content above
    gap: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },

  pdfViewerContainer: {
    width: "100%",
    marginTop: 35, // Significant gap after Call Center
    marginBottom: 35, // Significant gap before Apply Button
  },

  pdfHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12, // More space between the label and the dashed box
  },

  pdfPlaceholder: {
    height: 64,
    backgroundColor: "#1E293B", // Slightly lighter to distinguish from back
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#38BDF8", // Theme color for the border
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10, // Internal gap from "Broker Certification" header
  },

  applyBtn: {
    height: 65,
    backgroundColor: "#4F46E5",
    borderRadius: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10, // Extra breathing room
  },
});
