import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MotiView } from "moti";
import { X, ShieldCheck } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import io, { Socket } from "socket.io-client";

// FIX: Remove the hardcoded https:// string and read it from process.env safely
const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || "";

export default function RiderDispatchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const socket = useRef<Socket | null>(null);
  const [status, setStatus] = useState("Finding your Driver...");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelRide = async () => {
    if (isCancelling) return;

    setIsCancelling(true);
    try {
      const response = await fetch(`${SOCKET_URL}/api/rides/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rideId: params.rideId }),
      });

      const data = await response.json();

      if (data.success) {
        router.back(); // Go back to Plan Ride
      } else {
        Alert.alert(
          "Cancellation Failed",
          data.message || "Could not cancel at this time.",
        );
      }
    } catch (error) {
      Alert.alert("Connection Error", "Check your internet and try again.");
    } finally {
      setIsCancelling(false);
    }
  };

useEffect(() => {
  // Pass explicit context handshake payload queries to the backend driver allocation system
  socket.current = io(SOCKET_URL, {
    query: {
      userId: params.riderId || "",
      role: "rider",
      category: params.category || "ECONOMY",
    },
  });

  // 🪙 Explicitly register into the transaction tracking workspace room
  socket.current.emit("join:ride_room", { rideId: params.rideId });

  // Listen for the driver acceptance event
  socket.current.on("ride:driver_found", (driverData) => {
    setStatus("Captain Found!");

    // Use the fare from params (quoted) or driverData (confirmed)
    const finalFare = driverData.fare || params.fare;

    setTimeout(() => {
      router.push({
        pathname: "/onboarding/ActiveTripNavigator",
        params: {
          ...driverData,
          fare: finalFare,
          rideId: params.rideId,
        },
      });
    }, 1500);
  });

  return () => {
    socket.current?.disconnect();
  };
}, [params.rideId, params.category]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapSmall}
        initialRegion={{
          latitude: -26.2041,
          longitude: 28.0473,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      <MotiView
        from={{ translateY: 300 }}
        animate={{ translateY: 0 }}
        style={styles.dispatchDrawer}
      >
        <View style={styles.legoIndicator} />

        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FBBF24" />
          <Text style={styles.statusText}>{status}</Text>
          <Text style={styles.subText}>
            MobiSplit is matching you with nearby Captains
          </Text>
        </View>

        <View style={styles.fareBrick}>
          <Text style={styles.fareLabel}>QUOTED FARE</Text>
          <Text style={styles.fareAmount}>R {params.fare}</Text>
        </View>

        <TouchableOpacity
          style={[styles.cancelBtn, isCancelling && { opacity: 0.5 }]}
          onPress={handleCancelRide}
          disabled={isCancelling}
        >
          {isCancelling ? (
            <ActivityIndicator size="small" color="#94A3B8" />
          ) : (
            <>
              <X color="#94A3B8" size={20} />
              <Text style={styles.cancelText}>Cancel Request</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.safetyBadge}>
          <ShieldCheck color="#10B981" size={16} />
          <Text style={styles.safetyText}>SADPMR Secure Marketplace</Text>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  mapSmall: { height: "45%", width: "100%" },
  dispatchDrawer: {
    height: "60%",
    backgroundColor: "#0F172A",
    borderTopLeftRadius: 35,
    padding: 25,
    alignItems: "center",
    marginTop: -40,
  },
  legoIndicator: {
    width: 50,
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginBottom: 25,
  },
  loadingArea: { alignItems: "center", marginVertical: 10 },
  statusText: { color: "#FFF", fontSize: 22, fontWeight: "900", marginTop: 25 },
  subText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
  },
  fareBrick: {
    backgroundColor: "#1E293B",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E40AF",
  },
  fareLabel: {
    color: "#1E40AF",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 1,
  },
  fareAmount: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
  cancelText: { color: "#94A3B8", fontWeight: "700" },
  safetyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: "auto",
  },
  safetyText: { color: "#10B981", fontSize: 10, fontWeight: "800" },
});
