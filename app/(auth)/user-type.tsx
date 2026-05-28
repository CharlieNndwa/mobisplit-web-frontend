import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 🪙 GOLD COIN INTEGRATION: Import your global network structures & modular api handlers
import { getSocket, authAPI } from '../../config/api'; 

const DRIVER_ICON = "https://cdn-icons-png.flaticon.com/128/8583/8583437.png";
const RIDER_ICON = "https://cdn-icons-png.flaticon.com/128/12812/12812515.png";

export default function UserTypeSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

 // 🪙 PRODUCTION HANDLER WITH REAL-TIME SOCKET PIPELINE
  // 🪙 PRODUCTION HANDLER WITH REAL-TIME SOCKET PIPELINE
  const handleSelection = async (type: 'rider' | 'driver') => {
    setLoading(type);
    try {
      // 1. Persist the user profile selection identity securely across states
      await SecureStore.setItemAsync('user_type', type);
      
      // ✨ FIX: Check both common storage patterns to avoid token drops
      let token = await SecureStore.getItemAsync('user_token');
      if (!token) {
        token = await AsyncStorage.getItem('userToken');
      }
      
      // 2. Real-Time Socket Connection Handshake Sync
      if (token) {
        const socket = getSocket();
        if (socket && socket.connected) {
          socket.emit('user:register_role', {
            token: token,
            role: type
          });
          console.log(`📡 Real-time engine transmitted identity update: ${type}`);
        } else {
          console.log("⚠️ Core socket offline. Pipeline fallback to local database memory caches.");
        }
      }

      // 3. Handle specific operational onboarding route switches
      if (type === 'driver') {
        // Set configuration keys to prevent gateway middleware drops
        await SecureStore.setItemAsync('needs_driver_setup', 'true');
        await SecureStore.setItemAsync('is_verified_driver', 'false');
        
        // Lightweight performance timeout to allow memory updates to save safely
        setTimeout(() => {
          setLoading(null);
          console.log("🚗 Routing driver account cleanly to functional home tab layout...");
          // ✨ Explicitly route right to the home screen layout root tab
          router.replace("/(tabs)/home");
        }, 800);
      } else {
        await SecureStore.setItemAsync('needs_driver_setup', 'false');
        await SecureStore.setItemAsync('is_verified_driver', 'false');
        
        setTimeout(() => {
          setLoading(null);
          router.replace("/welcome");
        }, 800);
      }
    } catch (error) {
      console.error("🚨 Role Selection Pipeline Failure:", error);
      Alert.alert("Selection Error", "Failed to cache user session layout variables. Please try again.");
      setLoading(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MotiView 
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <Text style={styles.title}>Choose Your Identity</Text>
          <Text style={styles.subtitle}>
            Select how you would like to move or earn today with MobiSplit.
          </Text>
        </MotiView>

        {/* 🪙 RIDER CARD COMPONENT */}
        <TouchableOpacity 
          style={[
            styles.card, 
            { backgroundColor: '#F0F9FF', borderColor: loading === 'rider' ? '#0284C7' : '#000' }
          ]}
          onPress={() => handleSelection('rider')}
          disabled={loading !== null}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
            <Image source={{ uri: RIDER_ICON }} style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.cardTitle, { color: '#0369A1' }]}>I am a Rider</Text>
            <Text style={styles.cardSub}>Book instant, splitting-fare shared transit options.</Text>
          </View>
          {loading === 'rider' && <ActivityIndicator color="#0284C7" size="small" />}
        </TouchableOpacity>

        {/* 🪙 DRIVER CARD COMPONENT */}
        <TouchableOpacity 
          style={[
            styles.card, 
            { backgroundColor: '#F0FDF4', borderColor: loading === 'driver' ? '#16A34A' : '#000' }
          ]}
          onPress={() => handleSelection('driver')}
          disabled={loading !== null}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
            <Image source={{ uri: DRIVER_ICON }} style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.cardTitle, { color: '#15803D' }]}>I am a Driver</Text>
            <Text style={styles.cardSub}>Earn money by picking up matching localized routes.</Text>
          </View>
          {loading === 'driver' && <ActivityIndicator color="#16A34A" size="small" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 25, flex: 1, justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '900', color: '#0F172A', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginTop: 5, marginBottom: 40, lineHeight: 22 },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 22, 
    borderRadius: 24, 
    borderWidth: 2.5, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  icon: { width: 32, height: 32, resizeMode: 'contain' },
  textContainer: { flex: 1, paddingRight: 8 },
  cardTitle: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#475569', lineHeight: 18 }
});