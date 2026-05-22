import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Navigation, Phone, ShieldAlert, User, MapPin } from "lucide-react-native";
import { MotiView } from "moti";
import { SOSButton } from '../components/SOSButton'; // Adjusted relative path

const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = "AIzaSyD86PK-81FcvH3vgoF84Ia0wqbRctLzt3s";

export default function LiveNavigation() {
  const [currentLoc] = useState({ latitude: -26.12, longitude: 28.21 });
  const [destination] = useState({ latitude: -26.15, longitude: 28.25 });
  const [tripStatus, setTripStatus] = useState("EN_ROUTE_PICKUP");

  const openExternalMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const url = Platform.select({
      ios: `${scheme}Rider@${destination.latitude},${destination.longitude}`,
      android: `${scheme}${destination.latitude},${destination.longitude}(Rider)`
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{ ...currentLoc, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
      >
        <Marker coordinate={currentLoc} title="You">
            <View style={styles.driverMarkerStud} />
        </Marker>
        <Marker coordinate={destination} title="Rider Pickup">
            <View style={styles.riderMarkerStud}><User color="#FFF" size={14}/></View>
        </Marker>

        <MapViewDirections
          origin={currentLoc}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#1E40AF"
        />
      </MapView>

      {/* TOP NAV: External Maps Trigger */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.externalMapBtn} onPress={openExternalMaps}>
          <Navigation color="#000" size={18} />
          <Text style={styles.externalMapText}>GOOGLE MAPS</Text>
        </TouchableOpacity>
      </View>

      {/* MISSION CONTROL: Midnight Lego Card[cite: 17] */}
      <MotiView from={{ translateY: 250 }} animate={{ translateY: 0 }} style={styles.missionCard}>
        <View style={styles.legoHeader}>
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: '#FBBF24' }]} />
            <Text style={styles.statusLabel}>{tripStatus.replace('_', ' ')}</Text>
          </View>
          <Text style={styles.distanceText}>3.2 KM AWAY</Text>
        </View>

        <View style={styles.riderInfo}>
          <Text style={styles.riderName}>John D. (Rider)</Text>
          <View style={styles.addressRow}>
             <MapPin color="#1E40AF" size={16} />
             <Text style={styles.addressText}>123 Gwigwi Mrwebi St</Text>
          </View>
        </View>

        <View style={styles.actionGrid}>
          <SOSButton userId="DRIVER_123" role="CAPTAIN" />
          <TouchableOpacity style={styles.mainActionBtn} onPress={() => setTripStatus("ARRIVED")}>
            <Text style={styles.mainActionText}>I HAVE ARRIVED</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.phoneBtn}>
            <Phone color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { width, height },
  topNav: { position: 'absolute', top: 50, width: '100%', alignItems: 'center' },
  externalMapBtn: { backgroundColor: '#FBBF24', flexDirection: 'row', padding: 12, borderRadius: 12, gap: 8, borderBottomWidth: 4, borderBottomColor: '#B45309' },
  externalMapText: { fontWeight: '900', fontSize: 12 },
  driverMarkerStud: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#1E40AF', borderWidth: 3, borderColor: '#FFF' },
  riderMarkerStud: { backgroundColor: '#10B981', padding: 6, borderRadius: 8, borderWidth: 2, borderColor: '#FFF' },
  missionCard: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#1E293B', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, borderTopWidth: 5, borderTopColor: '#000' },
  legoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  distanceText: { color: '#1E40AF', fontWeight: '900' },
  riderInfo: { marginBottom: 20 },
  riderName: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  addressText: { color: '#94A3B8', fontSize: 13 },
  actionGrid: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  mainActionBtn: { flex: 1, backgroundColor: '#1E40AF', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderBottomColor: '#172554' },
  mainActionText: { color: '#FFF', fontWeight: '900' },
  phoneBtn: { width: 55, height: 55, backgroundColor: '#334155', borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 4, borderBottomColor: '#000' }
});