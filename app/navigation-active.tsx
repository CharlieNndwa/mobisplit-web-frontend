import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { MotiView } from "moti";
import { CheckCircle2, Navigation as NavIcon, Phone, Shield } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function NavigationActiveScreen() {
  const router = useRouter();
  const [isArrived, setIsArrived] = useState(false);

  const handleFinishRide = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/rides/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId: 'YOUR_RIDE_UUID' }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert("Ride Complete", `R${data.earnings} has been added to your wallet.`);
        router.replace("/driver-summary");
      }
    } catch (e) {
      Alert.alert("Network Error", "Could not finalize payout. Retrying...");
    }
  };

  return (
    <View style={styles.container}>
      {/* Map would go here */}
      <View style={styles.mapPlaceholder} />

      <MotiView from={{ translateY: 100 }} animate={{ translateY: 0 }} style={styles.statusCard}>
        <View style={styles.riderInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.riderName}>John Doe</Text>
            <Text style={styles.subText}>Destination: Sandton City</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconBtn}><Phone color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Shield color="#EF4444" /></TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionBtn, { backgroundColor: isArrived ? '#10B981' : '#1E40AF' }]} 
            onPress={() => isArrived ? handleFinishRide() : setIsArrived(true)}
          >
            <Text style={styles.actionText}>{isArrived ? "FINISH RIDE" : "ARRIVED"}</Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  mapPlaceholder: { flex: 1, backgroundColor: '#CBD5E1' },
  statusCard: { 
    position: 'absolute', bottom: 0, width: '100%', 
    backgroundColor: '#FFF', borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, padding: 25, elevation: 20 
  },
  riderInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E2E8F0' },
  riderName: { fontSize: 18, fontWeight: '800' },
  subText: { color: '#64748B' },
  buttonRow: { flexDirection: 'row', gap: 10 },
  iconBtn: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  actionBtn: { flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  actionText: { color: '#FFF', fontWeight: '900', fontSize: 16 }
});