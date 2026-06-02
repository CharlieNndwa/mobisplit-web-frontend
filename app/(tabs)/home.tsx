import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  Platform,
  Linking, // 🪙 RESTORED IMPORT
  Alert,
  Animated, // 🪙 ADDED: High-performance micro-animation core
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText } from "moti";
import { useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Search,
  ShieldCheck,
  Clock,
  Navigation,
  ArrowRight,
  Zap,
  Bell,
  AlertTriangle,
  X,
  ShieldAlert,
  ChevronRight,
  Phone, // 🪙 RESTORED IMPORT
  MessageSquare, // 🪙 RESTORED IMPORT
  MapPin,
  Globe,
  Award,
  Megaphone,
  Gift,
} from "lucide-react-native";
import io, { Socket } from "socket.io-client";
import { useSocket } from '../../context/SocketContext';
// --- Components ---
import AdBanner from "../components/AdBanner";

const { width, height } = Dimensions.get("window");

interface Prediction {
  id: string;
  title: string;
  time: string;
  address: string;
}

// 🪙 ADDED: Trip Interface to resolve "type never" errors
interface LongDistanceTrip {
  id: string;
  driver_name: string;
  pickup_province: string;
  destination_province: string;
  departure_time: string;
  contact_number: string;
  total_fare?: string;
}

// CHANGE THIS:
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const SOCKET_URL = BASE_URL;
const API_BASE = `${BASE_URL}/api`;

const FeatureCardImage = ({ source }: { source: any }) => (
  <Image source={source} style={styles.boltImageAtom} resizeMode="cover" />
);

const BoltFeatureCard = ({ source }: { source: any }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.boltCardMolecule}>
    <FeatureCardImage source={source} />
  </TouchableOpacity>
);

// 🪙 RESTORED COMPONENT DEFINITION TO PREVENT RUNTIME CRASHES
const ServiceBubble = ({ name, icon, onPress }: any) => (
  <TouchableOpacity
    style={styles.bubbleItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.bubbleCircle}>
      <Image source={icon} style={styles.bubblePng} />
    </View>
    <Text style={styles.bubbleName}>{name}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [showDriverNotify, setShowDriverNotify] = useState(false);
  const [hasPromo, setHasPromo] = useState(false);

  // =========================================================
  // 🪙 ADVERTISER ATTRACTION CAMPAIGN MODAL STATES
  // =========================================================
  const [showAdvertiserModal, setShowAdvertiserModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { socket: socketInstance } = useSocket() as any;
  const router = useRouter();
  // 🪙 UPDATED: Moved these hooks INSIDE the component function
  const [longDistanceTrips, setLongDistanceTrips] = useState<
    LongDistanceTrip[]
  >([]);

  // 🪙 Define the missing function to fix Error 2304 & Double API Base Intercept
  const checkPromoStatus = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) return { rideCount: 0 };

      // 🧊 AUDIT REPAIR: Removed nested /api route duplication here
      const response = await fetch(
        `${API_BASE}/activity/stats/${userId}`,
      );
      const data = await response.json();
      return { rideCount: data.totalRides || 0 };
    } catch (error) {
      console.error("Promo Check Error:", error);
      return { rideCount: 0 };
    }
  };

