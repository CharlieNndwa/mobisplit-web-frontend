import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ChevronLeft, MapPin, Phone, Calendar, Send } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const darkMapStyle: any[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
];

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";

export default function LongDistancePlanner() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState("");
  const [driverName, setDriverName] = useState("");

  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    time: "",
    phone: "",
  });

  useEffect(() => {
    const bootstrapDriverAuth = async () => {
      try {
        const userDataStr = await SecureStore.getItemAsync("user_data");
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          setDriverId(userData.id || "");
          setDriverName(userData.fullName || userData.full_name || "MobiSplit Driver");
        }
      } catch (err) {
        console.error("Failed fetching driver session context metadata:", err);
      }
    };
    bootstrapDriverAuth();
   biographicalDetails();
  }, []);

  const handlePublish = async () => {
    if (!form.pickup || !form.destination || !form.time || !form.phone) {
      Alert.alert("Required Fields", "Please complete all fields to establish a scheduled transit route.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/trips/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId: driverId || "f8e37246-e162-4dbc-9785-022de84c5b81", // Fallback if session delay occurs
          driverName,
          pickup: form.pickup.trim(),
          destination: form.destination.trim(),
          time: form.time.trim(),
          phone: form.phone.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success 🚀", "Your inter-provincial trip is live on the marketplace board!", [
          { text: "Awesome", onPress: () => router.replace("/home") }
        ]);
      } else {
        Alert.alert("Publishing Failed", data.message || "Server encountered an execution conflict.");
      }
    } catch (error: any) {
      Alert.alert("Network Failure", "Unable to contact production node threads. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -26.2041,
          longitude: 28.0473,
          latitudeDelta: 8.0,
          longitudeDelta: 8.0,
        }}
        customMapStyle={darkMapStyle}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>PROVINCIAL PLANNER</Text>

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.inputGroup}>
            <MapPin color="#FBBF24" size={20} />
            <TextInput
              placeholder="Departure Province (e.g., Gauteng)"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.pickup}
              onChangeText={(text) => setForm({ ...form, pickup: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <MapPin color="#EF4444" size={20} />
            <TextInput
              placeholder="Destination Province (e.g., Limpopo)"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.destination}
              onChangeText={(text) => setForm({ ...form, destination: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Calendar color="#3B82F6" size={20} />
            <TextInput
              placeholder="Departure Time (e.g., Today, 18:00)"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.time}
              onChangeText={(text) => setForm({ ...form, time: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Phone color="#10B981" size={20} />
            <TextInput
              placeholder="Contact Hotline Number"
              placeholderTextColor="#64748B"
              keyboardType="phone-pad"
              style={styles.input}
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handlePublish} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>PUBLISH TRIP ROUTE</Text>
                <Send size={18} color="#000" />
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  map: { flex: 1 },
  formContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: "65%",
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
    zIndex: 10,
  },
  title: { color: "#FFF", fontSize: 20, fontWeight: "900", marginBottom: 20, letterSpacing: 1 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 12,
    height: 55,
    borderWidth: 1,
    borderColor: "#334155",
  },
  input: { flex: 1, marginLeft: 10, color: "#FFF", fontWeight: "700", fontSize: 14 },
  submitBtn: {
    backgroundColor: "#FBBF24",
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  submitBtnText: { color: "#000", fontWeight: "900", fontSize: 15, letterSpacing: 0.5 },
});