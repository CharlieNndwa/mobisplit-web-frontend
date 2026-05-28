import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MapStyleElement,
} from "react-native-maps";
import { Truck, Car, Navigation, ShieldCheck } from "lucide-react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";

const nightModeStyle: MapStyleElement[] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
];

export default function TruckHireScreen() {
  const [assets, setAssets] = useState<any[]>([]); // 🪙 Initialize as empty array
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch(`${API_URL}/api/assets/marketplace`);

      // 🪙 DIAGNOSTIC CHECK: Prevent "Unexpected <" crash
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Server returned HTML:", text);
        throw new Error(
          "Backend Route Error: Check index.js for /api/assets/marketplace",
        );
      }

      const data = await response.json();
      // 🪙 Ensure data is an array before setting
      setAssets(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("API Error:", error);
      Alert.alert("Error", "Could not load assets. Check server logs.");
    } finally {
      setLoading(false);
    }
  };
  const renderAssetCard = ({ item }: { item: any }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      style={styles.truckBrick}
    >
      <View style={styles.truckInfo}>
        <View style={styles.iconCircle}>
          {item.category === "Truck" ? (
            <Truck color="#F59E0B" size={20} />
          ) : (
            <Car color="#10B981" size={20} />
          )}
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.truckName}>
              {item.make} {item.model}
            </Text>
            {item.is_verified && (
              <ShieldCheck
                size={14}
                color="#10B981"
                style={{ marginLeft: 5 }}
              />
            )}
          </View>
          <Text style={styles.truckSub}>
            {item.capacity} • {item.city || "South Africa"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => router.push(`/marketplace/asset/${item.id}`)}
      >
        <Text style={styles.bookText}>VIEW RATES</Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assets || []} // 🪙 Safety fallback
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAssetCard}
        ListEmptyComponent={
          <Text style={{ color: "#FFF" }}>No assets available.</Text>
        }
      />
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          customMapStyle={nightModeStyle}
          initialRegion={{
            latitude: -26.2041,
            longitude: 28.0473,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {assets.map((asset) => (
            <Marker
              key={asset.id}
              coordinate={{
                latitude: asset.latitude || -26.2041,
                longitude: asset.longitude || 28.0473,
              }}
            >
              <View style={styles.customMarker}>
                <Navigation size={15} color="#FFF" />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <MotiView
        from={{ translateY: height * 0.6 }}
        animate={{ translateY: 0 }}
        style={styles.contentSheet}
      >
        <View style={styles.handle} />
        <View style={styles.handle} />
        <Text style={styles.sectionTitle}>TRUCK & BAKKIE HIRE</Text>

        {/* 🪙 NEW: MANAGEMENT BUTTONS */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => router.push("/fleet/list-vehicle")}
            style={[
              styles.truckBrick,
              { flex: 1, marginBottom: 0, backgroundColor: "#334155" },
            ]}
          >
            <View style={styles.truckInfo}>
              <Truck color="#FBBF24" size={20} />
              <Text
                style={[
                  styles.legoBtnText,
                  { color: "#FFF", marginLeft: 8, fontSize: 12 },
                ]}
              >
                MY FLEET
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/asset-verification")}
            style={[
              styles.truckBrick,
              { flex: 1, marginBottom: 0, backgroundColor: "#FBBF24" },
            ]}
          >
            <View style={styles.truckInfo}>
              <ShieldCheck color="#000" size={20} />
              <Text
                style={[
                  styles.legoBtnText,
                  { color: "#000", marginLeft: 8, fontSize: 12 },
                ]}
              >
                VERIFY NEW
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>AVAILABLE FOR HIRE</Text>
        {loading ? (
          <ActivityIndicator color="#FBBF24" size="large" />
        ) : (
          <FlatList
            data={assets}
            renderItem={renderAssetCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  mapContainer: { height: height * 0.4 },
  contentSheet: {
    height: height * 0.6,
    backgroundColor: "#0F172A",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#334155",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 2,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 20,
    letterSpacing: 1,
  },
  truckBrick: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  truckInfo: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  truckName: { color: "#FFF", fontWeight: "800", fontSize: 15 },
  truckSub: { color: "#94A3B8", fontSize: 12, marginTop: 2 },
  bookBtn: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookText: { color: "#000", fontWeight: "900", fontSize: 11 },
  customMarker: {
    backgroundColor: "#FBBF24",
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  legoBtnText: {
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 12,
  },
  // Add this if you haven't yet for the new management buttons
});
