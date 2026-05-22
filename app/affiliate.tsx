import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Share,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { 
  ChevronLeft, 
  Copy, 
  Users, 
  Wallet, 
  TrendingUp, 
  Share2,
  ScanLine,
  Zap
} from "lucide-react-native"; 
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://daringly-tacky-anemic.ngrok-free.dev";

export default function AffiliateScreen() {
  const [refCode, setRefCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 🪙 FIXED: Added router hook

  // 🪙 FIXED: Added stats state and setter
  const [stats, setStats] = useState({
    earnings: "0.00",
    recruits: 0
  });

  useEffect(() => {
    fetchAmbassadorData();
  }, []);

  const generatePromoCode = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/vouchers/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, type: 'FIRST_TWO_FREE' })
      });
      const data = await response.json();
      if (data.code) return data.code;
    } catch (error) {
      console.log("Voucher Engine Error:", error);
    }
    return null;
  };

  const fetchAmbassadorData = async () => {
    try {
      const sessionData = await SecureStore.getItemAsync("user_session");
      if (sessionData) {
        const { user } = JSON.parse(sessionData);
        
        // 🪙 Priority: Always attempt to sync with real-time voucher table
        const realTimeCode = await generatePromoCode(user.id);
        
        if (realTimeCode) {
          setRefCode(realTimeCode);
        } else {
          // Fallback to static ID-based code if backend is unreachable
          setRefCode(user?.referral_code || `MS-${user?.id?.substring(0, 6).toUpperCase()}`);
        }

        // Targeted Stats Fetch
        try {
            const response = await fetch(`${API_URL}/api/users/ambassador-stats/${user.id}`);
            const data = await response.json();
            if (data) {
                setStats({
                    earnings: data.earnings || "0.00",
                    recruits: data.recruits || 0
                });
            }
        } catch (e) { console.log("Stats fetch failed"); }
      } else {
        setRefCode("MOBI-JOIN");
      }
    } catch (error) {
      console.error("Ambassador Engine Error:", error);
      setRefCode("MOBI-ERROR");
    } finally {
      setLoading(false);
    }
  };

  const onShare = async () => {
    if (!refCode) return;
    try {
      await Share.share({
        message: `Join the MobiSplit movement! Use my ambassador code: ${refCode} to get started. Download the app now!`,
      });
    } catch (error) { 
      console.log(error); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* REDESIGNED HERO: High Contrast & Visual Clarity */}
        <View style={styles.heroContainer}>
          <Image 
            source={require("./images/cover.jpg")}
            style={styles.heroImage} 
          />
          <LinearGradient 
            colors={['rgba(2, 6, 23, 0.9)', 'rgba(2, 6, 23, 0.2)', '#020617']} 
            style={styles.heroOverlay} 
          />
          
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ChevronLeft color="#FFF" size={28} />
            </TouchableOpacity>
          </View>

          <View style={styles.heroTextContent}>
            {/* FIXED MOTI TRANSFORMS: Using translateX instead of x */}
            <MotiView 
                from={{ opacity: 0, translateX: -20 }} 
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 600 }}
            >
              <View style={styles.badge}>
                <Zap color="#00F2C3" size={14} fill="#00F2C3" />
                <Text style={styles.badgeText}>ELITE AMBASSADOR</Text>
              </View>
              <Text style={styles.mainTitle}>Drive Change.{"\n"}Earn Rewards.</Text>
              <Text style={styles.heroSubText}>Help the youth of South Africa move smarter and get paid for every referral.</Text>
            </MotiView>
          </View>
        </View>

        <View style={styles.content}>
          
          {/* REAL-TIME STATUS BAR ENGINE */}
          <View style={styles.statsRow}>
            <TouchableOpacity onPress={() => router.push("/wallet")} style={styles.statItem}>
              <Wallet color="#00F2C3" size={20} />
              <Text style={styles.statValue}>R{stats.earnings}</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </TouchableOpacity>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Users color="#60A5FA" size={20} />
              <Text style={styles.statValue}>{stats.recruits}</Text>
              <Text style={styles.statLabel}>Referrals</Text>
            </View>
          </View>

          {/* QR CODE ENGINE SECTION */}
          <MotiView 
            from={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            style={styles.qrCard}
          >
            <View style={styles.qrHeader}>
              <View>
                <Text style={styles.qrTitle}>Referral QR Engine</Text>
                <Text style={styles.qrSubtitle}>Fast scan for new recruits</Text>
              </View>
              <ScanLine color="#00F2C3" size={24} />
            </View>
            
            <View style={styles.qrMain}>
              <View style={styles.qrWhiteFrame}>
                {refCode ? (
                  <QRCode
                    value={`https://mobisplit.com/join?ref=${refCode}`}
                    size={150}
                    color="#020617"
                    backgroundColor="#FFF"
                    quietZone={5}
                  />
                ) : (
                  <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color="#1E40AF" />
                    <Text style={styles.loadingText}>BOOTING ENGINE...</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.codeDetails}>
                <Text style={styles.vouchLabel}>INVITE CODE</Text>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{refCode || "---"}</Text>
                  <TouchableOpacity onPress={onShare}>
                    <Copy color="#00F2C3" size={18} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                  <Share2 color="#020617" size={18} />
                  <Text style={styles.shareBtnText}>Share Invitation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>

          {/* PROGRAM DETAILS */}
          <View style={styles.infoSection}>
             <Text style={styles.sectionTitle}>Ambassador Perks</Text>
             <View style={styles.missionCard}>
                <TrendingUp color="#00F2C3" size={24} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.missionHeader}>Mobisplit Earnings</Text>
                    <Text style={styles.missionText}>Earn R10 for every friend who completes their first ride. Bonuses awarded for top recruiters.</Text>
                </View>
             </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  heroContainer: { height: 340, width: '100%', justifyContent: 'flex-end' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  headerTop: { position: 'absolute', top: 10, left: 20 },
  backBtn: { backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: 10, borderRadius: 14 },
  heroTextContent: { padding: 25, paddingBottom: 50 },
  badge: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 242, 195, 0.1)', 
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(0, 242, 195, 0.3)'
  },
  badgeText: { color: '#00F2C3', fontSize: 10, fontWeight: '900', marginLeft: 6, letterSpacing: 1 },
  mainTitle: { color: '#FFF', fontSize: 36, fontWeight: '900', letterSpacing: -1, lineHeight: 40 },
  heroSubText: { color: '#94A3B8', fontSize: 15, marginTop: 10, lineHeight: 22, fontWeight: '500' },
  
  content: { padding: 20, marginTop: -35 },
  statsRow: { 
    flexDirection: 'row', backgroundColor: '#0F172A', borderRadius: 28, 
    padding: 22, marginBottom: 25, alignItems: 'center',
    borderWidth: 1, borderColor: '#1E2937', elevation: 8
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, height: 35, backgroundColor: '#1E2937' },
  statValue: { color: '#FFF', fontSize: 24, fontWeight: '900', marginTop: 4 },
  statLabel: { color: '#64748B', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },

  qrCard: { 
    backgroundColor: '#1E40AF', borderRadius: 35, padding: 25, 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
  },
  qrHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  qrTitle: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  qrSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  qrMain: { alignItems: 'center', gap: 20 },
  qrWhiteFrame: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 24, 
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 15 
  },
  loaderBox: { height: 150, width: 150, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 10, color: '#1E40AF', fontWeight: '900', letterSpacing: 1 },
  
  codeDetails: { width: '100%' },
  vouchLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', textAlign: 'center' },
  codeBox: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.35)', padding: 18, borderRadius: 20, marginVertical: 12 
  },
  codeText: { color: '#00F2C3', fontWeight: '900', fontSize: 22, letterSpacing: 3 },
  shareButton: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#FFF', paddingVertical: 18, borderRadius: 20 
  },
  shareBtnText: { color: '#020617', fontWeight: '900', fontSize: 16 },

  infoSection: { marginTop: 35, paddingBottom: 30 },
  sectionTitle: { color: '#FFF', fontSize: 22, fontWeight: '900', marginBottom: 18 },
  missionCard: { 
    flexDirection: 'row', gap: 15, backgroundColor: '#0F172A', 
    padding: 22, borderRadius: 28, borderWidth: 1, borderColor: '#1E2937'
  },
  missionHeader: { color: '#FFF', fontWeight: '800', fontSize: 17 },
  missionText: { color: '#94A3B8', fontSize: 14, marginTop: 6, lineHeight: 20 }
});