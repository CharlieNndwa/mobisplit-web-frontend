import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ConfettiCannon from "react-native-confetti-cannon"; // 🪙 Added dependency
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Search,
  UploadCloud,
  X,
  Camera,
  ShieldCheck,
  Check,
  UserCircle,
} from "lucide-react-native";

// Replace your old ngrok lines with this dynamic look-up:
const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";


const SA_CITIES = [
  { id: "1", name: "Johannesburg, GP" },
  { id: "2", name: "Pretoria, GP" },
  { id: "3", name: "Soweto, GP" },
  { id: "4", name: "Cape Town, WC" },
  { id: "5", name: "Durban, KZN" },
  { id: "6", name: "Bloemfontein, FS" },
  { id: "7", name: "Vereeniging, GP" },
  { id: "8", name: "Gqeberha, EC" },
  { id: "9", name: "East London, EC" },
  { id: "10", name: "Polokwane, LP" },
  { id: "11", name: "Nelspruit, MP" },
];

const BACKEND_URL =
    `${API_BASE}/api/driver/apply`;
const HERO_IMAGE = require("../images/ChatGPT Image May 2, 2026, 12_14_36 PM.png");

export default function DriverSetupScreen() {
  const router = useRouter();
  // const [fullName, setFullName] = useState("Driver");
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  // 🪙 GOLD COIN: Added systemic state engine gates to prevent layout/navigation flickering
  const [isStateReady, setIsStateReady] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // --- LOCATION & REGION STATE ---
  const [currentRegion, setCurrentRegion] = useState("Detecting Location...");
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCitySearchModal, setShowCitySearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(SA_CITIES);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- FORM STATE ---
  const [setupStep, setSetupStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    plate: "",
    color: "",
    total_seats: 4, // Added per MobiSplit requirements
    phone_number: "", // ADD THIS LINE HERE
  });
  const [images, setImages] = useState<Record<string, string | null>>({
    profile: null,
    idFront: null,
    licenceFront: null,
    
  });

// // 🪙 FIXED LOCATION ENGINE INTERCEPTOR (Prevents the Uncaught Promise Rejection)
// useEffect(() => {
//   async function requestDeviceLocation() {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.warn("Location permissions were denied by the device workspace layout.");
//         return;
//       }

//       // Add a timeout fallback trap to handle 4GB RAM resource lags gracefully
//       let location = await Promise.race([
//         Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
//         new Promise<null>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 6000))
//       ]).catch(async () => {
//         // Fallback to last known coordinates if GPS hardware doesn't respond instantly
//         return await Location.getLastKnownPositionAsync({});
//       });