// =========================================================
  // 🪙 HARDENED INTEGRATED INIT ENGINE & PROMO MODAL FLOWS
  // =========================================================
  useEffect(() => {
    const initializeHomeContextAndOnboarding = async () => {
      try {
        // Fetch properties atomically from local storage
        const [userType, hasSeenWelcome, needsSetup, isVerified, hasSeenPromoModal] = await Promise.all([
          SecureStore.getItemAsync("user_type"),
          SecureStore.getItemAsync("has_seen_welcome_gift"),
          SecureStore.getItemAsync("needs_driver_setup"),
          SecureStore.getItemAsync("is_verified_driver"),
          SecureStore.getItemAsync("has_seen_advertiser_modal")
        ]);

        if (needsSetup === "true" && isVerified !== "true") {
          setShowDriverNotify(true);
        } else if (userType === "driver" && isVerified === "true") {
          setShowDriverNotify(false);
        }

        // 🧊 OPTIMIZATION: Successfully removed static { rideCount: 0 } mock to hook live database sync
        const res = await checkPromoStatus();

        if (res.rideCount === 0) {
          setHasPromo(true);
          
          if (userType === "rider" && hasSeenWelcome !== "true") {
            Alert.alert(
              "🎁 Welcome Gift!",
              "Your first two logins without subscription are free. Enjoy your complimentary MobiSplit journey!",
              [
                { 
                  text: "Awesome, thanks!", 
                  onPress: async () => {
                    try {
                      await SecureStore.setItemAsync("has_seen_welcome_gift", "true");
                    } catch (storeErr) {
                      console.error("Failed writing gift flag to SecureStore:", storeErr);
                    }
                  } 
                }
              ]
            );
          } else if (hasSeenPromoModal !== "true") {
            // 🪙 Trigger the custom Uber-esque campaign modal when a new account accesses the dashboard
            setShowAdvertiserModal(true);
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              })
            ]).start();
          }
        }
      } catch (error) {
        console.error("Critical error mapping home promotional and gateway context:", error);
      }
    };

    initializeHomeContextAndOnboarding();
  }, []);

  // 🪙 SYSTEM ONBOARDING RE-EVALUATION ENGINE INSIDE useFocusEffect
  useFocusEffect(
    useCallback(() => {
      const evaluateDriverSetupContext = async () => {
        try {
          const [userType, needsSetup, isVerified] = await Promise.all([
            SecureStore.getItemAsync("user_type"),
            SecureStore.getItemAsync("needs_driver_setup"),
            SecureStore.getItemAsync("is_verified_driver")
          ]);

          // 🪙 UNIFIED BLOCK GATING LOGIC: Terminate modal display immediately if verified or setup is cleared
          if (needsSetup === "false" || isVerified === "true" || userType === "driver") {
            setShowDriverNotify(false);
          } else if (needsSetup === "true" && isVerified !== "true") {
            setShowDriverNotify(true);
          }
        } catch (err) {
          console.error("Critical onboarding storage inspection intercept failure:", err);
        }
      };

      evaluateDriverSetupContext();
    }, [])
  );

