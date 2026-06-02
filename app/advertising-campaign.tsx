import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Megaphone,
  Gift,
  Award,
  Users,
  Compass,
  ArrowLeft,
  Flame,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// =========================================================================
// ATOMIC LEGO UI DESIGN SYSTEM COMPONENTS
// =========================================================================

// Atomic Layer 1: Lego Brick Section Header
const LegoSectionHeader = ({
  title,
  emoji,
}: {
  title: string;
  emoji: string;
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerEmoji}>{emoji}</Text>
    <Text style={styles.headerTitle}>{title.toUpperCase()}</Text>
  </View>
);

// Atomic Layer 2: Core Lego Structural Card Container
const LegoCard = ({
  children,
  color,
  shadowColor,
}: {
  children: React.ReactNode;
  color: string;
  shadowColor: string;
}) => (
  <View style={styles.legoCardWrapper}>
    <View style={[styles.legoCardShadow, { backgroundColor: shadowColor }]} />
    <View style={[styles.legoCardMain, { backgroundColor: color }]}>
      {children}
    </View>
  </View>
);

// Atomic Layer 3: Feature Highlight Row
const LegoFeatureRow = ({ title, desc }: { title: string; desc: string }) => (
  <View style={styles.featureRow}>
    <View style={styles.bulletPoint} />
    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>{title}:</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

export default function AdvertiserCampaignHub() {
  const router = useRouter();
  const [videoLoading, setVideoLoading] = useState(true);

  const handleJoinCampaign = (campaignName: string) => {
    Alert.alert(
      "Campaign Registration 🪙",
      `Would you like to register your brand profile for the ${campaignName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Register Now",
          onPress: () => console.log(`Registered for: ${campaignName}`),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Navigation Header */}
        <View style={styles.topNav}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>MobiSplit Campaign Hub</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {/* =========================================================
              HERO CONTENT BLOCK
             ========================================================= */}
          <View style={styles.heroBlock}>
            <Image
              source={{
                uri: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/8103728/821876_778139.png",
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <View style={styles.heroBadge}>
                <Megaphone size={14} color="#0F172A" fill="#0F172A" />
                <Text style={styles.heroBadgeText}>LIVE PARTNERSHIPS</Text>
              </View>
              <Text style={styles.heroMainText}>
                MobiSplit Advertiser Attraction Campaign
              </Text>
              <Text style={styles.heroSubText}>
                Accelerate your brand equity. Maximize structural reach daily.
              </Text>
            </View>
          </View>

          {/* =========================================================
              CAMPAIGN 1: ADVERTISER CORE INCENTIVES (Image Content 1 & 2)
             ========================================================= */}
          <View style={styles.innerSection}>
            <LegoSectionHeader title="Advertiser Core Incentives" emoji="🎯" />

            <LegoCard color="#1E1E2E" shadowColor="#000000">
              <LegoFeatureRow
                title="Win 3 Months Free Advertising"
                desc="Run highly targeted dynamic conversion banners natively inside the MobiSplit application completely free."
              />
              <LegoFeatureRow
                title="Event Sponsorship Prize"
                desc="Secure a R5,000 corporate cash injection backing selected high-impact upcoming community events."
              />
              <LegoFeatureRow
                title="Premium Placement"
                desc="Claim top-tier featured placements within client-facing ride rewards panels and global system push notifications."
              />
              <LegoFeatureRow
                title="Community Spotlight"
                desc="Accelerate visibility via co-branded digital distribution across all of MobiSplit's official social media ecosystems."
              />

              <View style={styles.divider} />

              <Text style={styles.subBlockHeader}>
                📊 CAMPAIGN ARCHITECTURE
              </Text>

              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>
                  <Text style={{ fontWeight: "900", color: "#FFF" }}>
                    Launch Briefing:{" "}
                  </Text>
                  Broadcast dynamic flyers & social announcements. Targeted
                  digital outreach across local businesses, event coordinators,
                  and SMEs.
                </Text>
              </View>

              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>
                  <Text style={{ fontWeight: "900", color: "#FFF" }}>
                    Onboarding:{" "}
                  </Text>
                  Register via our clean unified portal. Build persistent
                  awareness with quotes stating "Thousands of riders see your
                  brand daily!"
                </Text>
              </View>

              <View style={styles.stepItem}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>
                  <Text style={{ fontWeight: "900", color: "#FFF" }}>
                    Quarterly Selection Draws:{" "}
                  </Text>
                  Every quarter, our analytical matrix selects the Top 5
                  Advertisers for free premium inventory and Top 3 Event
                  Organizers for direct sponsorship.
                </Text>
              </View>

              {/* <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#8B5CF6" }]}
                onPress={() =>
                  handleJoinCampaign("Advertiser Attraction Campaign")
                }
              >
                <Text style={styles.actionButtonText}>
                  ENTER ADVERTISER PORTAL
                </Text>
                <ChevronRight size={18} color="#FFF" />
              </TouchableOpacity> */}
            </LegoCard>
          </View>

         

          {/* =========================================================
              CAMPAIGN 2: DRIVER LOYALTY FUEL VOUCHERS (Image Content 3)
             ========================================================= */}
          <View style={styles.innerSection}>
            <LegoSectionHeader title="Driver Rewards Pipeline" emoji="⛽" />

            <LegoCard color="#0F172A" shadowColor="#EF4444">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop",
                }}
                style={styles.cardHeroImage}
              />

              <Text style={styles.cardMainHeadline}>
                Win a R1,000 Fuel Voucher!
              </Text>
              <Text style={styles.cardSecondaryParagraph}>
                10 of our most dedicated, active drivers will each be awarded a
                R1,000 gas voucher to offset operational expenses and keep
                journeys smooth.
              </Text>

              <Text style={styles.pillLabel}>🎯 SELECTION PARAMETERS</Text>
              <Text style={styles.bulletItem}>
                • Complete rides regularly through MobiSplit.
              </Text>
              <Text style={styles.bulletItem}>
                • Secure a spot within our Top 10 most active seasonal driver
                tier.
              </Text>

              <Text style={styles.pillLabel}>💡 STRATEGIC PURPOSE</Text>
              <Text style={styles.bulletItem}>
                • Drives persistent, long-term driver engagement and platform
                consistency.
              </Text>
              <Text style={styles.bulletItem}>
                • Materially rewards frontline loyalty with high-utility
                structural assets.
              </Text>
              <Text style={styles.bulletItem}>
                • Deepens B2B partnership ties with fuel providers and premium
                insurance providers.
              </Text>

              {/* <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#EF4444" }]}
                onPress={() => handleJoinCampaign("Driver Voucher Campaign")}
              >
                <Text style={styles.actionButtonText}>
                  CHECK DRIVER STATS TRACKER
                </Text>
                <ChevronRight size={18} color="#FFF" />
              </TouchableOpacity> */}
            </LegoCard>
          </View>

          {/* =========================================================
              CAMPAIGN 3: ELITE MIXES SINGLES GETAWAY (Image Content 4)
             ========================================================= */}
          <View style={styles.innerSection}>
            <LegoSectionHeader title="MobiSplit Elite Mixes" emoji="🍷" />

            <LegoCard color="#1E1B4B" shadowColor="#7E22CE">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
                }}
                style={styles.cardHeroImage}
              />

              <Text style={styles.cardMainHeadline}>
                Exclusive Singles Weekend Getaway
              </Text>
              <Text style={styles.cardSecondaryParagraph}>
                Top frequent solo riders win a curated luxurious weekend escape
                designed around networking, luxury, and premium curated
                activities:
              </Text>

              <View style={styles.nestedPillContainer}>
                <Text style={styles.nestedPill}>
                  🍇 Private Vineyard Tour & Fine Wine Tastings
                </Text>
                <Text style={styles.nestedPill}>
                  🍳 Gourmet Cooking Masterclass & Dinner Soirée
                </Text>
                <Text style={styles.nestedPill}>
                  🎈 Sunrise Hot Air Balloon Expedition
                </Text>
                <Text style={styles.nestedPill}>
                  🎵 Evening High-Society Mixer with Live Instrumental
                  Performance
                </Text>
              </View>

              <Text style={styles.pillLabel}>🔮 ELIGIBILITY MATRIX</Text>
              <Text style={styles.bulletItem}>
                • Log frequent single-passenger bookings via the app.
              </Text>
              <Text style={styles.bulletItem}>
                • Finalize the season ranked in our top 10 elite solo passenger
                rankings.
              </Text>

              {/* <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#7E22CE" }]}
                onPress={() => handleJoinCampaign("Elite Singles Weekend")}
              >
                <Text style={styles.actionButtonText}>
                  VIEW SOLO TRAVEL RANKINGS
                </Text>
                <ChevronRight size={18} color="#FFF" />
              </TouchableOpacity> */}
            </LegoCard>
          </View>

          {/* =========================================================
              CAMPAIGN 4: PENSIONER LUXURY MSC CRUISE (Image Content 5)
             ========================================================= */}
          <View style={styles.innerSection}>
            <LegoSectionHeader title="MobiSplit Loyalty Rewards" emoji="🚢" />

            <LegoCard color="#0284C7" shadowColor="#0C4A6E">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=600&auto=format&fit=crop",
                }}
                style={styles.cardHeroImage}
              />

              <Text style={styles.cardMainHeadline}>
                Win a Dream Getaway Destination!
              </Text>

              <Text style={styles.cruiseSubHeader}>
                🚐 Travel in Absolute Comfort
              </Text>
              <Text style={styles.cruiseText}>
                10 of our most frequent pensioner riders will experience a fully
                catered premium transfer service directly from Johannesburg down
                to Durban.
              </Text>

              <Text style={styles.cruiseSubHeader}>
                🚢 5-Day Luxury MSC Cruise
              </Text>
              <Text style={styles.cruiseText}>
                Following transit, winners embark on an all-expenses-paid 5-Day
                ocean voyage fully covered by MobiSplit corporate allocations.
              </Text>

              <Text style={styles.pillLabel}>📋 HOW TO QUALIFY</Text>
              <Text style={styles.bulletItem}>
                • Utilize MobiSplit reliably for daily municipal and regional
                travel requirements.
              </Text>
              <Text style={styles.bulletItem}>
                • The Top 10 validated pensioner bracket profiles with the peak
                trip frequencies will receive immediate dispatch notifications.
              </Text>

              {/* <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#0284C7" }]}
                onPress={() => handleJoinCampaign("Pensioner Dream Cruise")}
              >
                <Text style={styles.actionButtonText}>
                  ENTER PENSIONER PORTAL
                </Text>
                <ChevronRight size={18} color="#FFF" />
              </TouchableOpacity> */}
            </LegoCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// =========================================================================
// PRODUCTION READY STYLING (OPTIMIZED FOR 4GB RAM RENDERING)
// =========================================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderColor: "#1E293B",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#334155",
  },
  topNavTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  heroBlock: {
    width: width - 32,
    height: 240,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
    position: "relative",
  },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    padding: 20,
    justifyContent: "flex-end",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDE047",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  heroBadgeText: { color: "#0F172A", fontWeight: "900", fontSize: 10 },
  heroMainText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 28,
  },
  heroSubText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  innerSection: { marginTop: 30, paddingHorizontal: 16 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  headerEmoji: { fontSize: 20 },
  headerTitle: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  legoCardWrapper: { position: "relative", marginBottom: 10, width: "100%" },
  legoCardMain: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#000",
    padding: 20,
    zIndex: 2,
  },
  legoCardShadow: {
    position: "absolute",
    top: 6,
    left: 0,
    right: 0,
    bottom: -6,
    borderRadius: 24,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#000",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8B5CF6",
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#000",
  },
  featureTitle: {
    color: "#8B5CF6",
    fontWeight: "900",
    fontSize: 15,
    marginBottom: 2,
  },
  featureDesc: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  divider: { height: 2, backgroundColor: "#2D2D3D", marginVertical: 16 },
  subBlockHeader: {
    color: "#F59E0B",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: "#F59E0B",
    color: "#000",
    fontWeight: "900",
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 20,
    borderWidth: 1.5,
    borderColor: "#000",
  },
  stepText: {
    flex: 1,
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000",
    marginTop: 18,
    gap: 8,
  },
  actionButtonText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  cardHeroImage: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000",
    marginBottom: 16,
  },
  cardMainHeadline: {
    color: "#FFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 6,
  },
  cardSecondaryParagraph: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19,
    marginBottom: 15,
  },
  pillLabel: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "900",
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  bulletItem: {
    color: "#CBD5E1",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
    marginBottom: 6,
    lineHeight: 18,
  },
  nestedPillContainer: { gap: 8, marginVertical: 8 },
  nestedPill: {
    color: "#FFF",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    fontSize: 12,
    fontWeight: "700",
  },
  cruiseSubHeader: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 2,
  },
  cruiseText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    marginBottom: 4,
    marginLeft: 4,
  },
  videoOuterBorder: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#000",
    overflow: "hidden",
    position: "relative",
  },
  cinematicVideo: { width: "100%", height: "100%" },
  videoGlassOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  videoOverlayText: { color: "#FFF", fontSize: 11, fontWeight: "800" },
});
