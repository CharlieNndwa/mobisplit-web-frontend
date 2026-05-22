import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import {
  MapPin,
  Navigation,
  X,
  Check,
  Users,
  Clock,
} from "lucide-react-native";
import { useSocket } from "../../context/SocketContext";

export default function IncomingRideScreen({
  request,
  onAccept,
  onDecline,
}: any) {
  const [timeLeft, setTimeLeft] = useState(15);
  const socket = useSocket();

  const handleDecline = () => {
    // Notify backend immediately to dispatch to next driver
    socket?.emit("ride:rejected", {
      rideId: request.id,
      driverId: "current_driver_uuid",
    });
    onDecline(); // Close UI
  };

  useEffect(() => {
    if (timeLeft === 0) onDecline();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ translateY: 300 }}
        animate={{ translateY: 0 }}
        style={styles.card}
      >
        <Text style={styles.timerText}>{timeLeft}s</Text>
        <Text style={styles.title}>INCOMING REQUEST</Text>
        <Text style={styles.fare}>R {request.fare}</Text>

        {/* 🪙 UPDATED: DATA-RICH ROUTE BOX */}
        <View style={styles.routeBox}>
          <View style={styles.routeItem}>
            <MapPin color="#10B981" size={20} />
            <View>
              <Text style={styles.labelSmall}>PICKUP</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {request.pickupName || "Current Location"}
              </Text>
            </View>
          </View>

          <View style={styles.routeItem}>
            <Navigation color="#3B82F6" size={20} />
            <View>
              <Text style={styles.labelSmall}>DESTINATION</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {request.destinationName || "Setting Destination..."}
              </Text>
            </View>
          </View>
        </View>

        {/* 🪙 ADDED: TRIP SPECS (PASSENGERS & ETA) */}
        <View style={styles.tripSpecs}>
          <View style={styles.specItem}>
            <Users color="#94A3B8" size={18} />
            <Text style={styles.specText}>
              {request.passengerCount || 1} Pax
            </Text>
          </View>
          <View style={styles.specItem}>
            <Clock color="#94A3B8" size={18} />
            <Text style={styles.specText}>
              {request.estimatedEta || "--"} min away
            </Text>
          </View>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
            <X color="#FFF" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
            <Check color="#000" size={35} />
            <Text style={styles.acceptText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#1E293B",
    padding: 25,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  timerText: { color: "#FDE047", fontSize: 42, fontWeight: "900" },
  title: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
    marginVertical: 8,
    letterSpacing: 1,
  },
  fare: { color: "#FFF", fontSize: 52, fontWeight: "900", marginBottom: 20 },

  routeBox: {
    width: "100%",
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 20,
    gap: 15,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  routeItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  labelSmall: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 2,
  },
  locationText: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "700",
    width: "85%",
  },

  // 🪙 TRIP SPECS STYLING
  tripSpecs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "#1E293B",
    paddingVertical: 10,
  },
  specItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  specText: { color: "#94A3B8", fontSize: 14, fontWeight: "800" },

  btnRow: { flexDirection: "row", gap: 15, marginTop: 25, width: "100%" },
  declineBtn: {
    backgroundColor: "#EF4444",
    flex: 1,
    height: 75,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#B91C1C",
  },
  acceptBtn: {
    backgroundColor: "#FDE047",
    flex: 2,
    height: 75,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#CA8A04",
  },
  acceptText: { color: "#000", fontSize: 22, fontWeight: "900" },
});
