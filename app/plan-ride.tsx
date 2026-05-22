import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Linking,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Car,
  Navigation,
  ShieldCheck,
  Users,
  Clock,
  UserX,
  Filter,
} from "lucide-react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import io from "socket.io-client"; // Fixes: Cannot find name 'io'

const { width, height } = Dimensions.get("window");
// CHANGE THIS (Around line 36-38):
const GOOGLE_MAPS_APIKEY = "AIzaSyDQ95xWTXjak5iEL9CjbNYI7hx2zaU20C8";

// CHANGE THIS:
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.8.247:5000";
const SOCKET_URL = BASE_URL;
const API_BASE = `${BASE_URL}/api`;

// 1. Add this interface above the component or at the top
interface DriverLocation {
  id: string;
  lat: number;
  lng: number;
  heading: number;
}

// 🪙 Unified Service Structure Interface
interface RideCategory {
  id: string;
  name: string;
  imageUrl: string;
  basePrice: number;
  perKmRate: number;
  multiplier: number; // 🪙 Add this line to satisfy compiler
  eta: string;
  desc: string;
}

export default function PlanRideScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const pickupRef = useRef<any>(null);
  const socketRef = useRef<any>(null);
  const destinationRef = useRef<any>(null);

  const [rideStatus, setRideStatus] = useState("idle");
  const [assignedDriver, setAssignedDriver] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ECONOMY"); // 🪙 Added for filtering
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"WALLET" | "CASH">(
    "WALLET",
  );

  // 🪙 1. UPDATED STATE DECLARATIONS
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  // 🪙 2. Real-Time Driver Markers & Request Coordinates
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);

  // 🪙 Three-Tier Visually Polished Service Array Configuration
  const RIDE_CATEGORIES: RideCategory[] = [
    {
      id: "ECONOMY",
      name: "MobiSplit Economy",
      imageUrl:
        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png",
      basePrice: 15.0,
      perKmRate: 8.5,
      multiplier: 1.0,
      eta: "3 mins",
      desc: "Affordable everyday rides",
    },
    {
      id: "COMFORT",
      name: "MobiSplit Comfort",
      imageUrl:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zNTdmMTJmNi1iMzhiLTQwM2QtYjNlZS04NGM2YzdhM2QwODAuanBn",
      basePrice: 25.0,
      perKmRate: 11.0,
      multiplier: 1.2,
      eta: "2 mins",
      desc: "Newer vehicles with extra legroom",
    },
    {
      id: "PREMIUM",
      name: "MobiSplit Premium",
      imageUrl:
        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Premier_SUV.png",
      basePrice: 40.0,
      perKmRate: 16.5,
      multiplier: 1.5,
      eta: "1 min",
      desc: "Luxury multi-seater flagships",
    },
  ];

  const [coords, setCoords] = useState<{
    origin: { latitude: number; longitude: number } | null;
    destination: { latitude: number; longitude: number } | null;
  }>({
    origin: null,
    destination: null,
  });

  // 🪙 FIX: tripData is the source of truth for distance and fare
  const [tripData, setTripData] = useState({
    distance: 0,
    duration: 0,
    fare: 0,
  });

  // 🪙 OPTIMIZED SOCKET & FILTERING LOGIC
  useEffect(() => {
    let socket: any;

    const initSocket = async () => {
      try {
        const userId = await SecureStore.getItemAsync("userId");
        // 🪙 Pass category in query for backend room-joining
        socket = io(SOCKET_URL, {
          transports: ["websocket"],
          query: { userId, role: "rider", category: selectedCategory },
          reconnection: true,
        });

        socketRef.current = socket;

        // 🪙 NEW: Listen for moving driver markers
        socket.on(
          "driver:location_update",
          (data: { driverId: string; lat: number; lng: number }) => {
            setNearbyDrivers((prev) =>
              prev.map((d) =>
                d.driverId === data.driverId
                  ? { ...d, latitude: data.lat, longitude: data.lng }
                  : d,
              ),
            );
          },
        );

        socket.on("drivers:nearby_update", (driverUpdate: any) => {
          // 🪙 LOGIC: Only add to map if verified and matches category
          if (
            driverUpdate.is_verified &&
            driverUpdate.category === selectedCategory
          ) {
            setNearbyDrivers((prev) => {
              const others = prev.filter(
                (d) => d.driverId !== driverUpdate.driverId,
              );
              return [...others, driverUpdate];
            });
          }
        });

        socket.on("ride:accepted", (driverData: any) => {
          setRideStatus("accepted");
          setAssignedDriver(driverData);
          Alert.alert("Driver Found!", `${driverData.name} is on the way.`);
        });
      } catch (error) {
        console.error("Socket Initialization Error:", error);
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.off("drivers:nearby_update");
        socket.disconnect(); // 🪙 Prevent memory leaks on 4GB RAM laptop
      }
    };
  }, [selectedCategory]); // 🪙 Re-connect/Re-filter when category changes

  // 🪙 Base calculation strategy with South African Rand localization
  const calculateFare = (distanceKm: number, categoryId: string): number => {
    const baseFare = 25.0; // R25 base rate
    const ratePerKm = 11.5; // R11.50 per km
    const selected = RIDE_CATEGORIES.find((c) => c.id === categoryId);
    const multiplier = selected ? selected.multiplier : 1.0;

    const computed = (baseFare + distanceKm * ratePerKm) * multiplier;
    return Math.max(computed, 30.0); // Minimum fare rule of R30
  };

  // 🪙 Local helper function matching looped mapping structure logic
  const getSelectedFareValue = (): number => {
    const target = RIDE_CATEGORIES.find((c) => c.id === selectedCategory);
    if (!target) return 30.0;
    const travelDistance = tripData.distance || 0;
    const computed = target.basePrice + travelDistance * target.perKmRate;
    return Math.max(target.basePrice, Math.round(computed));
  };

  // Fetch active account metrics on mount
  useEffect(() => {
    const fetchActiveWalletMetrics = async () => {
      try {
        const userId = await SecureStore.getItemAsync("user_id");
        if (!userId) return;
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/payments/wallet/${userId}`,
        );
        const data = await res.json();
        if (data && data.balance) {
          setWalletBalance(parseFloat(data.balance));
        }
      } catch (err) {
        console.error("Failed syncing rider data context:", err);
      }
    };
    fetchActiveWalletMetrics();
  }, []);

  const useCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required.");
      return;
    }
    setLoading(true);
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
      const address = `${reverse[0].name || ""} ${reverse[0].street || ""}, ${reverse[0].city || ""}`;
      setPickup(address);
      pickupRef.current?.setAddressText(address);
      setCoords((prev) => ({ ...prev, origin: { latitude, longitude } }));
    } catch (error) {
      Alert.alert("Error", "Could not fetch current location.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRide = () => {
    if (!coords.origin || !coords.destination) {
      Alert.alert("Selection Required", "Please select both locations.");
      return;
    }

    // 🪙 Emit intention to backend for early spatial matching
    if (socketRef.current) {
      socketRef.current.emit("rider:searching", {
        lat: coords.origin.latitude,
        lng: coords.origin.longitude,
        category: selectedCategory,
      });
    }

    setShowMap(true);
  };

  // Real-Time Dispatch Engine Execution Block inside plan-ride.tsx
  const triggerDispatchRouting = async (
    selectedCategory: string,
    calculatedFare: number,
    passengerCount: number = 1
  ) => {
    // 1. Guard against incomplete transit coordinates using existing coords state
    if (!coords.origin || !coords.destination) {
      Alert.alert("Route Incomplete", "Please establish valid pickup and dropoff points before requesting.");
      return;
    }

    setLoading(true);

    try {
      // Retrieve authenticated state safely from local storage
      const riderId = await SecureStore.getItemAsync("user_id");
      if (!riderId) {
        Alert.alert("Session Expired", "Please log out and sign in again to re-authenticate.");
        setLoading(false);
        return;
      }

      // 2. Format localized state parameters matching back-end schemas
      const payload = {
        rider_id: riderId,
        riderId: riderId, // Backwards-compatible matching field for controllers
        pickup_lat: coords.origin.latitude,
        pickup_lng: coords.origin.longitude,
        dest_lat: coords.destination.latitude,
        dest_lng: coords.destination.longitude,
        pickup: { lat: coords.origin.latitude, lng: coords.origin.longitude },
        destination: { lat: coords.destination.latitude, lng: coords.destination.longitude },
        pickup_address: pickup || "Selected Location",
        destination_address: destination || "Destination Location",
        fare_total: calculatedFare,
        fare: calculatedFare,
        category: selectedCategory.toUpperCase(), // Match ECONOMY, PREMIUM, XL
        passengers: passengerCount,
        passengerCount: passengerCount
      };

      // 3. Dispatch the tracking transaction request over the standard API
      const response = await fetch(`${BASE_URL}/api/rides/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data) {
        throw new Error(data.message || "Failed to submit request transaction to server.");
      }

      // 4. Extract assigned database parameters and pass to the localized socket room
      const generatedRideId = data.id || data.rideId || data.newRide?.id;

      if (socketRef.current && socketRef.current.connected) {
        // Explicitly join the localized tracking channel using the correct socket ref
        socketRef.current.emit("ride:join_channel", { rideId: generatedRideId, userType: "rider" });
      }

      // 5. Navigate immediately to the tracking viewport sheet with full navigation parameters
      router.push({
        pathname: "/onboarding/RiderDispatchScreen",
        params: {
          rideId: generatedRideId,
          fare: calculatedFare.toString(),
          category: selectedCategory,
          pickupAddress: pickup,
          destinationAddress: destination
        }
      });

    } catch (networkError: any) {
      console.error("Real-Time Dispatch Critical Fault: ", networkError);
      Alert.alert(
        "Dispatch Disrupted",
        "Unable to establish connection with our dispatch networks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 🛡️ Complete Pre-Flight Validation inside handleConfirmRide
  const handleConfirmRide = async () => {
    if (!coords.origin || !coords.destination) {
      Alert.alert(
        "Missing Route",
        "Please provide both pickup and destination address points.",
      );
      return;
    }

    setLoading(true);
    try {
      const sessionData = await SecureStore.getItemAsync("user_session");
      const session = sessionData ? JSON.parse(sessionData) : null;
      // Explicitly fall back through both casing versions to maximize compatibility:
      const userId =
        session?.user?.id ||
        (await SecureStore.getItemAsync("user_id")) ||
        (await SecureStore.getItemAsync("userId"));

      if (!userId) {
        Alert.alert(
          "Authentication Required",
          "User session not found. Please log in again.",
        );
        setLoading(false);
        return;
      }

      // 🪙 Dynamic pricing verification using state values
      const finalFare = calculateFare(tripData.distance, selectedCategory);

      // 🪙 Run wallet threshold safety check if using wallet payment option
      if (paymentMethod === "WALLET") {
        const balanceRes = await fetch(
          `${SOCKET_URL}/api/payments/wallet/${userId}`,
          {
            headers: { "ngrok-skip-browser-warning": "true" },
          },
        );
        const balanceData = await balanceRes.json();
        const currentBalance = parseFloat(balanceData.balance || "0");

        if (currentBalance < finalFare) {
          Alert.alert(
            "Insufficient Wallet Balance",
            `Your current wallet balance (R${currentBalance.toFixed(2)}) is insufficient for this trip's estimate (R${finalFare.toFixed(2)}).`,
            [
              { text: "Top Up Wallet", onPress: () => router.push("/wallet") },
              {
                text: "Switch to Cash",
                onPress: () => setPaymentMethod("CASH"),
              },
              { text: "Cancel", style: "cancel" },
            ],
          );
          return;
        }
      }

      // Post validated booking parameters to system core backend
      const response = await fetch(`${SOCKET_URL}/api/rides/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rider_id: userId,
          pickup_lat: coords.origin.latitude,
          pickup_lng: coords.origin.longitude,
          dest_lat: coords.destination.latitude,
          dest_lng: coords.destination.longitude,
          pickup_address: pickup,
          destination_address: destination,
          fare_total: finalFare,
          passengers: passengerCount,
          duration_min: Math.ceil(tripData.duration),
          category: selectedCategory,
          payment_type: paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Emit through stateful referenced real-time socket connections
        if (socketRef.current) {
          socketRef.current.emit("requestRide", {
            rideId: data.ride.id,
            userId,
            fare: finalFare,
            pickup,
            destination,
            category: selectedCategory,
          });
        }

        // Safe transition parameters using explicit casting parameters
        router.push({
          pathname: "/onboarding/RiderDispatchScreen",
          params: {
            fare: finalFare.toFixed(2),
            rideId: data.ride.id.toString(),
          },
        });
      } else {
        Alert.alert(
          "Dispatch Error",
          data.error ||
            "The system was unable to submit the dispatch parameters.",
        );
      }
    } catch (e) {
      console.error("Confirm Ride Process Failure:", e);
      Alert.alert(
        "Connectivity Failure",
        "Could not establish transmission loop with our pricing engines.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {!showMap ? (
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.topBackBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#FFF" size={32} />
          </TouchableOpacity>

          <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image
              source={require("./images/logo__3_-removebg-preview.png")}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          </MotiView>

          <View style={styles.legoBrickBody}>
            <View style={styles.searchInputsRow}>
              <View style={styles.legoConnectorVertical}>
                <View style={styles.legoDotGreen} />
                <View style={styles.legoVerticalDash} />
                <View style={styles.legoDotBlue} />
              </View>

              <View style={styles.inputArea}>
                <View style={{ zIndex: 5000 }}>
                  <Text style={styles.inputLabel}>Pickup Point</Text>
                  <GooglePlacesAutocomplete
                    ref={pickupRef}
                    placeholder="Search Pickup Location"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      setPickup(data.description);
                      setCoords((prev) => ({
                        ...prev,
                        origin: {
                          latitude: details!.geometry.location.lat,
                          longitude: details!.geometry.location.lng,
                        },
                      }));
                    }}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: "en",
                      components: "country:za",
                    }}
                    styles={{
                      textInput: styles.atomicInput,
                      listView: styles.listViewOverlay,
                    }}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                  />
                  <TouchableOpacity
                    onPress={useCurrentLocation}
                    style={styles.locationIcon}
                  >
                    <Navigation color="#1E40AF" size={20} />
                  </TouchableOpacity>
                </View>

                <View style={styles.atomicDividerContainer}>
                  <View style={styles.atomicDividerLine} />
                  <View style={styles.atomicDividerCircle} />
                  <View style={styles.atomicDividerLine} />
                </View>

                <View style={{ zIndex: 4000 }}>
                  <Text style={styles.inputLabel}>Destination</Text>
                  <GooglePlacesAutocomplete
                    ref={destinationRef}
                    placeholder="Where to?"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                      setDestination(data.description);
                      setCoords((prev) => ({
                        ...prev,
                        destination: {
                          latitude: details!.geometry.location.lat,
                          longitude: details!.geometry.location.lng,
                        },
                      }));
                    }}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: "en",
                      components: "country:za",
                    }}
                    styles={{
                      textInput: styles.atomicInput,
                      listView: styles.listViewOverlay,
                    }}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.findRideBtn}
              onPress={handleRequestRide}
            >
              <LinearGradient
                colors={["#1E40AF", "#1D4ED8"]}
                style={styles.gradientBtn}
              >
                <Text style={styles.btnText}>FIND RIDE</Text>
                <Car color="#FFF" size={22} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: coords.origin?.latitude || -26.2041,
              longitude: coords.origin?.longitude || 28.0473,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {coords.origin && (
              <Marker
                coordinate={coords.origin}
                title="Pickup"
                pinColor="green"
              />
            )}
            {coords.destination && (
              <Marker coordinate={coords.destination} title="Destination" />
            )}

            {nearbyDrivers.map((driver) => (
              <Marker
                key={driver.id}
                coordinate={{ latitude: driver.lat, longitude: driver.lng }}
                rotation={driver.heading}
                flat={true}
              >
                <Image
                  source={require("../app/images/car-marker.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
              </Marker>
            ))}

            {coords.origin && coords.destination && (
              <MapViewDirections
                origin={coords.origin}
                destination={coords.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="#1E40AF"
                onReady={(result) => {
                  setTripData({
                    distance: result.distance,
                    duration: Math.ceil(result.duration),
                    fare: calculateFare(result.distance, selectedCategory),
                  });
                  mapRef.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: { right: 50, bottom: 350, left: 50, top: 100 },
                  });
                }}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.backFab}
            onPress={() => setShowMap(false)}
          >
            <ChevronLeft color="#000" size={28} />
          </TouchableOpacity>

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["45%", "85%"]}
            index={0}
            enablePanDownToClose={false}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.sheetIndicator}
          >
            <BottomSheetView style={styles.sheetContent}>
              {rideStatus === "idle" && (
                <>
                  <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Trip Details</Text>
                    <View style={styles.verifiedBadge}>
                      <ShieldCheck color="#10B981" size={16} />
                      <Text style={styles.verifiedText}>Secure</Text>
                    </View>
                  </View>

                  <View style={styles.timeEstimateBox}>
                    <Clock color="#10B981" size={20} />
                    <Text style={styles.timeText}>
                      Estimated Arrival:{" "}
                      {tripData.duration ? Math.ceil(tripData.duration) : "3"}{" "}
                      mins
                    </Text>
                  </View>

                  {/* Passenger Count Selection Row */}
                  <View style={styles.passengerEngine}>
                    <TouchableOpacity
                      style={[
                        styles.passengerBtn,
                        passengerCount === 1 && styles.activePassenger,
                      ]}
                      onPress={() => setPassengerCount(1)}
                    >
                      <Users
                        color={passengerCount === 1 ? "#000" : "#64748B"}
                        size={18}
                      />
                      <Text
                        style={[
                          styles.passengerBtnText,
                          passengerCount === 1 && styles.activeText,
                        ]}
                      >
                        Me
                      </Text>
                    </TouchableOpacity>
                    {[2, 3, 4].map((num) => (
                      <TouchableOpacity
                        key={num}
                        style={[
                          styles.passengerBtn,
                          passengerCount === num && styles.activePassenger,
                        ]}
                        onPress={() => setPassengerCount(num)}
                      >
                        <Text
                          style={[
                            styles.passengerBtnText,
                            passengerCount === num && styles.activeText,
                          ]}
                        >
                          +{num - 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.sectionLabel}>
                    Select Service Category
                  </Text>

                  {RIDE_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryCard,
                        selectedCategory === cat.id &&
                          styles.selectedCategoryCard,
                      ]}
                      onPress={() => setSelectedCategory(cat.id)}
                    >
                      <Image
                        source={{ uri: cat.imageUrl }}
                        style={styles.carImage}
                      />
                      <View style={styles.detailsContainer}>
                        <Text style={styles.categoryName}>{cat.name}</Text>
                        <Text style={styles.categoryDesc}>{cat.desc}</Text>
                      </View>
                      <Text style={styles.priceText}>
                        R{(tripData.fare * cat.multiplier).toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <View style={styles.dividerDivider} />

                  {/* 🪙 LIVE WALLET INTEGRATION LAYER WITH BACKEND HOOKS */}
                  <View style={styles.paymentMethodRow}>
                    <View style={styles.paymentLeft}>
                      <View style={styles.walletIconContainer}>
                        <Text
                          style={{
                            color: "#10B981",
                            fontWeight: "900",
                            fontSize: 12,
                          }}
                        >
                          R
                        </Text>
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text
                          style={{
                            color: "#FFF",
                            fontWeight: "700",
                            fontSize: 14,
                          }}
                        >
                          Personal Wallet
                        </Text>
                        <Text
                          style={{
                            color: walletBalance >= 50 ? "#10B981" : "#EF4444",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Live Balance: R {walletBalance.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.walletActiveIndicator}>ACTIVE</Text>
                  </View>

                  {/* Booking Request Dispatch Button */}
                  <TouchableOpacity
                    style={styles.confirmRideBtn}
                    onPress={handleConfirmRide}
                    disabled={loading}
                  >
                    <LinearGradient
                      colors={["#10B981", "#059669"]}
                      style={styles.confirmGradient}
                    >
                      {loading ? (
                        <ActivityIndicator color="#000" />
                      ) : (
                        <Text
                          style={[styles.confirmBtnText, { color: "#000" }]}
                        >
                          CONFIRM BOOKING REQUEST
                        </Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {rideStatus === "searching" && (
                <View style={styles.searchingState}>
                  <ActivityIndicator size="large" color="#10B981" />
                  <Text style={styles.statusText}>
                    Searching for matching drivers...
                  </Text>
                  <Text
                    style={{ color: "#64748B", fontSize: 13, marginTop: 8 }}
                  >
                    Filtering verified operators within {selectedCategory} tier
                  </Text>
                </View>
              )}

              {rideStatus === "accepted" && assignedDriver && (
                <View style={styles.driverDetailsCard}>
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>{assignedDriver.name}</Text>
                    <View style={styles.carBadge}>
                      <Text style={styles.plateText}>
                        {assignedDriver.plate}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.carModel}>
                    {assignedDriver.color} {assignedDriver.model}
                  </Text>

                  {/* 📖 THE READING LOUNGE SECTION */}
                  <View style={styles.readingLoungeContainer}>
                    <Text style={styles.readingTitle}>While you wait...</Text>
                    <TouchableOpacity
                      style={styles.magazineButton}
                      onPress={() =>
                        Linking.openURL(
                          "https://www.magzter.com/magazines/lifestyle",
                        )
                      }
                    >
                      <LinearGradient
                        colors={["#10B981", "#059669"]}
                        style={styles.magazineGradient}
                      >
                        <Text style={styles.magazineButtonText}>
                          📖 Open Reading Lounge
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.readingSubtext}>
                      Browse top magazines while your driver arrives
                    </Text>
                  </View>
                </View>
              )}
            </BottomSheetView>
          </BottomSheet>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  searchContainer: { flex: 1, padding: 20 },
  topBackBtn: { position: "absolute", top: 20, left: 20, zIndex: 10 },
  mainLogo: {
    width: width * 0.8,
    height: 100,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  legoBrickBody: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    elevation: 10,
  },
  searchInputsRow: { flexDirection: "row", alignItems: "flex-start" },
  legoConnectorVertical: {
    alignItems: "center",
    marginRight: 15,
    marginTop: 45,
  },
  legoDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
  },
  legoVerticalDash: {
    width: 2,
    height: 85,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  legoDotBlue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1E40AF",
  },
  inputArea: { flex: 1 },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  atomicInput: {
    fontSize: 16,
    color: "#0F172A",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  listViewOverlay: {
    backgroundColor: "#FFF",
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 9999,
    borderRadius: 12,
    elevation: 10,
    maxHeight: 180,
  },
  atomicDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 35,
  },
  atomicDividerLine: { flex: 1, height: 1, backgroundColor: "#F1F5F9" },
  atomicDividerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 12,
  },
  locationIcon: { position: "absolute", right: 12, top: 35, zIndex: 10000 },
  findRideBtn: { height: 60, marginTop: 30 },
  gradientBtn: {
    flex: 1,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  btnText: { color: "#FFF", fontWeight: "900", fontSize: 18 },
  map: { width, height },
  backFab: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  sheetContent: { padding: 25 },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sheetTitle: { fontSize: 22, fontWeight: "900" },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  timeEstimateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  timeText: { marginLeft: 10, color: "#1E40AF", fontWeight: "700" },
  passengerEngine: { flexDirection: "row", gap: 10, marginBottom: 20 },
  passengerBtn: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  activePassenger: { backgroundColor: "#1E40AF" },
  passengerBtnText: { color: "#64748B", fontWeight: "700" },
  activeText: { color: "#FFF" },
  noDriverBox: {
    padding: 15,
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  noDriverText: { color: "#9A3412", fontSize: 14, fontWeight: "700" },
  subNoDriverText: { color: "#9A3412", fontSize: 12, textAlign: "center" },
  fareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  fareLabel: {
    fontSize: 11,
    color: "#64748B",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  fareAmount: { fontSize: 20, fontWeight: "900", color: "#0F172A" },
  confirmRideBtn: { height: 65, borderRadius: 20, overflow: "hidden" },
  confirmGradient: { flex: 1, justifyContent: "center", alignItems: "center" },
  confirmBtnText: { color: "#FFF", fontWeight: "900", fontSize: 18 },
  searchingState: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "#64748B",
    marginTop: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  driverDetailsCard: {
    padding: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  driverInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  driverName: { fontSize: 20, fontWeight: "900", color: "#1E293B" },
  carBadge: {
    backgroundColor: "#FDE047",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
  },
  plateText: { fontWeight: "800", fontSize: 12 },
  carModel: { color: "#64748B", fontSize: 14, fontWeight: "600" },
  // 🪙 CATEGORY TOGGLE STYLES
  categoryToggleContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 1,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 12,
  },
  categoryBtn: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    backgroundColor: "#F1F5F9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeCategoryBtn: {
    backgroundColor: "#1E40AF",
    borderColor: "#1E40AF",
  },
  categoryBtnText: {
    fontWeight: "700",
    color: "#64748B",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "#FFF",
  },
  readingLoungeContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  readingTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  magazineButton: {
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
  },
  magazineGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  magazineButtonText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
  },
  readingSubtext: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
  categoryContainer: { gap: 8, marginVertical: 6, width: "100%" },

  carAssetImage: { width: 60, height: 40, marginRight: 12 },
  categoryDetails: { flex: 1 },
  rowJustified: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryProfileName: { color: "#FFF", fontSize: 14, fontWeight: "800" },
  categoryPriceTag: { color: "#10B981", fontSize: 16, fontWeight: "900" },
  categorySubText: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2,
    width: "75%",
  },
  etaBadge: { color: "#94A3B8", fontSize: 11, fontWeight: "600" },
  dividerDivider: { height: 1, backgroundColor: "#1E293B", marginVertical: 10 },
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  paymentLeft: { flexDirection: "row", alignItems: "center" },
  walletIconContainer: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#112E24",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  walletActiveIndicator: { color: "#10B981", fontWeight: "900", fontSize: 11 },
  // confirmGradient: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 14 }
  sheetBackground: { backgroundColor: "#F1F5F9" }, // Grey Outer Wrap
  sheetIndicator: { backgroundColor: "#94A3B8", width: 60 },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  selectedCategoryCard: { borderColor: "#10B981", backgroundColor: "#E6F4EA" },
  carImage: { width: 60, height: 40, marginRight: 12, resizeMode: "contain" },
  detailsContainer: { flex: 1 },
  categoryName: { color: "#0F172A", fontSize: 14, fontWeight: "800" },
  categoryDesc: { color: "#64748B", fontSize: 12 },
  priceText: { color: "#10B981", fontSize: 16, fontWeight: "900" },
  confirmButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
});
