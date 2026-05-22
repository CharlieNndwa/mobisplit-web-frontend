// driver-dashboard.tsx - 🪙 PRODUCTION REAL-TIME DRIVER TRANSIT INTEGRATION
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Power,
  TrendingUp,
  Clock,
  User,
  ChevronLeft,
  Wallet,
  Car,
  MapPin,
} from "lucide-react-native";
import io, { Socket } from "socket.io-client";
import { AnimatePresence, MotiView } from "moti";
import IncomingRideScreen from "../components/driver-incoming"; // Adjusted path resolution if nested
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");
const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.8.247:5000";
const HERO_IMAGE_URL = "https://img.freepik.com/free-photo/driver-steering-wheel-car-dashboard-gps-smartphone_169016-68694.jpg?semt=ais_hybrid&w=740&q=80";

// 🪙 REDESIGNED HIGH-CONTRAST STAT CARD
const LegoStatCard = ({ icon: Icon, value, label, studColor }: any) => (
  <View style={styles.legoStatCardWrapper}>
    <View style={styles.legoStatCardMain}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Icon size={22} color={studColor || "#64748B"} />
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: studColor || "#334155" }} />
      </View>
      <Text style={styles.statValueText}>{value}</Text>
      <Text style={styles.statLabelText}>{label}</Text>
    </View>
    <View style={[styles.legoStatCardShadow, { backgroundColor: studColor ? `${studColor}20` : "#000" }]} />
  </View>
);

export default function DriverDashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  
  // 💎 FIXED: Explicit type assignment as number or null to solve TypeScript 2322
  const locationInterval = useRef<number | null>(null);

  const [isOnline, setIsOnline] = useState(false);
  const [driverProfile, setDriverProfile] = useState<any>(null);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [activeRideRequest, setActiveRideRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load local authentication keys & profile assets on mount
  useEffect(() => {
    async function loadDriverData() {
      try {
        const userId = await SecureStore.getItemAsync("user_id");
        const storedName = await SecureStore.getItemAsync("user_full_name");
        
        // 🪙 FETCH PROFILE IMAGE: Fallback check from image picker session storage or cache
        const storedImage = await SecureStore.getItemAsync("driver_profile_img_uri");
        if (storedImage) {
          setProfileImageUri(storedImage);
        }

        if (userId) {
          setDriverProfile({
            id: userId,
            name: storedName || "Verified Driver",
            rating: "4.95",
            earnings: "R1,240.00",
            trips: "42",
            hours: "18.5",
          });
        }
      } catch (err) {
        console.error("Error reading storage values", err);
      } finally {
        setLoading(false);
      }
    }
    loadDriverData();
  }, []);

  // Handle stream sockets & channel rooms
  useEffect(() => {
    socket.current = io(SOCKET_URL);

    socket.current.on("connect", () => {
      console.log("Connected to MobiSplit backend server socket:", socket.current?.id);
    });

    // Handle targeted ride distribution broadcasts
    socket.current.on("ride:request", (data) => {
      if (isOnline) {
        console.log("Incoming targeted trip packet payload:", data);
        setActiveRideRequest(data);
      }
    });

    return () => {
      socket.current?.disconnect();
      if (locationInterval.current) {
        window.clearInterval(locationInterval.current);
      }
    };
  }, [isOnline]);

  const toggleOnlineStatus = async () => {
    if (!isOnline) {
      // Transitioning to ONLINE
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "MobiSplit requires active location coordinates to sync ride allocations.");
        return;
      }

      setIsOnline(true);
      socket.current?.emit("driver:go_online", { driverId: driverProfile?.id });

      // Send periodic telemetry updates directly to tracking tables
      sendLocationUpdate();
      // 💎 FIXED: Explicit window scope assignment to completely clear the Timeout assignability type conflict
      locationInterval.current = window.setInterval(() => {
        sendLocationUpdate();
      }, 10000);
    } else {
      // Transitioning to OFFLINE
      setIsOnline(false);
      socket.current?.emit("driver:go_offline", { driverId: driverProfile?.id });
      if (locationInterval.current) {
        window.clearInterval(locationInterval.current);
        locationInterval.current = null;
      }
    }
  };

  const sendLocationUpdate = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      socket.current?.emit("driver:location_update", {
        driverId: driverProfile?.id,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (err) {
      console.log("Telemetry transmission dropped sequence step.", err);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER SECTION WITH DISPATCHED AVATAR PORTRAIT */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={styles.avatarWrap}>
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.avatarImg} />
            ) : (
              <View style={[styles.avatarImg, { backgroundColor: "#1E293B", justifyContent: "center", alignItems: "center" }]}>
                <User color="#10B981" size={24} />
              </View>
            )}
            <View style={[styles.statusIndicatorIndicator, { backgroundColor: isOnline ? "#10B981" : "#EF4444" }]} />
          </View>
          <View>
            <Text style={styles.driverGreetingName}>{driverProfile?.name || "MobiSplit Driver"}</Text>
            <Text style={styles.driverSubHeaderStatus}>
              {isOnline ? "Active On Network Room" : "System Sleeping Mode"}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backCircButton}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <ChevronLeft color="#FFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollCanvas} showsVerticalScrollIndicator={false}>
        
        {/* 🪙 HERO BANNER CAR WRAP SECTION */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: HERO_IMAGE_URL }} 
            style={styles.heroBannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(15,23,42,0.95)"]}
            style={styles.heroOverlayGradient}
          />
          <View style={styles.heroBadgeTag}>
            <Car size={14} color="#000" />
            <Text style={styles.heroBadgeText}>MobiSplit Premium Co</Text>
          </View>
        </View>

        {/* HIGH CONTRAST POWER SWITCH BLOCK */}
        <View style={styles.powerControlSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleOnlineStatus}
            style={[styles.powerSwitchMain, { backgroundColor: isOnline ? "#10B981" : "#1E293B" }]}
          >
            <Power size={24} color={isOnline ? "#000" : "#94A3B8"} />
            <Text style={[styles.powerSwitchLabelText, { color: isOnline ? "#000" : "#FFF" }]}>
              {isOnline ? "YOU ARE ONLINE & MATCHING" : "GO ONLINE TO TAKE RIDES"}
            </Text>
          </TouchableOpacity>
          <View style={[styles.powerSwitchShadow, { backgroundColor: isOnline ? "#059669" : "#000" }]} />
        </View>

        {/* HIGH CONTRAST STAT METRICS GRID */}
        <View style={{ marginTop: 25 }}>
          <View style={styles.gridSectionHeader}>
            <Text style={styles.sectionTitle}>SHIFT STATUS REPORT</Text>
          </View>

          <View style={styles.statsGridContainer}>
            <LegoStatCard icon={Wallet} value={driverProfile?.earnings || "R0.00"} label="Net Balance" studColor="#10B981" />
            <LegoStatCard icon={TrendingUp} value={driverProfile?.rating || "5.0"} label="User Rating" studColor="#3B82F6" />
            <LegoStatCard icon={Car} value={driverProfile?.trips || "0"} label="Completed Jobs" studColor="#F59E0B" />
            <LegoStatCard icon={Clock} value={driverProfile?.hours || "0.0"} label="Hours Logged" studColor="#EC4899" />
          </View>
        </View>

        {/* LONG DISTANCE ROUTING ACCELERATOR PANEL */}
        <View style={styles.longDistancePublishCard}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.longDistanceCardTitleText}>Inter-Province Scheduler</Text>
            <Text style={styles.longDistanceCardSubText}>
              Publish schedules to Durban, Cape Town, or Polokwane to book passenger allocations ahead of departure.
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.longDistanceActionBtn}
            onPress={() => router.push("/onboarding/long-distance-planner")}
          >
            <MapPin size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ANIMATED REAL-TIME MODAL FOR MATCHED PAYLOAD PINGS */}
      <AnimatePresence>
        {activeRideRequest && (
          <IncomingRideScreen
            request={activeRideRequest}
            onAccept={() => {
              const reqData = activeRideRequest;
              setActiveRideRequest(null);
              router.push({
                pathname: "/onboarding/ActiveTripNavigator",
                params: { rideId: reqData.rideId, driverId: driverProfile?.id },
              });
            }}
            onDecline={() => setActiveRideRequest(null)}
          />
        )}
      </AnimatePresence>
    </View>
  );
}

