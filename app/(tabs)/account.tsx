import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "expo-router"; // 🪙 Add this import
import * as ImagePicker from "expo-image-picker";
import {
  Wallet,
  ChevronRight,
  Car,
  LogOut,
  Mail,
  Camera,
  Star,
  Tag,
  Info,
  UserCircle,
  Users,
  LayoutDashboard,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const IMAGE_KEY = "user_profile_image";
const DRIVER_STATUS_KEY = "is_verified_driver";
const USER_NAME_KEY = "user_full_name";

export default function AccountScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const IMAGE_KEY = "user_profile_image";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isDriver, setIsDriver] = useState(false);
  const [userRole, setUserRole] = useState("rider"); // Added missing state
  const [fullName, setFullName] = useState("Mobisplit User");
  const [isVerifiedDriver, setIsVerifiedDriver] = useState(false); // Added missing state

  // 🪙 STRUCTURAL SINGLE REPOSITORY STATE PIPELINE
  const [accountContext, setAccountContext] = useState({
    role: "rider",
    isVerified: false,
    vehicleDetails: { make: "", model: "", plate: "" }
  });

// 🪙 Update 3: Enforcing synchronization mapping into layout components via dynamic endpoint profiles
  const syncAccountState = useCallback(async () => {
    try {
      const uid = await SecureStore.getItemAsync("user_id");
      const savedName = await SecureStore.getItemAsync("user_full_name");
      const savedRole = await SecureStore.getItemAsync("user_role") || await SecureStore.getItemAsync("user_type") || "rider";
      const verifiedStatus = await SecureStore.getItemAsync("is_verified_driver");
      const token = await SecureStore.getItemAsync("user_token");

      const localMake = await SecureStore.getItemAsync("vehicleMake") || "";
      const localModel = await SecureStore.getItemAsync("vehicleModel") || "";
      const localPlate = await SecureStore.getItemAsync("vehiclePlate") || "";

      if (uid) setUserId(uid);
      if (savedName) setFullName(savedName);
      setUserRole(savedRole);
      setIsVerifiedDriver(verifiedStatus === "true" || savedRole === "driver");

      setAccountContext(prev => ({
        ...prev,
        role: savedRole,
        isVerified: verifiedStatus === "true" || savedRole === "driver",
        vehicleDetails: {
          make: localMake || prev.vehicleDetails.make,
          model: localModel || prev.vehicleDetails.model,
          plate: localPlate || prev.vehicleDetails.plate
        }
      }));

      if (!uid) return;

      const response = await fetch(`${API_URL}/api/user/status/${uid}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
      });

      const data = await response.json();

      if (data.success && data.status) {
        const isServerDriver = data.status.role === "driver" || data.status.driver_status === "verified" || data.status.driver_status === "VERIFIED";
        const dbRole = isServerDriver ? "driver" : "rider";

        setUserRole(dbRole);
        setIsVerifiedDriver(isServerDriver);

        const serverMake = data.status.vehicleMake || data.status.vehicle_make || localMake || "BMW";
        const serverModel = data.status.vehicleModel || data.status.vehicle_model || localModel || "320i (E46)";
        const serverPlate = data.status.vehiclePlate || data.status.plate_number || localPlate || "MOBI-SPLIT-GP";

        setAccountContext({
          role: dbRole,
          isVerified: isServerDriver,
          vehicleDetails: {
            make: serverMake,
            model: serverModel,
            plate: serverPlate
          }
        });

        await SecureStore.setItemAsync("user_role", dbRole);
        await SecureStore.setItemAsync("user_type", dbRole);
        await SecureStore.setItemAsync("is_verified_driver", String(isServerDriver));
        await SecureStore.setItemAsync("vehicleMake", serverMake);
        await SecureStore.setItemAsync("vehicleModel", serverModel);
        await SecureStore.setItemAsync("vehiclePlate", serverPlate);
      }
    } catch (error) {
      console.error("🔒 High-Priority Profile Sync Intercept Failure:", error);
    }
  }, []);

// Sync state loop every time screen gets brought into active layout focus
  useFocusEffect(
    useCallback(() => {
      syncAccountState();
    }, [syncAccountState])
  );

 useEffect(() => {
  // Initial mount cache population
  syncAccountState();
  SecureStore.getItemAsync(IMAGE_KEY).then((img) => img && setProfileImage(img));
}, [syncAccountState]);

  // 🪙 UPGRADED: Synchronized Component Mount Data Pipeline
  const fetchUserData = useCallback(async () => {
    try {
      const uid = await SecureStore.getItemAsync("user_id");
      const savedName = await SecureStore.getItemAsync("user_full_name");
      const savedRole =
        (await SecureStore.getItemAsync("user_role")) ||
        (await SecureStore.getItemAsync("user_type"));
      const verifiedStatus =
        await SecureStore.getItemAsync("is_verified_driver");

      if (savedName) setFullName(savedName);
      if (savedRole) {
        setUserRole(savedRole);
        setIsDriver(savedRole === "driver");
      }
      setIsVerifiedDriver(verifiedStatus === "true");

      if (uid) {
        const response = await fetch(`${API_URL}/api/users/${uid}`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        const data = await response.json();
        if (data.success) {
          setFullName(data.user.full_name);
          const activeRole = data.user.is_driver ? "driver" : "rider";
          setUserRole(activeRole);
          setIsDriver(data.user.is_driver);
        }
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    SecureStore.getItemAsync("user_id").then((id) => setUserId(id));
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();
    // Set the userId state so upload functions have access to it
    SecureStore.getItemAsync("userId").then((id) => setUserId(id));
  }, [fetchUserData]);

  // 🪙 Critical: Load the image on mount
  useEffect(() => {
    const loadSavedImage = async () => {
      const savedImg = await SecureStore.getItemAsync(IMAGE_KEY);
      if (savedImg) setProfileImage(savedImg);
    };
    loadSavedImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // 🪙 Conducive for 4GB RAM processing limits
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await SecureStore.setItemAsync(IMAGE_KEY, uri);
      await uploadImageToServer(uri);
    }
  };

  const uploadImageToServer = async (uri: string) => {
    if (!userId) return;
    setLoading(true);
    try {
      const formData = new FormData();
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("profilePic", { uri, name: filename, type } as any);
      formData.append("userId", userId);

      // 🪙 FIX: Added ngrok-skip-browser-warning header
      const response = await fetch(`${API_URL}/api/user/update`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (response.ok) {
        Alert.alert("Success 🪙", "Profile picture saved to your account!");
      } else {
        const errorData = await response.json();
        console.error("Upload Error Details:", errorData);
      }
    } catch (error) {
      console.error("Upload Request Error:", error);
      Alert.alert("Upload Failed", "Image could not be saved to server.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = async () => {
    setProfileImage(null);
    await SecureStore.deleteItemAsync(IMAGE_KEY);
  };

// 🪙 HARDENED: Thorough clear down sequence removing session state completely
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        onPress: async () => {
          setLoading(true);
          try {
            await SecureStore.deleteItemAsync("user_id");
            await SecureStore.deleteItemAsync("userId");
            await SecureStore.deleteItemAsync("profile_id");
            await SecureStore.deleteItemAsync("user_token");
            await SecureStore.deleteItemAsync("user_session"); 

            await SecureStore.deleteItemAsync("user_role"); 
            await SecureStore.deleteItemAsync("user_type"); 
            await SecureStore.deleteItemAsync("is_verified_driver");
            await SecureStore.deleteItemAsync("needs_driver_setup");

            await SecureStore.deleteItemAsync(IMAGE_KEY); 
            await SecureStore.deleteItemAsync(USER_NAME_KEY); 
            await SecureStore.deleteItemAsync("email");
            await SecureStore.deleteItemAsync("saved_email");
            await SecureStore.deleteItemAsync("saved_password");
            await SecureStore.deleteItemAsync("phone");

            router.replace("/(auth)/gateway");
          } catch (error) {
            console.error("Logout Error:", error);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const LegoPill = ({
    title,
    subtitle,
    icon: Icon,
    color,
    shadowColor,
    onPress,
  }: any) => (
    <TouchableOpacity style={styles.legoWrapper} onPress={onPress}>
      <View style={[styles.legoShadow, { backgroundColor: shadowColor }]} />
      <View style={[styles.legoMain, { backgroundColor: color }]}>
        <View style={styles.legoLeft}>
          <View style={styles.iconBox}>
            <Icon color="#FFF" size={22} />
          </View>
          <View>
            <Text style={styles.legoText}>{title}</Text>
            {subtitle && <Text style={styles.legoSub}>{subtitle}</Text>}
          </View>
        </View>
        <ChevronRight color="#FFF" size={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
     
      <View style={styles.badgeAnchor}>
        <View
          style={[
            styles.verifiedBadge,
            {
              backgroundColor: "#0F172A",
              // Gold for Live Active Drivers, Lime for active verified Riders
              borderColor: (userRole === "driver" && isVerifiedDriver) ? "#FDE047" : "#10B981", 
            },
          ]}
        >
          {(userRole === "driver" && isVerifiedDriver) ? (
            <ShieldCheck size={14} color="#FDE047" />
          ) : (
            <CheckCircle2 size={14} color="#10B981" />
          )}

          <Text
            style={[
              styles.badgeText,
              { color: (userRole === "driver" && isVerifiedDriver) ? "#FDE047" : "#10B981" },
            ]}
          >
            {userRole === "driver" 
              ? (isVerifiedDriver ? "VERIFIED DRIVER" : "PENDING APPROVAL") 
              : "VERIFIED RIDER"}
          </Text>
        </View>
      </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.profileHeaderCentered}>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImg}
                />
              ) : (
                <View style={styles.placeholderImg}>
                  <Camera color="#94A3B8" size={36} />
                </View>
              )}
              <View style={styles.cameraIconBadge}>
                <Camera color="#FFF" size={14} />
              </View>
            </TouchableOpacity>

            <Text style={styles.userNameCentered}>{fullName}</Text>

            <View style={styles.ratingBadgeCentered}>
              <Star color="#FDE047" size={16} fill="#FDE047" />
              <Text style={styles.ratingText}>5.0 Rating</Text>
            </View>

            <View style={styles.imageActions}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.actionText}>Update Photo</Text>
              </TouchableOpacity>
              {profileImage && (
                <>
                  <View style={styles.dot} />
                  <TouchableOpacity onPress={removeImage}>
                    <Text style={[styles.actionText, { color: "#EF4444" }]}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.gridNav}>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => router.push("/inbox")}
            >
              <Mail color="#FFF" size={24} />
              <Text style={styles.squareBtnText}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.squareBtn}
              onPress={() => router.push("/wallet")}
            >
              <Wallet color="#FFF" size={24} />
              <Text style={styles.squareBtnText}>Wallet</Text>
            </TouchableOpacity>
          </View>

         {/* =========================================================
    🪙 LEGO INTEGRATED VERIFIED DRIVER DOSSIER PROFILE CARD
========================================================= */}
{userRole === "driver" && isVerifiedDriver && (
  <View style={styles.legoDossierWrapper}>
    <View style={[styles.legoDossierShadow, { backgroundColor: "#581C87" }]} />
    <View 
      style={[
        styles.legoDossierMain, 
        { 
          backgroundColor: "#7E22CE", 
          borderColor: "#FDE047",
          flexDirection: 'column', 
          alignItems: 'stretch', 
          padding: 20, 
          height: 'auto' 
        }
      ]}
    >
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <ShieldCheck size={22} color="#FDE047" />
        <Text style={{ color: "#FFF", fontWeight: "900", fontSize: 16, letterSpacing: 0.5 }}>
          VERIFIED DRIVER
        </Text>
      </View>

      {/* Optional Fallbacks if global context object isn't populated yet */}
      <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: "700", marginBottom: 4 }}>
        Vehicle: {accountContext.vehicleDetails.make || "BMW"} {accountContext.vehicleDetails.model || "320i (E46)"}
      </Text>
      <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: "700", marginBottom: 15 }}>
        License Plate: {accountContext.vehicleDetails.plate || "MOBI-SPLIT-GP"}
      </Text>

      <TouchableOpacity 
        style={{
          backgroundColor: "#0F172A",
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: '#FDE047'
        }} 
        onPress={() => router.push("/onboarding/driver-dashboard")}
      >
        <Text style={{ color: "#FDE047", fontWeight: "900", fontSize: 13, letterSpacing: 1 }}>
          LAUNCH DRIVER-DASHBOARD
        </Text>
      </TouchableOpacity>

    </View>
  </View>
)}

          <View style={styles.section}>
         
            <LegoPill
              title="MY PROFILE"
              subtitle="Personal info & security"
              icon={UserCircle}
              color="#4F46E5"
              shadowColor="#3730A3"
              onPress={() => router.push("/profile")}
            />

           {/* 🪙 INSTANT STATE ROUTING GATES */}
          {userRole === "driver" || isVerifiedDriver ? (
            <LegoPill
              title="LIVE DRIVER ROOM"
              subtitle="Launch active tracking & trips"
              icon={LayoutDashboard}
              color="#7E22CE"
              shadowColor="#581C87"
              onPress={() => router.push("/onboarding/driver-dashboard")}
            />
          ) : (
            <LegoPill
              title="EARN BY DRIVING"
              subtitle="Apply to become a MobiSplit driver"
              icon={ Car}
              color="#10B981"
              shadowColor="#065F46"
              onPress={() => router.push("/onboarding/driver-setup")}
            />
          )}

            <LegoPill
              title="REFER & EARN"
              subtitle="Invite friends & get rewards"
              icon={Users}
              color="#8B5CF6"
              shadowColor="#5B21B6"
              onPress={() => router.push("/affiliate")}
            />
            <LegoPill
              title="CONTACT US"
              subtitle="Help, support & inquiries"
              icon={Mail}
              color="#F43F5E"
              shadowColor="#9F1239"
              onPress={() => router.push("/contact")}
            />
            <LegoPill
              title="PROMOTIONS"
              subtitle="Discounts and offers"
              icon={Tag}
              color="#F59E0B"
              shadowColor="#92400E"
              onPress={() => router.push("/promotions")}
            />
            <LegoPill
              title="LEGAL"
              subtitle="Terms of service & privacy"
              icon={Info}
              color="#4B5563"
              shadowColor="#1F2937"
              onPress={() => router.push("/legal")}
            />
            <LegoPill
              title="INSURANCE"
              subtitle="Passenger liability & cover"
              icon={ShieldCheck}
              color="#0EA5E9"
              shadowColor="#0369A1"
              onPress={() => router.push("/insurance-profile")}
            />

            <LegoPill
              title="DELETE ACCOUNT"
              subtitle="Permanently remove account"
              icon={Users}
              color="#F59E0B"
              shadowColor="#B45309"
              onPress={() => router.push("/profile/change-account")}
            />
          </View>

          <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
            <LogOut color="#EF4444" size={22} />
            <Text style={styles.logoutText}>SIGN OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  badgeAnchor: { position: "absolute", top: 60, right: 20, zIndex: 10 },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
  },
  badgeText: { fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  profileHeaderCentered: { alignItems: "center", paddingVertical: 30 },
  userNameCentered: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    marginTop: 15,
  },
  ratingBadgeCentered: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  ratingText: { color: "#FFF", fontWeight: "900", marginLeft: 6, fontSize: 14 },
  imageActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  actionText: { color: "#38BDF8", fontWeight: "700", fontSize: 13 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#475569" },
  imageContainer: { width: 120, height: 120 },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#334155",
  },
  placeholderImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#334155",
  },
  cameraIconBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#2563EB",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0F172A",
  },
  gridNav: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 25,
  },
  squareBtn: {
    flex: 1,
    height: 90,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  squareBtnText: { color: "#FFF", fontWeight: "900", fontSize: 14 },
  section: { paddingHorizontal: 20, gap: 18 },
  legoWrapper: { height: 85 },
  legoMain: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  legoShadow: {
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
    bottom: -5,
    borderRadius: 24,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#000",
  },
  legoLeft: { flexDirection: "row", alignItems: "center", gap: 15 },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  legoText: { color: "#FFF", fontWeight: "900", fontSize: 18 },
  legoSub: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600" },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 40,
    marginBottom: 30,
  },
  logoutText: { color: "#EF4444", fontWeight: "900", fontSize: 16 },
  // Dossier Card Styles (Optimized to expand cleanly with layout additions)
  legoDossierWrapper: { marginHorizontal: 20, position: "relative", marginBottom: 25 },
  legoDossierMain: { borderRadius: 24, borderWidth: 2, padding: 15, zIndex: 2 },
  legoDossierShadow: { position: "absolute", top: 5, left: 0, right: 0, bottom: -5, borderRadius: 24, zIndex: 1, borderWidth: 2, borderColor: "#000" },
  dossierHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  dossierHeaderText: { color: "#FFF", fontWeight: "900", fontSize: 14, letterSpacing: 0.5 },
  dossierText: { color: "#94A3B8", fontSize: 13, fontWeight: "700", marginBottom: 4 },
  dossierButton: { backgroundColor: "#10B981", borderRadius: 10, paddingVertical: 8, marginTop: 8, alignItems: "center" },
  dossierButtonText: { color: "#000", fontWeight: "900", fontSize: 11 }
});
