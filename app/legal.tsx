import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ShieldCheck,
  Info,
  Scale,
  AlertTriangle,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const HERO_IMAGE_URL =
  "https://img.freepik.com/premium-photo/digital-policy-management-compliance-checklist_1169301-6072.jpg?semt=ais_hybrid&w=740&q=80";

export default function LegalScreen() {
  const router = useRouter();

  const LegalSection = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>LEGAL CENTER</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: HERO_IMAGE_URL }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <ShieldCheck color="#38BDF8" size={32} />
              <Text style={styles.heroText}>
                MobiSplit Lift Club Passenger Protection Policy
              </Text>
            </View>
          </View>

          {/* 🪙 CREATIVE INSURANCE WARNING BOX - Added underneath Hero */}
          <View style={styles.insuranceBox}>
            <View style={styles.insuranceHeader}>
              <AlertTriangle color="#FF4444" size={20} />
              <Text style={styles.insuranceTitle}>
                CRITICAL: PASSENGER INSURANCE
              </Text>
            </View>
            <Text style={styles.insuranceContent}>
              Traveling with MobiSplit requires active personal or third-party
              insurance.
              <Text style={{ fontWeight: "900", color: "#FFF" }}>
                {" "}
                Failure to secure adequate coverage means you assume all
                liability for unforeseen incidents.
              </Text>
            </Text>
            <View style={styles.disclaimerBadge}>
              <Text style={styles.disclaimerText}>
                MOBISPLIT IS NOT ACCOUNTABLE FOR UNINSURED CLAIMS.
              </Text>
            </View>
          </View>

          <View style={styles.contentPadding}>
            <Text style={styles.lastUpdated}>Effective Date: May 2026</Text>

            <LegalSection
              title="1. Introduction"
              content="MobiSplit operates as a community-based lift club platform, connecting individuals who share rides to reduce travel costs and environmental impact. Unlike commercial taxi services, MobiSplit facilitates cost-sharing among members rather than providing for-profit transport. This Passenger Protection Policy outlines the safety and protection measures in place to ensure that all participants—drivers and passengers—are supported in the event of unforeseen incidents during shared rides."
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Scope of Coverage</Text>
              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.sectionContent}>
                  <Text style={styles.boldText}>Injury & Disability:</Text>{" "}
                  Covers reasonable medical expenses and compensation in the
                  event of injury or permanent disability during a shared ride.
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.sectionContent}>
                  <Text style={styles.boldText}>Death:</Text> Provides support
                  to the family or next of kin in the unfortunate event of a
                  fatality.
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.sectionContent}>
                  <Text style={styles.boldText}>Emotional Trauma:</Text> Covers
                  psychological support for passengers affected by traumatic
                  incidents during a ride.
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.sectionContent}>
                  <Text style={styles.boldText}>Third-Party Damage:</Text>{" "}
                  Covers liability for claims arising from damage to third-party
                  property or persons during a shared ride.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Compliance Guidelines</Text>
              <Text style={styles.sectionContent}>
                To ensure the safety and protection of all participants,
                MobiSplit requires that all drivers:
              </Text>
              <Text style={styles.bulletPoint}>
                - Maintain a valid driver’s license.
              </Text>
              <Text style={styles.bulletPoint}>
                - Hold a valid roadworthy certificate for their vehicle.
              </Text>
              <Text style={styles.bulletPoint}>
                - Maintain personal or comprehensive vehicle insurance that
                includes passenger protection.
              </Text>
              <Text style={[styles.sectionContent, { marginTop: 10 }]}>
                Drivers participating in MobiSplit are not classified as taxi
                operators or commercial drivers. They are private individuals
                voluntarily sharing rides and fuel costs with fellow community
                members.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Exclusions</Text>
              <Text style={styles.sectionContent}>
                Passenger protection coverage does not apply in the following
                circumstances:
              </Text>
              <Text style={styles.bulletPoint}>
                - Use of the vehicle for personal or private purposes without
                passengers.
              </Text>
              <Text style={styles.bulletPoint}>
                - Engagement in illegal activities during the ride.
              </Text>
              <Text style={styles.bulletPoint}>
                - Operation of the vehicle without a valid driver’s license.
              </Text>
              <Text style={styles.bulletPoint}>
                - Use of vehicles that are not roadworthy or lack appropriate
                insurance coverage.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Claims Process</Text>
              <Text style={styles.sectionContent}>
                1. The passenger must report the incident to MobiSplit support
                within 7 days.
              </Text>
              <Text style={styles.sectionContent}>
                2. Submit supporting documentation, including ride details,
                medical or psychological reports, and a police report if
                applicable.
              </Text>
              <Text style={styles.sectionContent}>
                3. The claim will be reviewed by the relevant insurance
                provider. Payouts are typically processed within 30–60 days.
              </Text>
              <Text style={styles.sectionContent}>
                4. If necessary, appeals can be submitted through the insurer’s
                dispute resolution process.
              </Text>
            </View>

            <LegalSection
              title="6. Tax Considerations"
              content="All monetary contributions made by passengers are considered petrol-sharing support and not income. As such, MobiSplit drivers are not classified as business operators for tax purposes. Drivers are encouraged to maintain accurate records of shared costs for personal reference."
            />

            <LegalSection
              title="7. Commitment Statement"
              content="MobiSplit is committed to fostering a safe, reliable, and community-driven transport network. Our Lift Club Passenger Protection Policy reflects our dedication to the well-being of all members. By promoting shared responsibility and mutual respect, we aim to create a trusted environment where everyone can travel with confidence."
            />

            <View style={styles.footerNote}>
              <Scale color="#64748B" size={20} />
              <Text style={styles.footerText}>
                Community Trust & Safety Compliance
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 12,
    marginRight: 20,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroContainer: {
    width: width,
    height: 220,
    position: "relative",
  },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  heroText: { color: "#FFF", fontSize: 15, fontWeight: "800", flex: 1 },

  // 🪙 INSURANCE BOX STYLES
  insuranceBox: {
    margin: 20,
    padding: 20,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#FF4444",
  },
  insuranceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  insuranceTitle: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  insuranceContent: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
  },
  disclaimerBadge: {
    marginTop: 15,
    backgroundColor: "rgba(255, 68, 68, 0.1)",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 68, 68, 0.2)",
  },
  disclaimerText: {
    color: "#FF4444",
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center",
  },

  contentPadding: { padding: 20 },
  lastUpdated: {
    color: "#38BDF8",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 25,
  },
  section: { marginBottom: 30 },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },
  sectionContent: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  bulletRow: { flexDirection: "row", marginBottom: 8, paddingRight: 10 },
  bullet: { color: "#38BDF8", fontSize: 20, marginRight: 10, marginTop: -2 },
  boldText: { color: "#FFF", fontWeight: "800" },
  bulletPoint: {
    color: "#94A3B8",
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: "500",
  },
  footerNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  },
  footerText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
