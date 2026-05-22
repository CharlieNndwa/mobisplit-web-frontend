import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator, // 🪙 ADDED THIS
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Calendar,
  Send,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

// 🪙 FIXED: Explicit type and dark theme configuration
const darkMapStyle: any[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
];

const API_URL = "https://daringly-tacky-anemic.ngrok-free.dev";

export default function LongDistancePlanner() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [phone, setPhone] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  // 🪙 ADDED: Loading state to fix the TS error
  const [loading, setLoading] = useState(false);

  // 🪙 UPDATED: handlePublish with General Location Logic & Standardized Payload
  const handlePublish = async () => {
    // Ensure all fields are present for a valid trip
    if (!pickup || !destination || !phone) {
      Alert.alert("Missing Info", "Please provide route and contact number.");
      return;
    }

    setLoading(true); // Assuming you have a loading state for the UI

    try {
      // 1. Retrieve essential IDs and Profile info from SecureStore
      const userId = await SecureStore.getItemAsync("userId");
      const driverName = await SecureStore.getItemAsync("user_full_name");

      // 2. Construct the standardized payload 🪙
      // We use 'pickup' and 'destination' directly to support any location on the map
      const tripPayload = {
        driverId: userId,
        driverName: driverName || "MobiDriver",
        pickup: pickup, // General string (e.g., "Soweto, GP" or specific address)
        destination: destination,
        time: departureDate || "Flexible / Contact Driver",
        phone: phone,
      };

      // 3. Hit the backend endpoint
      const response = await fetch(`${API_URL}/api/trips/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripPayload),
      });

      const result = await response.json();

      if (result.success) {
        // 🪙 CRITICAL: Success alert and navigation
        Alert.alert(
          "Trip Published 🪙",
          "Your long-distance trip is now visible to passengers.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(tabs)/home"), // Redirect to Home to see the new trip
            },
          ],
        );
      } else {
        throw new Error(result.message || "Failed to publish trip.");
      }
    } catch (err) {
      console.error("Publish Trip Error:", err);
      Alert.alert(
        "Sync Error",
        "Could not publish trip. Please ensure your backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -28.4793,
          longitude: 24.6727, // Centered on South Africa
          latitudeDelta: 12.0,
          longitudeDelta: 12.0,
        }}
        customMapStyle={darkMapStyle}
      />

      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Plan Provincial Route</Text>

        <View style={styles.inputGroup}>
          <MapPin color="#FBBF24" size={20} />
          <TextInput
            placeholder="Starting Province / City"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={pickup}
            onChangeText={setPickup}
          />
        </View>

        <View style={styles.inputGroup}>
          <MapPin color="#EF4444" size={20} />
          <TextInput
            placeholder="Destination Province / City"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <View style={styles.inputGroup}>
          <Calendar color="#3B82F6" size={20} />
          <TextInput
            placeholder="Departure (e.g. Friday 2pm)"
            placeholderTextColor="#64748B"
            style={styles.input}
            value={departureDate}
            onChangeText={setDepartureDate}
          />
        </View>

        <View style={styles.inputGroup}>
          <Phone color="#10B981" size={20} />
          <TextInput
            placeholder="Public Contact Number"
            placeholderTextColor="#64748B"
            keyboardType="phone-pad"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity 
  style={[styles.publishBtn, loading && { opacity: 0.7 }]} 
  onPress={handlePublish}
  disabled={loading}
>
  <Text style={styles.publishText}> {/* 🪙 CHANGED FROM publishBtnText */}
    {loading ? "PUBLISHING..." : "PUBLISH TRIP"}
  </Text>
  {loading ? (
    <ActivityIndicator color="#000" size="small" style={{ marginLeft: 10 }} />
  ) : (
    <Send color="#000" size={20} />
  )}
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  map: { flex: 1 },
  formContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#0F172A",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#1E293B",
  },
  backBtn: {
    position: "absolute",
    top: -70,
    left: 20,
    backgroundColor: "#0F172A",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },
  title: { color: "#FFF", fontSize: 20, fontWeight: "900", marginBottom: 20 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 12,
    height: 55,
  },
  input: { flex: 1, marginLeft: 10, color: "#FFF", fontWeight: "600" },
  
  
  publishBtn: {
    backgroundColor: "#FDE047", // Lime/Yellow theme
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12, // 🪙 Optimal gap for icons
    borderWidth: 2,
    borderColor: "#000",
        marginTop: 25, // 🪙 Added spacing
    marginBottom: 10, // 🪙 Added spacing
  },
  
  // 🪙 MATCHING THE NAME IN YOUR ERROR MESSAGE
  publishText: { 
    color: "#000", 
    fontWeight: "900", 
    fontSize: 16,
    marginRight: 10 
  },
});