// 🪙 Consolidated & Safely Guarded Real-Time Broadcast Hook
  useEffect(() => {
    // Gracefully exit if socket initialization from context is pending
    if (!socketInstance) return;

    const handleTripPublished = (newTrip: LongDistanceTrip) => {
      setLongDistanceTrips((prevTrips) => {
        if (prevTrips.some(t => t.id === newTrip.id)) return prevTrips;
        return [newTrip, ...prevTrips];
      });
    };

    // Attach listeners safely
    socketInstance.on("long_distance:trip_published", handleTripPublished);
    
    return () => {
      if (socketInstance) {
        socketInstance.off("long_distance:trip_published", handleTripPublished);
      }
    };
  }, [socketInstance]);

  // Logic for the Bell Icon Alert
  const handleBellPress = () => {
    if (hasPromo) {
      Alert.alert(
        "Welcome Promo!",
        "Your first 2 rides are R0.00. Enjoy the trip!",
      );
    } else {
      router.push("/inbox");
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // 🪙 UPDATED: Robust fetch pattern to prevent "Unexpected character: g"
        const response = await fetch(`${SOCKET_URL}/api/trips/active`);

        // 🪙 GUARD 1: Stop if the server or ngrok returns an error status (404, 502, etc.)
        if (!response.ok) {
          console.warn(`[Sync] Server/Tunnel error: ${response.status}`);
          return;
        }

        // 🪙 GUARD 2: Check Content-Type. If it's HTML (starting with 'g' for gateway), STOP.
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textPreview = await response.text();
          console.error(
            "[Sync] Non-JSON response. Likely ngrok tunnel error. Preview:",
            textPreview.substring(0, 50),
          );
          return;
        }

        const data = await response.json();

        // 🪙 GUARD 3: Validate structure
        if (data && data.success) {
          setLongDistanceTrips(data.trips);
        } else if (Array.isArray(data)) {
          setLongDistanceTrips(data);
        }
      } catch (error) {
        // Catches network drops or timeouts without crashing the app
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
    const interval = setInterval(fetchTrips, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      const needsSetup = await SecureStore.getItemAsync("needs_driver_setup");
      const isVerified = await SecureStore.getItemAsync("is_verified_driver");

      // Only show if they need setup and are not already verified
      if (needsSetup === "true" && isVerified !== "true") {
        setShowDriverNotify(true);
      }
    };
    checkStatus();
  }, []);

  const predictions: Prediction[] = [
    { id: "1", title: "To Work", time: "8:05 AM", address: "Sandton City, GP" },
    {
      id: "2",
      title: "To Gym",
      time: "5:15 PM",
      address: "Virgin Active, Gauteng",
    },
  ];

  const dismissNotification = async () => {
    setShowDriverNotify(false);
    // Optional: await SecureStore.setItemAsync("needs_driver_setup", "false");
    // if you want it to stay gone after clicking X
  };

  // =========================================================
  // 🪙 CAMPAIGN POP-UP MODAL DISMISS WITH DISK STATE WRITE
  // =========================================================
  const closeAdvertiserModal = async () => {
    try {
      await SecureStore.setItemAsync("has_seen_advertiser_modal", "true");
    } catch (err) {
      console.error("Failed mutating promo state flag to SecureStore:", err);
    }
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowAdvertiserModal(false);
    });
  };

  // Interpolated Styles for Entry Animation Engine
  const modalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

  const modalScale = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1]
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {showDriverNotify && (
          <MotiView
            from={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            style={styles.notificationOverlay}
          >
            <View style={styles.notifyContent}>
              <AlertTriangle color="#FBBF24" size={24} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.notifyTitle}>Complete Driver Setup</Text>
                <Text style={styles.notifySub}>
                  Finish your profile to start earning.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/onboarding/driver-setup")} // 🪙 UPDATED path
                style={styles.notifyBtn}
              >
                <Text style={styles.notifyBtnText}>SETUP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={dismissNotification}
                style={{ marginLeft: 10 }}
              >
                <X color="#94A3B8" size={20} />
              </TouchableOpacity>
            </View>
          </MotiView>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- BRAND HEADER --- */}
          <View style={styles.headerRow}>
            {/* 1. Logo forced to the far LEFT */}
            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <View style={styles.logoRow}>
                <Image
                  source={require("../images/logoroza-removebg-preview.png")}
                  style={styles.logoPngMain}
                  resizeMode="contain"
                />
              </View>
            </MotiView>

            {/* 2. Notification Button forced to the far RIGHT */}
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => {
                // Reset notification when clicked
                setShowDriverNotify(false);
                router.push("/inbox");
              }}
            >
              <Bell color="#FBBF24" size={22} />

              {/* Show red dot if there is a driver notification OR a new user promo */}
              {(showDriverNotify || hasPromo) && <View style={styles.redDot} />}
            </TouchableOpacity>
          </View>

          {/* --- SEARCH BAR SECTION --- */}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/plan-ride")}
              style={styles.searchBar}
            >
              <Search color="#94A3B8" size={22} />
              <Text style={styles.searchPlaceholder}>Where to?</Text>
              <LinearGradient
                colors={["#1E40AF", "#1D4ED8"]}
                style={styles.searchGoBtn}
              >
                <Navigation color="#FFF" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* --- MARKETPLACE BUBBLES --- */}
          <View style={styles.section}>
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitleCentered}>Book your ride</Text>
            </View>

            <View style={styles.bubbleContainerWrapper}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.bubbleScroll}
                contentContainerStyle={styles.bubbleScrollContent}
              >
                <ServiceBubble
                  name="Daily Rides"
                  icon={require("../images/sedan.png")}
                  onPress={() => router.push("/plan-ride")}
                />
                <ServiceBubble
                  name="Shuttle"
                  icon={require("../images/shuttle-bus.png")}
                  onPress={() => router.push("/services/shuttle-hire")}
                />
                <ServiceBubble
                  name="Logistics"
                  icon={require("../images/box-truck.png")}
                  onPress={() => router.push("/services/truck-hire")}
                />
                <ServiceBubble
                  name="School Runs"
                  icon={require("../images/male-student.png")}
                  onPress={() => router.push("/services/kids-travel")}
                />
                <ServiceBubble
                  name="Seniors"
                  icon={require("../images/old-person.png")}
                  onPress={() => router.push("/services/senior-travel")}
                />
              </ScrollView>
            </View>
          </View>

          {/* 🪙 NEW: LIVE PROVINCIAL TRIPS SECTION */}
          <View style={styles.interProvinceSection}>
            <View style={styles.sectionHeaderEnhanced}>
              <View style={styles.liveIndicatorColumn}>
                <View style={styles.liveIndicatorRowCentered}>
                  <View style={styles.liveDot} />
                  <Text style={styles.sectionTitleCentered}>
                    LIVE PROVINCIAL TRIPS
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/plan-ride")}
                activeOpacity={0.8}
                style={styles.fullWidthButtonWrapper}
              >
                <MotiView
                  from={{ scale: 1, shadowOpacity: 0.2 }}
                  animate={{
                    scale: [1, 1.02, 1], // Slightly reduced for better performance on 4GB RAM
                    shadowOpacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    loop: true,
                  }}
                  style={styles.enhancedBookBtn}
                >
                  <LinearGradient
                    colors={["#FBBF24", "#F59E0B"]}
                    style={styles.enhancedGradient}
                  >
                    <Text style={styles.enhancedBtnText}>BOOK NOW!</Text>
                    <Zap color="#000" size={18} fill="#000" />
                  </LinearGradient>
                </MotiView>
              </TouchableOpacity>
            </View>

            {longDistanceTrips.length === 0 ? (
              <View style={styles.emptyCard}>
                <Globe color="#64748B" size={24} />
                <Text style={styles.emptyText}>
                  No inter-city trips active right now
                </Text>
              </View>
            ) : (
              longDistanceTrips.map((trip) => (
                <MotiView
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  key={trip.id}
                  style={styles.tripCard}
                >
                  <View style={styles.tripInfo}>
                    <View style={styles.driverRow}>
                      <Text style={styles.driverLabel}>
                        {trip.driver_name.toUpperCase()}
                      </Text>
                      <Text style={styles.timeText}>
                        <Clock size={12} color="#FBBF24" />{" "}
                        {trip.departure_time}
                      </Text>
                    </View>

                    <View style={styles.routeRow}>
                      <View style={styles.routePoint}>
                        <MapPin size={14} color="#10B981" />
                        <Text style={styles.routeText} numberOfLines={1}>
                          {trip.pickup_province}
                        </Text>
                      </View>
                      <ArrowRight size={14} color="#64748B" />
                      <View style={styles.routePoint}>
                        <MapPin size={14} color="#EF4444" />
                        <Text style={styles.routeText} numberOfLines={1}>
                          {trip.destination_province}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.contactIconBtn}
                      onPress={() =>
                        Linking.openURL(`tel:${trip.contact_number}`)
                      }
                    >
                      <Phone size={18} color="#10B981" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.chatIconBtn}
                      onPress={() =>
                        router.push({
                          pathname: "/chat",
                          params: { rideId: trip.id },
                        })
                      }
                    >
                      <MessageSquare size={18} color="#3B82F6" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.bookNowBtn}
                      onPress={() =>
                        router.push({
                          pathname: "/services/[id]",
                          params: {
                            id: "inter-provincial-booking",
                            tripId: trip.id,
                            fare: trip.total_fare,
                          },
                        })
                      }
                    >
                      <Text style={styles.bookNowText}>BOOK NOW</Text>
                      <ArrowRight size={14} color="#000" />
                    </TouchableOpacity>
                  </View>
                </MotiView>
              ))
            )}
          </View>

          {/* --- SMART SUGGESTIONS --- */}
          <View style={styles.section}>
            <View style={styles.aiHeader}>
              <Text style={styles.sectionTitle}>Suggested for you</Text>
              <MotiText
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ loop: true, duration: 2500 }}
                style={styles.aiTag}
              >
                AI ENGINE
              </MotiText>
            </View>

            {predictions.map((item, index) => (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateX: -15 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
              >
                <TouchableOpacity style={styles.predictionCard}>
                  <View style={styles.clockCircle}>
                    <Clock color="#FBBF24" size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.destTitle}>{item.title}</Text>
                    <Text style={styles.destSub}>{item.address}</Text>
                  </View>
                  <View style={styles.destAction}>
                    <Text style={styles.destTime}>{item.time}</Text>
                    <ArrowRight color="#1E40AF" size={16} />
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* WHAT'S NEW SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's new</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.boltScrollOrganism}
            >
              <BoltFeatureCard source={require("../images/studentstr.png")} />
              <BoltFeatureCard source={require("../images/momsongo.png")} />
              <BoltFeatureCard source={require("../images/eldrs.png")} />
            </ScrollView>
          </View>

          {/* --- PASSENGERS LIABILITY SECTION --- */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.insuranceHeroCard}
            onPress={() => router.push("/insurance")}
          >
            <ImageBackground
              source={{
                uri: "https://img.magnific.com/free-photo/closeup-unrecognizable-couple-signing-contract-with-financial-advisor_637285-11092.jpg?semt=ais_hybrid&w=740&q=80",
              }}
              style={styles.heroBg}
              imageStyle={{ borderRadius: 24 }}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.heroOverlay}
              />
              <View style={styles.heroContent}>
                <View style={styles.badge}>
                  <ShieldCheck color="#22C55E" size={14} />
                  <Text style={styles.badgeText}>TRUST & SAFETY</Text>
                </View>
                <Text style={styles.heroTitle}>Passenger Liability Cover</Text>
                <Text style={styles.heroSub}>
                  Your safety is our priority. Ensure your trips are protected
                  today.
                </Text>

                <View style={styles.fakeButton}>
                  <Text style={styles.fakeButtonText}>Check Status</Text>
                  <ArrowRight color="#000" size={18} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* REFER & EARN */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.legoReferContainer}
          >
            <View style={styles.legoReferBrick}>
              <View style={styles.legoHeroSection}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-vector/gradient-affiliate-marketing-illustration_52683-82972.jpg?semt=ais_hybrid&w=740&q=80",
                  }}
                  style={styles.legoHeroImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.legoInfoSection}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.legoReferTitle}>AFFILIATE PROGRAM</Text>
                  <Text style={styles.legoReferSub}>
                    Refer friends & earn rewards
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push("/affiliate")}
                  style={styles.legoPillButton}
                >
                  <Text style={styles.legoPillText}>JOIN NOW</Text>
                  <View style={styles.legoPillIcon}>
                    <ArrowRight color="#1E40AF" size={14} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.sharpStudLeft} />
              <View style={styles.sharpStudRight} />
            </View>
          </MotiView>

          {/* --- AD SECTION (Clearly separated) --- */}
          <View style={styles.adSectionWrapper}>
            <Text style={styles.adSectionLabel}>ADVERTISEMENTS</Text>
            <View style={styles.adScrollContainer}>
              <AdBanner />
            </View>
          </View>

          {/* Final Bottom Spacer */}
          <View style={{ height: Platform.OS === "ios" ? 120 : 100 }} />
        </ScrollView>
      </SafeAreaView>



    </View>
  );
} // 🧊 Clean closure boundary complete


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  // safeArea: { flex: 1 },
  scrollContent: { paddingTop: 10 },
  notificationOverlay: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  notifyContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FBBF24",
  },
  notifyTitle: { color: "#FFF", fontWeight: "900", fontSize: 14 },
  notifySub: { color: "#94A3B8", fontSize: 12 },
  notifyBtn: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  notifyBtnText: { color: "#000", fontWeight: "900", fontSize: 10 },

  // ... (rest of styles remain unchanged)
  searchContainer: { paddingHorizontal: 20, marginTop: 10 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 24,
    paddingLeft: 20,
    height: 68,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  searchPlaceholder: {
    flex: 1,
    color: "#94A3B8",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 14,
  },
  searchGoBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  section: { paddingHorizontal: 20, marginTop: 35 },
  // sectionTitle: {
  //   color: "#FFF",
  //   fontSize: 22,
  //   fontWeight: "900",
  //   marginBottom: 20,
  // },
  // bubbleScroll: { marginLeft: -5 },
  bubbleItem: { alignItems: "center", marginRight: 22 },
  bubbleCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  bubblePng: { width: 44, height: 44 },
  bubbleName: { color: "#94A3B8", fontSize: 12, fontWeight: "800" },
  aiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  aiTag: {
    color: "#FBBF24",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  predictionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    padding: 18,
    borderRadius: 28,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  clockCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(251,191,36,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  destTitle: { color: "#FFF", fontSize: 17, fontWeight: "800" },
  destSub: { color: "#64748B", fontSize: 13, marginTop: 2 },
  destAction: { alignItems: "flex-end", gap: 5 },
  destTime: { color: "#FBBF24", fontWeight: "800", fontSize: 12 },
  safetyHub: {
    margin: 20,
    padding: 25,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.15)",
  },
  safetyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shieldRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  safetyTitle: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  safetyStatus: {
    color: "#10B981",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  safetyDesc: { color: "#64748B", fontSize: 13, marginTop: 15, lineHeight: 19 },
  boltScrollOrganism: { paddingRight: 20 },
  boltCardMolecule: {
    width: width * 0.45,
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#1E293B",
  },
  boltImageAtom: { width: "100%", height: "100%" },

  legoReferBrick: {
    backgroundColor: "#1E40AF",
    borderRadius: 24, // Added radius to match your theme better
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 6,
    borderBottomColor: "#17368A",
    overflow: "visible", // Critical for studs to show
    height: "100%", // Fill the container
  },
  legoHeroSection: {
    height: 140,
    backgroundColor: "#0F172A",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  legoHeroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  legoInfoSection: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
  },
  legoReferTitle: {
    color: "#FBBF24",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  legoReferSub: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },
  legoPillButton: {
    backgroundColor: "#FFF",
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 4,
  },
  legoPillText: {
    color: "#1E40AF",
    fontWeight: "900",
    fontSize: 11,
    marginRight: 8,
  },
  legoPillIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(30, 64, 175, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  sharpStudLeft: {
    position: "absolute",
    top: -10,
    left: 20,
    width: 40,
    height: 10,
    backgroundColor: "#1E40AF",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  sharpStudRight: {
    position: "absolute",
    top: -10,
    right: 20,
    width: 40,
    height: 10,
    backgroundColor: "#1E40AF",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  headerRow: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between", // This forces items to the far left and right
    alignItems: "center",
    width: "100%",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Aligns content to the start (left)
  },
  logoPngMain: {
    width: 210, // Adjust based on your preference
    height: 110,
    marginLeft: -10, // Optional: pull it even closer to the edge if the PNG has padding
  },
  notificationBtn: {
    backgroundColor: "rgba(251,191,36,0.1)",
    padding: 12,
    borderRadius: 16,
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444", // Red color
    borderWidth: 2,
    borderColor: "#000", // Outlined for "Lego" aesthetic
  },

  insuranceHeroCard: {
    height: 220,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  heroBg: { flex: 1, justifyContent: "flex-end" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 24 },
  heroContent: { padding: 20 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: { color: "#FFF", fontSize: 10, fontWeight: "900", marginLeft: 5 },
  heroTitle: { color: "#FFF", fontSize: 22, fontWeight: "900" },
  heroSub: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 15,
    fontWeight: "600",
  },
  fakeButton: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    width: 140,
    gap: 8,
  },
  fakeButtonText: { fontWeight: "900", color: "#000", fontSize: 14 },
  safeArea: {
    flex: 1,
    backgroundColor: "#020617", // Ensure this matches your Midnight theme
  },
  adContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
    paddingVertical: 5,
    // This margin ensures it sits ABOVE the tab bar
    marginBottom: Platform.OS === "ios" ? 50 : 60,
  },

  legoReferContainer: {
    marginHorizontal: 20,
    marginTop: 35, // Increased top margin for breathing room
    marginBottom: 40, // Increased bottom margin to prevent AdBanner collision
    height: 180, // Explicit height to containerize the brick and studs
    zIndex: 1, // Ensures studs don't overlap backgrounds
  },

  adSectionWrapper: {
    marginTop: 40, // Significant gap after the Refer section studs
    marginBottom: 10, // Gap before the bottom spacer
    alignItems: "center",
  },

  adSectionLabel: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 15,
    alignSelf: "flex-start",
    marginLeft: 25, // Align with the start of your other cards
    textTransform: "uppercase",
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
    marginTop: 5, // Extra gap from the "SPONSORED" label
  },

  atomicLegoCard: {
    height: 190,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 24,
    backgroundColor: "#0F172A",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  atomicBgImage: { flex: 1, width: "100%" },
  atomicGradient: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    borderRadius: 24,
  },
  badgeRow: { position: "absolute", top: 15, left: 15 },
  impactBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0, 242, 195, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00F2C3",
  },
  impactText: { color: "#00F2C3", fontSize: 10, fontWeight: "900" },
  atomicTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  atomicSub: { color: "#94A3B8", fontSize: 13, marginBottom: 15 },
  legoActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  earnLabel: { color: "#00F2C3", fontWeight: "900", fontSize: 14 },
  atomicStud: {
    position: "absolute",
    top: -10,
    right: 30,
    width: 40,
    height: 20,
    backgroundColor: "#0F172A",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#1E2937",
  },

  // 🪙 ADDED: Missing styles for the Live Provincial section
  interProvinceSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  liveIndicatorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
  viewAllText: {
    color: "#3B82F6",
    fontSize: 12,
    fontWeight: "700",
  },
  tripCard: {
    backgroundColor: "#0F172A",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  tripInfo: {
    flex: 1,
  },
  driverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  driverLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "800",
  },
  timeText: {
    color: "#FBBF24",
    fontSize: 11,
    fontWeight: "700",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    maxWidth: "40%",
  },
  routeText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 15,
  },
  contactIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  chatIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCard: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#334155",
  },
  emptyText: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 10,
    fontWeight: "600",
  },
  // Inside StyleSheet.create in home.tsx
  bookNowBtn: {
    backgroundColor: "#FBBF24", // Gold/Yellow theme
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
    gap: 5,
  },
  bookNowText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "900",
  },

  // 📀 CD: Comical Glow Button Styles
  comicalBookBtn: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  comicalGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
  },
  comicalBtnText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 14,
    fontStyle: "italic",
  },
  sectionHeaderEnhanced: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: "center", // Centers children horizontally
    gap: 15, // Creates consistent space between title and button
  },
  liveIndicatorColumn: {
    alignItems: "center",
  },
  liveIndicatorRowCentered: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sectionTitleCentered: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1.5,
  },
  fullWidthButtonWrapper: {
    width: "100%",
    maxWidth: 320, // Prevents button from being too wide on larger screens
  },
  enhancedBookBtn: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
    elevation: 8,
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  enhancedGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  enhancedBtnText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  headerContainer: {
    alignItems: "center", // 🪙 Centers the heading
    marginBottom: 20,
  },

  bubbleContainerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  bubbleScroll: {
    flex: 1,
  },
  bubbleScrollContent: {
    paddingRight: 50, // Space for the arrow
    gap: 15,
  },
  // 🪙 Service Bubble Polish
  serviceBubbleMain: {
    width: 90,
    height: 90,
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#00FFFF", // 🪙 Cyan Blue Outline
    justifyContent: "center",
    alignItems: "center",
    // Neumorphic/Lego Shadow effect
    shadowColor: "#00FFFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  bubbleLabel: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
  },
  scrollArrowBtn: {
    position: "absolute",
    right: -5,
    width: 45,
    height: 45,
    backgroundColor: "#0F172A", // Dark contrast
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00FFFF",
    zIndex: 10,
  },
// =========================================================
  // 🪙 ADVERTISER CAMPAIGN MODAL PREMIUM SHADOW SHAPES
  // =========================================================
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,6,23,0.85)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  campaignCard: {
    width: "100%",
    maxHeight: height * 0.78,
    backgroundColor: "#0F172A",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#00FFFF", // Neon Cyan Edge Profile
    overflow: "hidden",
    // Premium Glow Shadow Drop Logic
    shadowColor: "#00FFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  campaignHeroContainer: {
    height: 150,
    width: "100%",
    position: "relative",
  },
  campaignHeroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  campaignHeroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  campaignCloseBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(15,23,42,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  campaignBody: {
    paddingHorizontal: 22,
    paddingBottom: 20,
  },
  campaignTitleBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  campaignBadgeText: {
    color: "#00FFFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  campaignMainTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 28,
    marginBottom: 8,
  },
  campaignSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 20,
  },
  incentiveRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  incentiveIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    marginTop: 2,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.2)",
  },
  incentiveHeading: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 3,
  },
  incentiveParagraph: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  campaignFooter: {
    padding: 20,
    backgroundColor: "#0B1329",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  campaignCtaBtn: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    overflow: "hidden",
  },
  campaignCtaGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  campaignCtaText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
});
