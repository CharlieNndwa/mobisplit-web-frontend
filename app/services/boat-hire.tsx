import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ship, MapPin, Anchor, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");
// Replace your old ngrok lines with this dynamic look-up:
const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";


const COASTAL_CITIES = [
  {
    name: "Durban",
    coords: { latitude: -29.8587, longitude: 31.0218 },
    port: "Port of Durban",
  },
  {
    name: "Cape Town",
    coords: { latitude: -33.9249, longitude: 18.4241 },
    port: "V&A Waterfront",
  },
  {
    name: "East London",
    coords: { latitude: -33.0292, longitude: 27.8546 },
    port: "East London Port",
  },
  {
    name: "Port Alfred",
    coords: { latitude: -33.5906, longitude: 26.8864 },
    port: "Royal Alfred Marina",
  },
];

export default function BoatHireScreen() {
  const [selectedCity, setSelectedCity] = useState(COASTAL_CITIES[0]);
  const [boats, setBoats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchBoats();
  }, [selectedCity]);

  const fetchBoats = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/assets?category=Boat&city=${selectedCity.name}`,
      );
      const data = await res.json();
      setBoats(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          region={{
            ...selectedCity.coords,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={selectedCity.coords} title={selectedCity.port}>
            <View style={styles.markerCircle}>
              <Anchor color="#FFF" size={16} />
            </View>
          </Marker>
        </MapView>
      </View>

      <View style={styles.citySelector}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={COASTAL_CITIES}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCity(item)}
              style={[
                styles.cityChip,
                selectedCity.name === item.name && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.cityText,
                  selectedCity.name === item.name && styles.activeText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Vessels in {selectedCity.name}</Text>
        {loading ? (
          <ActivityIndicator color="#38BDF8" />
        ) : (
          <FlatList
            data={boats}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.boatCard}
                onPress={() =>
                  router.push(`/marketplace/asset/${item.id}` as any)
                }
              >
                <View style={styles.boatInfo}>
                  <Ship color="#38BDF8" />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles.boatName}>
                      {item.make} {item.model}
                    </Text>
                    <Text style={styles.ownerText}>
                      {item.owner_type} • {item.capacity}
                    </Text>
                  </View>
                </View>
                <ChevronRight color="#334155" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  mapContainer: { height: height * 0.35 },
  citySelector: { paddingVertical: 15, backgroundColor: "#0F172A" },
  cityChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1E293B",
    marginLeft: 10,
  },
  activeChip: { backgroundColor: "#38BDF8" },
  cityText: { color: "#94A3B8", fontWeight: "800" },
  activeText: { color: "#FFF" },
  sheet: {
    flex: 1,
    padding: 20,
    backgroundColor: "#020617",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  sheetTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 20,
  },
  boatCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0F172A",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  boatInfo: { flexDirection: "row", alignItems: "center" },
  boatName: { color: "#FFF", fontWeight: "800" },
  ownerText: { color: "#64748B", fontSize: 12 },
  markerCircle: {
    backgroundColor: "#38BDF8",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFF",
  },
});
