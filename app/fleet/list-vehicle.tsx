import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Truck, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react-native";
import { MotiView } from "moti";
// 🪙 FIX 1: Add SecureStore Import
import * as SecureStore from "expo-secure-store";

const API_URL = "https://daringly-tacky-anemic.ngrok-free.dev";

// 🪙 ADDED: Interface to solve 'never' error
interface Vehicle {
  id: string | number;
  make: string;
  model: string;
  capacity: string;
  year: string;
  is_verified: boolean;
  city?: string;
}

export default function ListVehicleScreen() {
  const router = useRouter();
  // 🪙 FIXED: Defined type for state
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

 // 🪙 FIX 2: Move the await logic INSIDE the async function
  const fetchMyVehicles = async () => {
    try {
      setLoading(true);
      const userId = await SecureStore.getItemAsync("userId");
      
      // Use your diagnostic check logic here too to avoid the "Unexpected <" error
      const response = await fetch(`${API_URL}/api/assets/user/${userId}`);
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response in Fleet:", text);
        return;
      }

      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Fleet Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Verified": return { color: "#10B981", icon: <CheckCircle2 size={16} color="#10B981" /> };
      case "Pending": return { color: "#FBBF24", icon: <Clock size={16} color="#FBBF24" /> };
      default: return { color: "#EF4444", icon: <AlertCircle size={16} color="#EF4444" /> };
    }
  };

  const renderVehicle = ({ item, index }: any) => {
    const status = item.is_verified ? "Verified" : "Pending";
    const statusStyle = getStatusStyle(status);

    return (
      <MotiView 
        from={{ opacity: 0, translateX: -20 }} 
        animate={{ opacity: 1, translateX: 0 }} 
        transition={{ delay: index * 100 }}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Truck color="#FFF" size={24} />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.makeModel}>{item.make} {item.model}</Text>
            <Text style={styles.capacity}>{item.capacity} • {item.year}</Text>
          </View>
          <View style={styles.statusBadge}>
            {statusStyle.icon}
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{status}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.cardFooter}>
          <Text style={styles.locationText}>{item.city || "Region Pending"}</Text>
          <TouchableOpacity style={styles.manageBtn}>
            <Text style={styles.manageText}>MANAGE</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Fleet</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/asset-verification")}>
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FBBF24" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={vehicles}
          renderItem={renderVehicle}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchMyVehicles} tintColor="#FBBF24" />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No vehicles listed yet.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "900" },
  addBtn: { backgroundColor: "#FBBF24", padding: 8, borderRadius: 10 },
  card: { backgroundColor: "#0F172A", borderRadius: 20, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: "#1E293B" },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: "#1E293B", justifyContent: "center", alignItems: "center" },
  makeModel: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  capacity: { color: "#64748B", fontSize: 13, marginTop: 2 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#1E293B", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "900" },
  divider: { height: 1, backgroundColor: "#1E293B", marginVertical: 15 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  locationText: { color: "#94A3B8", fontSize: 12, fontWeight: "600" },
  manageBtn: { backgroundColor: "#334155", paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  manageText: { color: "#FFF", fontSize: 10, fontWeight: "900" },
  empty: { marginTop: 100, alignItems: "center" },
  emptyText: { color: "#64748B", fontWeight: "600" }
});