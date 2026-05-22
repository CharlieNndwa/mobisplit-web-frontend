import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
  Share,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Navigation,
  Phone,
  ShieldAlert,
  MessageCircle,
  Share2 as ShareIcon, // <--- Rename 'Share' to 'ShareIcon'
} from "lucide-react-native";
import { MotiView } from "moti";
import { useRouter, useLocalSearchParams } from "expo-router";
import io, { Socket } from "socket.io-client";
import * as Location from "expo-location";
import axios from "axios";

// 1. Safe Global Base URL Definition
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.8.247:5000";

// 2. Point both Socket and API to use it dynamically
const SOCKET_URL = BASE_URL;
const API_BASE = `${BASE_URL}/api`;

export default function ActiveTripNavigator() {
  const socket = useRef<Socket | null>(null);
  const router = useRouter();
  const { rideId, driverId } = useLocalSearchParams();

  const [driverData, setDriverData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    const initTrip = async () => {
      try {
        // 1. Fetch real driver particulars from your specific driver_profiles table
        const profileRes = await axios.get(
          `${API_BASE}/driver/profile-sync/${driverId}`,
        );
        if (profileRes.data.success) {
          setDriverData(profileRes.data.data);
        }

        // 2. Real-time location tracking (optimized for 4GB RAM)
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 15 },
          (loc) => {
            const coords = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setRegion((prev) => ({ ...prev, ...coords }));

            // Emit to sync with Rider Map
            socket.current?.emit("driver:location_update", { rideId, coords });
          },
        );

        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    initTrip();
    return () => {
      socket.current?.disconnect();
    };
  }, [rideId]);

// LIVE LOCATION SHARING FUNCTION (NATIVE BUILDER METHOD)
const handleShareLiveLocation = async () => {
  try {
    // Using a standard, clean maps link that builds safely every time
    const lat = region.latitude.toString();
    const lng = region.longitude.toString();
    const trackingUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    
    const message = `MobiSplit Safety Update 🚗\nI'm on a trip with ${driverData?.fullName || "a verified driver"}.\nVehicle: ${driverData?.vehicleInfo || "BMW E46"}\nLive Location: ${trackingUrl}`;
    
    await Share.share({ message });
  } catch (error: any) {
    Alert.alert("Error", "Could not share location.");
  }
};

  const handleFinish = () => {
    Alert.alert(
      "Confirm Finish",
      "Are you sure you want to end this trip and collect fare?",
      [
        { text: "Cancel" },
        {
          text: "Finish",
          onPress: () => {
            socket.current?.emit("ride:complete_request", { rideId });
            router.replace("/(tabs)/home");
          },
        },
      ],
    );
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#FBBF24" />
      </View>
    );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        region={region}
      >
        <Marker coordinate={region} flat anchor={{ x: 0.5, y: 0.5 }}>
          <MotiView
            from={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ loop: true, type: "timing" }}
          >
            <Navigation size={35} color="#1E40AF" fill="#1E40AF" />
          </MotiView>
        </Marker>
      </MapView>

      {/* Safety Header */}
      <View style={styles.safetyHeader}>
        <TouchableOpacity style={styles.sosButton}>
          <ShieldAlert color="#FFF" size={20} />
          <Text style={styles.sosText}>SOS EMERGENCY</Text>
        </TouchableOpacity>
      </View>

      {/* Driver & Trip Info Card */}
      <MotiView
        from={{ translateY: 200 }}
        animate={{ translateY: 0 }}
        style={styles.tripCard}
      >
        <View style={styles.legoStudRow}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.topStud} />
          ))}
        </View>

        <View style={styles.driverInfoSection}>
          <View style={styles.avatarBrick}>
            <Image
              // 🪙 This pulls the exact image uploaded during driver setup
              source={{
                uri:
                  driverData?.profilePic || "https://via.placeholder.com/100",
              }}
              style={styles.avatar}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.driverName}>
              {driverData?.fullName || "Current Trip"}
            </Text>
            <Text style={styles.vehicleText}>
              {driverData?.vehicleInfo || "BMW E46"} •{" "}
              {driverData?.plate || "---"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: "/chat", params: { rideId } })
            }
            style={styles.chatBtn}
          >
            <MessageCircle color="#FBBF24" size={28} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => Linking.openURL(`tel:${driverData?.phone}`)}
          >
            <Phone color="#10B981" size={24} />
          </TouchableOpacity>

          {/* New Share Location Button */}
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: "#1E40AF" }]}
            onPress={handleShareLiveLocation}
          >
            <ShareIcon color="#FFF" size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.finishTripBtn} onPress={handleFinish}>
            <Text style={styles.finishTripText}>FINISH TRIP & COLLECT</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
  safetyHeader: { position: "absolute", top: 60, left: 20 },
  sosButton: {
    backgroundColor: "#B91C1C",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  sosText: { color: "#FFF", fontWeight: "900" },
  tripCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#1E293B",
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  legoStudRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -40,
    marginBottom: 15,
  },
  topStud: {
    width: 30,
    height: 12,
    backgroundColor: "#1E293B",
    borderRadius: 4,
  },
  driverInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarBrick: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1E40AF",
  },
  avatar: { width: "100%", height: "100%" },
  driverName: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  vehicleText: { color: "#94A3B8", fontSize: 13 },
  chatBtn: { padding: 10, backgroundColor: "#334155", borderRadius: 15 },
  actionRow: { flexDirection: "row", gap: 15 },
  iconBtn: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  finishTripBtn: {
    flex: 1,
    backgroundColor: "#10B981",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  finishTripText: { color: "#FFF", fontWeight: "900" },
});