//       if (location) {
//         // Handle coordinate mapping safely
//         console.log("Device coordinates locked successfully:", location.coords);
//       }
//     } catch (err: any) {
//       console.log("Safely intercepted location exception:", err.message);
//     }
//   }
//   requestDeviceLocation();
// }, []);

  const handleCitySearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSuggestions(SA_CITIES);
      return;
    }
    setSuggestions(
      SA_CITIES.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const selectNewCity = (cityName: string) => {
    setCurrentRegion(cityName);
    setShowCitySearchModal(false);
    setShowRegionModal(false);
    setSearchQuery("");
  };

// Updated pickImage logic with auto-saving local storage persistence
  const pickImage = async (key: string, useCamera: boolean) => {
    const { status } = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "MobiSplit needs access to your camera/photos.",
      );
      return;
    }

    setLoading(true);
    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
            aspect: [1, 1],
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.7,
          });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        
        // 1. Update component tracking state instantly
        setImages((prev) => ({ ...prev, [key]: selectedUri }));
        
        // 2. Production Hardening: Commit directly to SecureStore based on the key type
        // This ensures tracking of file paths is resilient across random process cycles
        if (key === 'profile' || key === 'profile_image') {
          await SecureStore.setItemAsync('driver_profile_image_uri', selectedUri);
        } else {
          await SecureStore.setItemAsync(`driver_document_uri_${key}`, selectedUri);
        }
      }
    } catch (error) {
      console.error("Image Processing Callback Error: ", error);
      Alert.alert("Error", "Failed to capture/select image.");
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (step: number) => {
    if (step === 1 && !images.profile) {
      Alert.alert("Step 1 Incomplete", "Please upload your profile picture.");
      return false;
    }
    if (step === 2) {
      const required = ["licenceFront", "idFront"];
      if (!required.every((key) => images[key])) {
        Alert.alert("Step 2 Incomplete", "Please upload all three documents.");
        return false;
      }
    }
    return true;
  };

// Inside driver-setup.tsx - 🪙 ATOMIC VERIFICATION PERSISTENCE SUBMISSION 
const handleFinalSubmissionSuccess = async () => {
  try {
    // 🪙 GOLD COIN: Atomic transaction forcing synchronous parameters execution block
    await Promise.all([
      SecureStore.setItemAsync("needs_driver_setup", "false"), 
      SecureStore.setItemAsync("is_verified_driver", "true"),
      SecureStore.setItemAsync("driver_status", "verified"),
      SecureStore.setItemAsync("user_type", "driver"),
      SecureStore.setItemAsync("user_role", "driver"),
    ]);

    setGlobalLoading(false); 
    setShowSuccessModal(true); 
  } catch (err) {
    console.error("Hardware Storage Write Failure:", err);
    Alert.alert("Storage Error", "Failed to update local driver configuration properties securely.");
  }
};

  const submitVerification = async () => {
    if (!fullName || !currentRegion || !vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.plate) {
      Alert.alert("Missing Requirements", "Please fill in all profile fields and vehicle attributes before applying.");
      return;
    }

    if (Object.keys(images).length === 0) {
      Alert.alert("Missing Documents", "Please provide your profile and vehicle verification document blocks.");
      return;
    }

    setGlobalLoading(true);

    try {
      const userId = await SecureStore.getItemAsync("user_id"); 
      const formData = new FormData();

      formData.append("userId", userId || "");
      formData.append("full_name", fullName);
      formData.append("make", vehicleDetails.make);
      formData.append("model", vehicleDetails.model);
      formData.append("plate", vehicleDetails.plate);
      formData.append("total_seats", vehicleDetails.total_seats.toString());
      formData.append("region", currentRegion);

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          const uri = images[key] as string;
          const filename = uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename || "");
          const type = match ? `image/${match[1]}` : `image/jpeg`;

          formData.append(key, {
            uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
            name: filename || `${key}.jpg`,
            type,
          } as any);
        }
      });

      const response = await fetch(`${API_BASE}/api/driver/apply`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Automatically grant instant verification on successful submission bypass
        await handleFinalSubmissionSuccess();
      } else {
        Alert.alert("Submission Failed", result?.message || "Server error while processing your driver profile application.");
      }
    } catch (error) {
      console.error("Submit Verification Error:", error);
      Alert.alert(
        "Connection Error",
        "Could not reach the MobiSplit backend engine. Please check your active connectivity network link."
      );
    } finally {
      setGlobalLoading(false);
    }
  };



  // 🪙 FIXED LOCATION ENGINE INTERCEPTOR (Prevents Uncaught Promise Rejections on 4GB RAM)
  useEffect(() => {
    async function requestDeviceLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn("Location permissions were denied by the device workspace layout.");
          return;
        }

        // Add a timeout fallback trap to handle resource lags gracefully without throwing a crash
        let location = await Promise.race([
          Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 6000))
        ]).catch(async () => {
          // Fallback safely to last known coordinates if hardware response lags
          return await Location.getLastKnownPositionAsync({});
        });

        if (location && location.coords) {
          console.log("Device coordinates locked successfully:", location.coords);
        }
      } catch (err: any) {
        console.log("Safely intercepted location exception:", err.message);
      }
    }
    requestDeviceLocation();
  }, []);

  // 🪙 GOLD COIN: Safe verification status loading cycle sequence
  useEffect(() => {
    async function checkVerificationStatus() {
      try {
        const verifiedVal = await SecureStore.getItemAsync('is_verified_driver');
        const setupCompleted = await SecureStore.getItemAsync('needs_driver_setup');
        
        if (verifiedVal === 'true') {
          setIsVerified(true);
          // 🪙 GOLD COIN: Redirect to dashboard safely without structural double flash mounts
          router.replace("/onboarding/driver-dashboard");
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        console.error("SecureStore loading failure on Driver Onboarding:", err);
      } finally {
        setIsStateReady(true);
      }
    }
    checkVerificationStatus();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* 🪙 SUCCESS MODAL WITH CONFETTI */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            {/* 🪙 Confetti triggers immediately when modal is visible */}
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              fadeOut={true}
            />

            <MotiView
              from={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={styles.comicalCard}
            >
              <View style={styles.iconCircle}>
                <ShieldCheck color="#10B981" size={60} />
              </View>
              <Text style={styles.comicalTitle}>
                APPLICATION SUCCESSFUL! ✅
              </Text>

              {/* 🪙 FIXED: Now using images.profile from your state */}
              <View style={styles.verifiedBadgeRow}>
                {images.profile ? (
                  <Image
                    source={{ uri: images.profile }}
                    style={styles.verifiedProfileImg}
                  />
                ) : (
                  <View
                    style={[
                      styles.verifiedProfileImg,
                      {
                        backgroundColor: "#0F172A",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <UserCircle color="#94A3B8" size={50} />
                  </View>
                )}
                <View style={styles.verifiedSeal}>
                  <Check color="#FFF" size={12} />
                </View>
              </View>

              <Text style={styles.comicalSub}>
                You are now a verified MobiSplit Captain. Let's get those trips!
                🚗
              </Text>

              <TouchableOpacity
                style={styles.legoConfirm}
                onPress={() => router.replace("/onboarding/driver-dashboard")}
              >
                <Text style={styles.changeBtnText}>START EARNING 🪙</Text>
              </TouchableOpacity>
            </MotiView>
          </View>
        </Modal>

        {/* BACK BUTTON TOP LEFT */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButtonLego}
          >
            <ChevronLeft color="#000" size={28} />
          </TouchableOpacity>
        </View>

        {/* HERO IMAGE BACKGROUND */}
        <View style={styles.heroContainer}>
          <Image
            source={HERO_IMAGE}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(15,23,42,0.8)", "#0F172A"]}
            style={styles.heroGradient}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* CITY SELECTOR BUTTON UNDER HERO */}
          <TouchableOpacity
            style={styles.signingUpLego}
            onPress={() => setShowRegionModal(true)}
          >
            <View style={[styles.legoShadow, { backgroundColor: "#7E22CE" }]} />
            <View style={[styles.legoMain, styles.signingUpMain]}>
              <Text style={styles.signingUpText}>City: {currentRegion}</Text>
              <ChevronDown color="#FFF" size={18} />
            </View>
          </TouchableOpacity>
          <Text style={styles.welcomeTitle}>Setup Driver Profile</Text>
          <View style={styles.progContainer}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.progBar,
                  setupStep >= i ? styles.progActive : styles.progInactive,
                ]}
              />
            ))}
          </View>
          {/* STEP 1: PROFILE */}
          {setupStep === 1 && (
            <View style={styles.stepForm}>
              <Text style={styles.formTitle}>1. Upload Profile Photo</Text>
              <View style={styles.profileBoxContainer}>
                {images.profile ? (
                  <Image
                    source={{ uri: images.profile }}
                    style={styles.profilePreview}
                  />
                ) : (
                  <View style={styles.profilePlaceholder}>
                    <Camera color="#94A3B8" size={32} />
                  </View>
                )}
              </View>
              <View style={styles.photoActionRow}>
                <TouchableOpacity
                  style={styles.cameraBtn}
                  onPress={() => pickImage("profile", true)}
                >
                  <Camera color="#000" size={24} />
                  <Text style={styles.cameraBtnText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => pickImage("profile", false)}
                >
                  <UploadCloud color="#FFF" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* STEP 2: DOCUMENTS */}
          {setupStep === 2 && (
            <View style={styles.stepForm}>
              <Text style={styles.formTitle}>2. Legal Documents</Text>
              {["licenceFront", "idFront"].map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.photoBox}
                  onPress={() => pickImage(key, true)}
                >
                  {images[key] ? (
                    <Image
                      source={{ uri: images[key]! }}
                      style={styles.docPreview}
                    />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <UploadCloud color="#94A3B8" size={32} />
                      <Text style={styles.photoText}>Tap to Scan {key}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* STEP 3: VEHICLE */}
          {setupStep === 3 && (
            <View style={styles.stepForm}>
              <Text style={styles.formTitle}>3. Vehicle Details</Text>
              <TextInput
                placeholder="Make"
                placeholderTextColor="#64748B"
                style={styles.legoInput}
                value={vehicleDetails.make}
                onChangeText={(t) =>
                  setVehicleDetails({ ...vehicleDetails, make: t })
                }
              />
              <TextInput
                placeholder="Model"
                placeholderTextColor="#64748B"
                style={styles.legoInput}
                value={vehicleDetails.model}
                onChangeText={(t) =>
                  setVehicleDetails({ ...vehicleDetails, model: t })
                }
              />
              <TextInput
                placeholder="Plate Number"
                placeholderTextColor="#64748B"
                style={styles.legoInput}
                value={vehicleDetails.plate}
                onChangeText={(t) =>
                  setVehicleDetails({ ...vehicleDetails, plate: t })
                }
              />
              <TextInput 
              placeholder="Full Name & Surname" 
              placeholderTextColor="#64748B"
              style={styles.legoInput}
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput 
              placeholder="Operating Region (e.g. Johannesburg, GP)" 
              placeholderTextColor="#64748B"
              style={styles.legoInput}
              value={city}
              onChangeText={setCity}
            />

              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    color: "#94A3B8",
                    fontSize: 12,
                    marginBottom: 5,
                    fontWeight: "700",
                  }}
                >
                  Mobile Number (Required)
                </Text>
                <TextInput
                  style={styles.legoInput}
                  placeholder="e.g. +27 12 345 6789"
                  placeholderTextColor="#64748B"
                  value={vehicleDetails.phone_number}
                  keyboardType="phone-pad"
                  onChangeText={(val) =>
                    setVehicleDetails({ ...vehicleDetails, phone_number: val })
                  }
                />
              </View>
            </View>
          )}
          <View style={styles.navRow}>
            {setupStep > 1 && (
              <TouchableOpacity
                style={styles.legoBack}
                onPress={() => setSetupStep((prev) => prev - 1)}
              >
                <Text style={styles.navText}>Back</Text>
              </TouchableOpacity>
            )}
            {setupStep < 3 ? (
              <TouchableOpacity
                style={styles.legoNext}
                onPress={() =>
                  validateStep(setupStep) && setSetupStep((prev) => prev + 1)
                }
              >
                <Text style={styles.confirmText}>NEXT STEP</Text>
                <ChevronRight color="#000" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.legoSubmit}
                onPress={submitVerification}
                disabled={globalLoading}
              >
                {globalLoading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.confirmText}>SUBMIT APPLICATION</Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* 🪙 DEV-MODE BYPASS BUTTON */}
          <TouchableOpacity
            style={styles.demoBypass}
            onLongPress={async () => {
              try {
                const userId = await SecureStore.getItemAsync("user_id");
                const response = await fetch(`${API_BASE}/api/driver/register`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId,
                    vehicle_make: "DEMO",
                    vehicle_model: "BYPASS",
                    license_plate: "TEST-001-GP",
                  }),
                });
                if (response.ok) {
                  await handleFinalSubmissionSuccess();
                }
              } catch (e) {
                Alert.alert("Error", "Bypass failed");
              }
            }}
          >
            <Text style={styles.demoText}>Long Press for Demo Bypass</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* REGION BOTTOM SHEET */}
        <Modal visible={showRegionModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setShowRegionModal(false)}
            />
            <MotiView
              from={{ translateY: 300 }}
              animate={{ translateY: 0 }}
              style={styles.bottomSheet}
            >
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeading}>Operating Region</Text>
                <TouchableOpacity onPress={() => setShowRegionModal(false)}>
                  <X color="#FFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.sheetRegionCard}>
                <View>
                  <Text style={styles.regionLabel}>GP • MobiSplit</Text>
                  <Text style={styles.regionMain}>{currentRegion}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowCitySearchModal(true)}
                  style={styles.changeBtn}
                >
                  <Text style={styles.changeBtnText}>Change</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.legoConfirm}
                onPress={() => setShowRegionModal(false)}
              >
                <Text style={styles.confirmText}>CONFIRM</Text>
              </TouchableOpacity>
            </MotiView>
          </View>
        </Modal>

        {/* CITY SEARCH MODAL */}
        <Modal visible={showCitySearchModal} animationType="fade">
          <SafeAreaView style={styles.container}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCitySearchModal(false)}>
                <ChevronLeft color="#FFF" size={28} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Select City</Text>
              <View style={{ width: 28 }} />
            </View>
            <View style={styles.searchBar}>
              <Search color="#94A3B8" size={20} />
              <TextInput
                placeholder="Search South African cities..."
                placeholderTextColor="#64748B"
                value={searchQuery}
                onChangeText={handleCitySearch}
                style={styles.searchInput}
              />
            </View>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => selectNewCity(item.name)}
                >
                  <MapPin color="#64748B" size={20} />
                  <Text style={styles.cityItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  topHeader: { position: "absolute", top: 10, left: 20, zIndex: 100 },
  backButtonLego: {
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
  },

  heroContainer: {
    height: 280,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  heroImage: { width: "100%", height: "100%" },
  heroGradient: { ...StyleSheet.absoluteFillObject },

  scroll: { padding: 20, paddingTop: 220 },
  signingUpLego: { height: 50, marginBottom: 20 },
  legoMain: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  legoShadow: {
    position: "absolute",
    top: 4,
    left: 0,
    right: 0,
    bottom: -4,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
  },
  signingUpMain: {
    backgroundColor: "#9333EA",
    justifyContent: "space-between",
  },
  signingUpText: { color: "#FFF", fontSize: 13, fontWeight: "700" },

  welcomeTitle: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  progContainer: { flexDirection: "row", gap: 10, marginVertical: 20 },
  progBar: { flex: 1, height: 6, borderRadius: 10 },
  progActive: { backgroundColor: "#FFF" },
  progInactive: { backgroundColor: "#334155" },

  stepForm: { gap: 15 },
  formTitle: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  profileBoxContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#475569",
    backgroundColor: "#1E293B",
  },
  profilePreview: { width: "100%", height: "100%" },
  profilePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoActionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginVertical: 20,
  },
  cameraBtn: {
    backgroundColor: "#FDE047",
    flex: 1,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  cameraBtnText: { fontWeight: "900" },
  uploadBtn: {
    backgroundColor: "#4C1D95",
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  legoInput: {
    height: 60,
    backgroundColor: "#1E293B",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    color: "#FFF",
    paddingHorizontal: 15,
  },
  photoBox: {
    width: "100%",
    height: 150,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#475569",
    overflow: "hidden",
  },
  photoPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  photoText: { color: "#94A3B8", fontWeight: "700", marginTop: 10 },
  docPreview: { width: "100%", height: "100%" },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 30,
  },
  legoNext: {
    backgroundColor: "#FDE047",
    flex: 2,
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  legoBack: {
    backgroundColor: "#1E293B",
    flex: 1,
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  legoSubmit: {
    backgroundColor: "#22C55E",
    flex: 2,
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: { color: "#000", fontWeight: "900", fontSize: 16 },
  navText: { color: "#FFF", fontWeight: "800" },

  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.8)",
  //   justifyContent: "flex-end",
  // },
  bottomSheet: {
    backgroundColor: "#0F172A",
    height: 320,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetHeading: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  sheetRegionCard: {
    padding: 20,
    backgroundColor: "#1E293B",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  regionMain: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  regionLabel: { color: "#60A5FA", fontSize: 12, fontWeight: "800" },
  changeBtn: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeBtnText: { fontWeight: "800" },
  // legoConfirm: {
  //   backgroundColor: "#FDE047",
  //   height: 55,
  //   borderRadius: 15,
  //   borderWidth: 2,
  //   borderColor: "#000",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 15,
  // },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
  },
  searchInput: { color: "#FFF", flex: 1, marginLeft: 10 },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  cityItemText: { color: "#FFF", fontSize: 16 },
  // 2. Add these to your const styles = StyleSheet.create({...}) at the bottom
  inputGroup: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  inputLabel: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  comicalCard: {
    backgroundColor: "#1E293B",
    width: "100%",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FDE047", // Yellow comical border
  },
  iconCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#064E3B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#10B981",
  },
  comicalTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  comicalSub: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
  },
  // 🪙 4. ADD TO driver-setup.tsx styles:
  verifiedBadgeRow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#10B981", // Lime Green
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
    backgroundColor: "#0F172A",
  },
  verifiedProfileImg: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
  },
  verifiedSeal: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#10B981",
    borderRadius: 20,
    padding: 6,
    borderWidth: 3,
    borderColor: "#1E293B",
  },
  legoConfirm: {
    backgroundColor: "#FDE047",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#000",
    marginTop: 10,
  },
  demoBypass: {
    marginTop: 40,
    padding: 10,
    alignItems: "center",
    opacity: 0.3, // Hidden/Subtle
  },
  demoText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
