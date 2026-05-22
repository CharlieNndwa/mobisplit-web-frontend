import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { 
  ArrowLeft, 
  MapPin, 
  Search,
  ChevronRight
} from 'lucide-react-native';
import { MotiView } from 'moti';
// 🛡️ FIX 1: Explicitly type FlashList to resolve the 'estimatedItemSize' error
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// 🛡️ FIX 1 (Continued): Constant for typed list
const LocationList = FlashList as React.ComponentType<FlashListProps<LocationItem>>;

interface LocationItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'nearby' | 'recent';
  coordinates: [number, number]; 
}

export default function LocationSelection() {
  const router = useRouter();
  const [pickup, setPickup] = useState('Current Location');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<any>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destination.length > 2) {
        searchLocation(destination);
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [destination]);

  const searchLocation = async (query: string) => {
    setLoading(true);
    try {
      let url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`;
      if (userLocation) {
        url += `&lat=${userLocation.latitude}&lon=${userLocation.longitude}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      const formatted = data.features.map((item: any, index: number) => ({
        id: index.toString(),
        title: item.properties.name || item.properties.street || "Unknown Location",
        subtitle: `${item.properties.city || ''} ${item.properties.state || ''}, South Africa`.trim(),
        type: 'nearby',
        coordinates: item.geometry.coordinates
      }));

      setSuggestions(formatted);
    } catch (error) {
      console.error("Photon Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderLocationItem = ({ item }: { item: LocationItem }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => console.log("Selected:", item.title)}
    >
      <View style={styles.iconWrapper}>
        <MapPin size={18} color="#94A3B8" />
      </View>
      <View style={styles.suggestionTextContainer}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionSubtitle} numberOfLines={1}>{item.subtitle}</Text>
      </View>
      <ChevronRight size={18} color="#1F2937" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: -26.1075,
          longitude: 28.0543,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation}>
            <View style={styles.markerContainer}>
              <View style={styles.markerPulse} />
              <View style={styles.markerCore} />
            </View>
          </Marker>
        )}
      </MapView>

      <SafeAreaView style={styles.headerWrapper}>
        {/* 🛡️ FIX 2: Changed 'y' to 'translateY' for Moti compatibility */}
        <MotiView 
          from={{ opacity: 0, translateY: -20 }} 
          animate={{ opacity: 1, translateY: 0 }} 
          style={styles.searchCard}
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <View style={styles.inputStack}>
            <View style={styles.inputRow}>
              <View style={[styles.dot, { backgroundColor: '#00F2C3' }]} />
              <TextInput 
                style={styles.input} 
                value={pickup} 
                onChangeText={setPickup} 
                placeholderTextColor="#64748B" 
              />
            </View>
            <View style={styles.line} />
            <View style={styles.inputRow}>
              <View style={[styles.dot, { backgroundColor: '#32CD32' }]} />
              <TextInput 
                style={[styles.input, { fontWeight: '800' }]} 
                placeholder="Where to?" 
                placeholderTextColor="#94A3B8"
                value={destination}
                onChangeText={setDestination}
                autoFocus
              />
              {loading && <ActivityIndicator size="small" color="#00F2C3" />}
            </View>
          </View>
        </MotiView>
      </SafeAreaView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        style={styles.sheetContainer}
      >
        <MotiView 
          from={{ translateY: 400 }} 
          animate={{ translateY: 0 }} 
          style={styles.sheet}
        >
          <View style={styles.handle} />
          <Text style={styles.sheetHeader}>Suggested Destinations</Text>
          
          {/* 🛡️ FIX 1 (Final): Use the typed LocationList */}
          <LocationList
            data={suggestions}
            renderItem={renderLocationItem}
            estimatedItemSize={75}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View style={styles.emptyResults}>
                <Search size={40} color="#1F2937" style={{ marginBottom: 10 }} />
                <Text style={{ color: '#64748B' }}>
                  {destination.length < 3 ? "Search for a place in South Africa" : "No results found"}
                </Text>
              </View>
            )}
          />
        </MotiView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  map: { width: width, height: height * 0.6 },
  headerWrapper: { position: 'absolute', top: 0, width: '100%', paddingHorizontal: 15 },
  searchCard: { backgroundColor: '#111827', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 10, borderWidth: 1, borderColor: '#1F2937' },
  backBtn: { padding: 10, marginRight: 5 },
  inputStack: { flex: 1 },
  inputRow: { flexDirection: 'row', alignItems: 'center', height: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 15 },
  line: { height: 1, backgroundColor: '#1F2937', marginLeft: 23, marginVertical: 4 },
  input: { flex: 1, color: '#FFF', fontSize: 15 },
  sheetContainer: { position: 'absolute', bottom: 0, width: '100%', height: height * 0.45 },
  sheet: { flex: 1, backgroundColor: '#0B0E14', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, borderTopWidth: 1, borderColor: '#1F2937' },
  handle: { width: 40, height: 4, backgroundColor: '#1F2937', borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
  sheetHeader: { color: '#64748B', fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 15 },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#111827' },
  iconWrapper: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  suggestionTextContainer: { flex: 1 },
  suggestionTitle: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  suggestionSubtitle: { color: '#64748B', fontSize: 12, marginTop: 2 },
  emptyResults: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  markerContainer: { alignItems: 'center', justifyContent: 'center' },
  markerPulse: { position: 'absolute', width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0, 242, 195, 0.3)' },
  markerCore: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#00F2C3', borderWidth: 2, borderColor: '#FFF' }
});





const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#121212" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1f1f1f" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];