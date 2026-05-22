import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Wallet,
  ArrowUpRight,
  ChevronLeft,
  Copy,
  QrCode,
  TrendingUp,
  Users,
  MousePointerClick,
  ShieldCheck
} from "lucide-react-native";
// Using FontAwesome for authentic Social Icons as requested
import { FontAwesome } from "@expo/vector-icons"; 
import { MotiView, MotiText } from "moti";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function AffiliateWalletScreen() {
  const router = useRouter();
  // Starts at R0.00 as requested
  const [earnings] = useState({ balance: 0.00, referrals: 0, clicks: 0 });

  const handleShare = async (platform: string) => {
    try {
      await Share.share({
        message: `Join the MobiSplit program using my link! https://mobisplit.com/ref/devbeam`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AMBASSADOR WALLET</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* MAIN WALLET CARD */}
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.walletWrapper}
        >
          <LinearGradient colors={["#1E293B", "#0F172A"]} style={styles.walletCard}>
            <View style={styles.walletTop}>
              <Text style={styles.walletLabel}>Available Balance</Text>
              <ShieldCheck color="#00F2C3" size={18} />
            </View>
            
            <Text style={styles.balanceText}>R {earnings.balance.toFixed(2)}</Text>
            
            <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.7}>
              <Text style={styles.withdrawText}>Request Withdrawal</Text>
              <ArrowUpRight color="#000" size={16} />
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        {/* PERFORMANCE GRID */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Users color="#00F2C3" size={20} />
            <Text style={styles.statValue}>{earnings.referrals}</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
          </View>
          <View style={styles.statBox}>
            <MousePointerClick color="#00F2C3" size={20} />
            <Text style={styles.statValue}>{earnings.clicks}</Text>
            <Text style={styles.statLabel}>Link Clicks</Text>
          </View>
        </View>

        {/* QR CODE & REFERRAL SECTION */}
        <View style={styles.glassCard}>
          <Text style={styles.cardTitle}>Your Referral QR Code</Text>
          <View style={styles.qrContainer}>
            <View style={styles.qrBackground}>
                <QrCode color="#00F2C3" size={120} strokeWidth={1.5} />
                {/* Visual QR Corners */}
                <View style={[styles.qrCorner, { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 }]} />
                <View style={[styles.qrCorner, { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 }]} />
                <View style={[styles.qrCorner, { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 }]} />
                <View style={[styles.qrCorner, { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 }]} />
            </View>
            <Text style={styles.qrHint}>Scan to join MobiSplit via devbeam</Text>
          </View>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText} numberOfLines={1}>mobisplit.com/ref/devbeam</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Copy color="#00F2C3" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SOCIAL SHARING SECTION */}
        <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>PROMOTE ON SOCIAL MEDIA</Text>
            <View style={styles.socialRow}>
                <TouchableOpacity onPress={() => handleShare('whatsapp')} style={styles.socialCircle}>
                    <FontAwesome name="whatsapp" size={24} color="#25D366" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare('facebook')} style={styles.socialCircle}>
                    <FontAwesome name="facebook" size={24} color="#1877F2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare('instagram')} style={styles.socialCircle}>
                    <FontAwesome name="instagram" size={24} color="#E4405F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare('twitter')} style={styles.socialCircle}>
                    <FontAwesome name="twitter" size={24} color="#1DA1F2" />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0E14" },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937"
  },
  backBtn: { padding: 8, backgroundColor: "#111827", borderRadius: 10 },
  headerTitle: { color: "#FFF", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  scrollContent: { padding: 20 },
  walletWrapper: { marginBottom: 25 },
  walletCard: { padding: 25, borderRadius: 24, borderWidth: 1, borderColor: "#1F2937" },
  walletTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  walletLabel: { color: "#94A3B8", fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  balanceText: { color: "#FFF", fontSize: 48, fontWeight: "900", marginVertical: 15 },
  withdrawBtn: { 
    backgroundColor: "#00F2C3", 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 12, 
    flexDirection: "row", 
    alignItems: "center", 
    alignSelf: 'flex-start',
    gap: 8
  },
  withdrawText: { color: "#000", fontWeight: "900", fontSize: 14 },
  statsGrid: { flexDirection: "row", gap: 15, marginBottom: 25 },
  statBox: { 
    flex: 1, 
    backgroundColor: "#111827", 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "#1F2937",
    alignItems: 'center'
  },
  statValue: { color: "#FFF", fontSize: 22, fontWeight: "900", marginTop: 10 },
  statLabel: { color: "#64748B", fontSize: 11, fontWeight: "700", marginTop: 4 },
  glassCard: { backgroundColor: "#111827", padding: 25, borderRadius: 24, borderWidth: 1, borderColor: "#1F2937" },
  cardTitle: { color: "#FFF", fontSize: 16, fontWeight: "800", marginBottom: 20, textAlign: 'center' },
  qrContainer: { alignItems: 'center', marginBottom: 25 },
  qrBackground: { padding: 20, backgroundColor: '#0B0E14', borderRadius: 20, position: 'relative' },
  qrCorner: { position: 'absolute', width: 20, height: 20, borderColor: '#00F2C3' },
  qrHint: { color: '#64748B', fontSize: 12, marginTop: 15, fontWeight: '600' },
  linkContainer: { 
    flexDirection: "row", 
    backgroundColor: "#0B0E14", 
    padding: 15, 
    borderRadius: 15, 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F2937"
  },
  linkText: { color: "#94A3B8", flex: 1, fontSize: 14, fontWeight: '600' },
  copyBtn: { padding: 5 },
  socialSection: { marginTop: 30, alignItems: 'center' },
  socialTitle: { color: "#475569", fontSize: 11, fontWeight: "900", letterSpacing: 2, marginBottom: 20 },
  socialRow: { flexDirection: 'row', gap: 20 },
  socialCircle: { 
    width: 55, 
    height: 55, 
    borderRadius: 28, 
    backgroundColor: '#111827', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937'
  }
});