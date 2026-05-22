import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

const DRIVER_ICON = "https://cdn-icons-png.flaticon.com/128/8583/8583437.png";
const RIDER_ICON = "https://cdn-icons-png.flaticon.com/128/12812/12812515.png";

export default function UserTypeSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  // Inside handleSelection in user-type.tsx
const handleSelection = async (type: 'rider' | 'driver') => {
  setLoading(type);
  await SecureStore.setItemAsync('user_type', type);
  
  if (type === 'driver') {
    await SecureStore.setItemAsync('needs_driver_setup', 'true');
    await SecureStore.setItemAsync('is_verified_driver', 'false');
    setTimeout(() => {
      setLoading(null);
      router.replace("/onboarding/driver-setup");
    }, 1000);
  } else {
    await SecureStore.setItemAsync('needs_driver_setup', 'false');
    setTimeout(() => {
      setLoading(null);
      router.replace("/(tabs)/home");
    }, 1000);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>How will you use MobiSplit?</Text>
        <Text style={styles.subtitle}>Choose your primary role to get started.</Text>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelection('rider')}
          disabled={!!loading}
        >
          <View style={styles.iconCircle}>
            <Image source={{ uri: RIDER_ICON }} style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>I am a Rider</Text>
            <Text style={styles.cardSub}>Simply book a trip and get picked up comfortably.</Text>
          </View>
          {loading === 'rider' && <ActivityIndicator color="#000" />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { borderColor: '#128408' }]} 
          onPress={() => handleSelection('driver')}
          disabled={!!loading}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
            <Image source={{ uri: DRIVER_ICON }} style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.cardTitle, { color: '#128408' }]}>I am a Driver</Text>
            <Text style={styles.cardSub}>Earn money by finding riders who need a lift.</Text>
          </View>
          {loading === 'driver' && <ActivityIndicator color="#128408" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 25, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', color: '#0F172A', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center', marginTop: 10, marginBottom: 40 },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    borderRadius: 24, 
    borderWidth: 3, 
    borderColor: '#000', 
    marginBottom: 20,
    backgroundColor: '#F8FAFC'
  },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center' },
  icon: { width: 35, height: 35 },
  textContainer: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  cardSub: { fontSize: 13, color: '#64748B', fontWeight: '600', marginTop: 4 }
});