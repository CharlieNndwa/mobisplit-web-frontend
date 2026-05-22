// RideSelectionScreen.tsx - 🪙 PRODUCTION UPGRADE
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { MotiView } from "moti";
import { Car, Star, Users, ChevronRight } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import io, { Socket } from "socket.io-client";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// FIX: Remove the hardcoded https:// string and read it from process.env safely
const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL || "";

// 🪙 Define an interface for your Estimate object
interface RideEstimate {
  category: string;
  price: number;
  time: string;
  icon: string;
}

export default function RideSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const socket = useRef<Socket | null>(null);

  const [loading, setLoading] = useState(true);
  // 🪙 Update state declaration with the Interface
  const [estimates, setEstimates] = useState<RideEstimate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ECONOMY');

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    fetchRideEstimates();

    socket.current.on("ride:accepted", (data: any) => {
      router.push({
        pathname: "/onboarding/ActiveTripNavigator",
        params: { rideId: data.rideId, driverName: data.driverName }
      });
    });

    return () => { socket.current?.disconnect(); };
  }, []);

  const fetchRideEstimates = async () => {
    try {
      // 🪙 GOLD COIN: Real-time fare estimation call
      const response = await fetch(`${SOCKET_URL}/api/rides/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distanceKm: params.distance || 5.2, 
          durationMin: params.duration || 12
        })
      });
      const result = await response.json();
      setEstimates(result.estimates);
      setLoading(false);
    } catch (err) {
      console.error("Estimation failed", err);
      setLoading(false);
    }
  };

  const renderCategory = ({ item }: any) => {
    const isSelected = selectedCategory === item.category;
    return (
      <TouchableOpacity 
        style={[styles.categoryCard,  selectedCategory === item.category && styles.selectedCard]}
        onPress={() => setSelectedCategory(item.category)}
      >
        <View style={[styles.iconBox, { backgroundColor: isSelected ? '#10B981' : '#F3F4F6' }]}>
           {item.category === 'PREMIUM' ? 
            <Star size={24} color={isSelected ? "#FFF" : "#10B981"} /> : 
            <Car size={24} color={isSelected ? "#FFF" : "#10B981"} />
           }
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.categoryName}>MobiSplit {item.category}</Text>
          <Text style={styles.etaText}>{item.eta} • {item.surgeApplied ? '🔥 High Demand' : 'Standard'}</Text>
        </View>
        <View style={styles.priceCol}>
          <Text style={styles.priceText}>R{item.totalFare}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Calculating fares...</Text>
        </View>
      ) : (
        <MotiView 
          from={{ translateY: 400 }} 
          animate={{ translateY: 0 }} 
          transition={{ type: 'timing', duration: 500 }}
          style={styles.bottomSheet}
        >
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Choose your ride</Text>
          
          <FlatList 
            data={estimates}
            renderItem={renderCategory}
            keyExtractor={(item) => item.category}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <TouchableOpacity 
            style={styles.requestButton}
            onPress={() => console.log("Requested:", selectedCategory)}
          >
            <Text style={styles.requestText}>Confirm MobiSplit {selectedCategory}</Text>
            <ChevronRight color="#FFF" size={24} />
          </TouchableOpacity>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  loaderBox: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)' },
  loadingText: { marginTop: 10, fontWeight: '700', color: '#10B981' },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.6, // 🪙 GOLD COIN: 60% height as requested
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  handle: { width: 40, height: 5, backgroundColor: '#E5E7EB', borderRadius: 10, alignSelf: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 20, fontWeight: '900', color: '#111827', marginBottom: 20 },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F3F4F6'
  },
  selectedCard: { borderColor: '#10B981', backgroundColor: '#F0FDF4' },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  infoCol: { flex: 1, marginLeft: 15 },
  categoryName: { fontSize: 16, fontWeight: '800', color: '#111827' },
  etaText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  priceCol: { alignItems: 'flex-end' },
  priceText: { fontSize: 18, fontWeight: '900', color: '#111827' },
  requestButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    padding: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  requestText: { color: '#FFF', fontSize: 18, fontWeight: '900', marginRight: 10 }
});