// 🪙 INTEGRATED STYLE GUIDE SPECIFICATIONS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#1E293B",
  },
  avatarWrap: { position: "relative" },
  avatarImg: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "#10B981" },
  statusIndicatorIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  driverGreetingName: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  driverSubHeaderStatus: { color: "#64748B", fontSize: 12, fontWeight: "600", marginTop: 2 },
  backCircButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollCanvas: { padding: 20, paddingBottom: 40 },
  
  // 🪙 Hero Section Layout Rules
  heroContainer: {
    width: "100%",
    height: 160,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    marginBottom: 25,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155"
  },
  heroBannerImage: {
    width: "100%",
    height: "100%"
  },
  heroOverlayGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "80%"
  },
  heroBadgeTag: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  heroBadgeText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.3
  },

  powerControlSection: { position: "relative", width: "100%", height: 65, marginBottom: 10 },
  powerSwitchMain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    zIndex: 2,
  },
  powerSwitchLabelText: { fontSize: 14, fontWeight: "900", letterSpacing: 0.5 },
  powerSwitchShadow: {
    position: "absolute",
    top: 4,
    left: 0,
    right: 0,
    bottom: -4,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 1,
  },
  gridSectionHeader: { marginBottom: 15 },
  sectionTitle: { fontSize: 11, fontWeight: "900", color: "#64748B", letterSpacing: 1 },
  statsGridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  legoStatCardWrapper: { width: (width - 55) / 2, height: 120, position: "relative", marginBottom: 15 },
  legoStatCardMain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#334155",
    padding: 16,
    justifyContent: "center",
    zIndex: 2,
  },
  legoStatCardShadow: { position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 20, zIndex: 1 },
  statValueText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  statLabelText: { color: "#64748B", fontSize: 12, fontWeight: "700", marginTop: 2 },
  longDistancePublishCard: {
    backgroundColor: "#1E293B",
    borderWidth: 2,
    borderColor: "#334155",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  longDistanceCardTitleText: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  longDistanceCardSubText: { color: "#94A3B8", fontSize: 12, marginTop: 4, lineHeight: 16, fontWeight: "500" },
  longDistanceActionBtn: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
});