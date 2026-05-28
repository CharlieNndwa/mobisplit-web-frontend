import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, Navigation, Car, User, MapPin } from "lucide-react-native";
import { MotiView } from "moti";
import * as SecureStore from "expo-secure-store";
import AdBanner from "../components/AdBanner";

const { width } = Dimensions.get("window");
// Replace your old ngrok lines with this dynamic look-up:
const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";

// 1. Defined Interface to fix "Implicit Any" errors
interface TripActivity {
  id: string;
  pickup_name: string;
  destination_name: string;
  price: string;
  status: string;
  created_at: string;
  role: "RIDER" | "DRIVER";
}

export default function ActivityScreen() {
  // 2. Applied Type to State
  const [trips, setTrips] = useState<TripActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivity = useCallback(async () => {
    try {
      // 3. Updated to Profile ID to match your backend audit
      const profileId = await SecureStore.getItemAsync("profile_id");
      if (!profileId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_BASE}/api/activity/${profileId}`,
      );
      const result = await response.json();
      if (result.success) setTrips(result.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchActivity();
  };

  // 4. Fixed Binding element 'item' implicitly has an 'any' type
  const renderItem = ({
    item,
    index,
  }: {
    item: TripActivity;
    index: number;
  }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.tripCard}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.roleBadge,
            { backgroundColor: item.role === "DRIVER" ? "#1E40AF" : "#0F766E" },
          ]}
        >
          <Text style={styles.roleText}>{item.role}</Text>
        </View>
        <Text
          style={[
            styles.statusText,
            { color: item.status === "COMPLETED" ? "#10B981" : "#F59E0B" },
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.addressRow}>
        <MapPin size={14} color="#64748B" />
        <Text style={styles.addressText} numberOfLines={1}>
          {item.pickup_name || "Pickup Location"}
        </Text>
      </View>

      <View style={styles.addressRow}>
        <Navigation size={14} color="#64748B" />
        <Text style={styles.addressText} numberOfLines={1}>
          {item.destination_name || "Destination"}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateBrick}>
          <Clock size={12} color="#64748B" />
          <Text style={styles.dateText}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.priceText}>R{item.price}</Text>
      </View>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFF"
          />
        }
        // 5. Fixed "No overload matches this call" error for ListEmptyComponent
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#1E40AF"
              style={{ marginTop: 50 }}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No trip history found.</Text>
            </View>
          )
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      {/* --- AD SECTION --- */}
      <View style={styles.adSectionWrapper}>
        <Text style={styles.adSectionLabel}>ADVERTISEMENTS</Text>
        <View style={styles.adScrollContainer}>
          <AdBanner />
        </View>
      </View>

      {/* 🪙 ADD THIS: Bottom Spacer to push content above the floating TabBar */}
      <View style={styles.tabBarSpacer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  header: { padding: 20, borderBottomWidth: 1, borderColor: "#1E293B" },
  headerTitle: { color: "#FFF", fontSize: 24, fontWeight: "900" },
  listContent: { padding: 20 },
  tripCard: {
    backgroundColor: "#0F172A",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  roleText: { color: "#FFF", fontSize: 10, fontWeight: "900" },
  statusText: { fontSize: 11, fontWeight: "800" },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  addressText: { color: "#CBD5E1", fontSize: 13, flex: 1 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  dateBrick: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateText: { color: "#64748B", fontSize: 11, fontWeight: "700" },
  priceText: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  emptyState: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#64748B", fontSize: 14, fontWeight: "700" },
  // adSectionWrapper: {
  //   position: "absolute",
  //   bottom: 0,
  //   width: "100%",
  //   backgroundColor: "#020617",
  // },
  // 🪙 ADD THIS:
  tabBarSpacer: {
    height: 110, // Sufficient height to clear the floating TabBar
    width: "100%",
  },
  adSectionWrapper: {
    position: "absolute",
    bottom: 95, // 🪙 LIFTED: Increased from 0 to 95 to clear the TabBar
    width: "90%", // 🪙 OPTIMIZED: Slightly narrower than 100% looks better for floating ads
    alignSelf: "center", // Centers the 90% width container
    backgroundColor: "transparent", // Let the main background show through
  },

  adScrollContainer: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // 🪙 ADDED: Shadow to make it pop above the list
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  adSectionLabel: {
    color: "#FDE047", // 🪙 UPDATED: Yellow color makes it more readable
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
    alignSelf: "flex-start",
    marginLeft: 10,
    textTransform: "uppercase",
  },
});
