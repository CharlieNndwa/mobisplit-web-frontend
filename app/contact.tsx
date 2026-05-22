import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle 
} from "lucide-react-native";

const CONTACT_INFO = {
  phone: "069 404 2017",
  email: "weziwe@mobisplit.com",
  website: "www.mobisplit.com",
};

const FAQ_DATA = [
  {
    question: "What is MobiSplit?",
    answer: "MobiSplit is a premier vehicle rental and ride-sharing platform designed to make transport easy, efficient, and affordable for everyone."
  },
  {
    question: "How do I become a verified driver?",
    answer: "You can apply through the 'Earn by Driving' section in your account. You will need to provide your license, vehicle registration, and pass a background check."
  },
  {
    question: "Is there passenger liability insurance?",
    answer: "Yes, all rides booked through MobiSplit are covered under our comprehensive passenger liability insurance policy for your safety."
  },
];

export default function ContactScreen() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#FFF" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <Image 
            source={{ uri: 'https://img.magnific.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?semt=ais_hybrid&w=740&q=80' }}
            style={styles.heroImage}
          />

          <View style={styles.content}>
            {/* Contact Details Card */}
            <View style={styles.contactCard}>
              <Text style={styles.sectionTitle}>Get in Touch</Text>
              
              <TouchableOpacity 
                style={styles.contactRow}
                onPress={() => Linking.openURL(`tel:${CONTACT_INFO.phone}`)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                  <Phone color="#D97706" size={20} />
                </View>
                <Text style={styles.contactText}>{CONTACT_INFO.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactRow}
                onPress={() => Linking.openURL(`mailto:${CONTACT_INFO.email}`)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
                  <Mail color="#2563EB" size={20} />
                </View>
                <Text style={styles.contactText}>{CONTACT_INFO.email}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactRow}
                onPress={() => Linking.openURL(`https://${CONTACT_INFO.website}`)}
              >
                <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
                  <Globe color="#16A34A" size={20} />
                </View>
                <Text style={styles.contactText}>{CONTACT_INFO.website}</Text>
              </TouchableOpacity>
            </View>

            {/* Business Branding Image */}
            <View style={styles.brandingContainer}>
              <Image 
                source={require("../app/images/1000060836.jpg")} // Replace with your actual file path for 1000060746.jpg
                style={styles.brandingImage}
                resizeMode="contain"
              />
            </View>

            {/* Q&A Section */}
            <View style={styles.faqSection}>
              <View style={styles.faqHeader}>
                <HelpCircle color="#38BDF8" size={24} />
                <Text style={styles.sectionTitle}>Frequent Questions</Text>
              </View>

              {FAQ_DATA.map((item, index) => (
                <View key={index} style={styles.accordionItem}>
                  <TouchableOpacity 
                    style={styles.accordionHeader} 
                    onPress={() => toggleAccordion(index)}
                  >
                    <Text style={styles.questionText}>{item.question}</Text>
                    {expandedIndex === index ? (
                      <ChevronUp color="#94A3B8" size={20} />
                    ) : (
                      <ChevronDown color="#94A3B8" size={20} />
                    )}
                  </TouchableOpacity>
                  {expandedIndex === index && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
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
    padding: 20, 
    gap: 15 
  },
  headerTitle: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  backBtn: { backgroundColor: "#1E293B", padding: 8, borderRadius: 12 },
  heroImage: { width: "100%", height: 200 },
  content: { padding: 20 },
  sectionTitle: { color: "#FFF", fontSize: 18, fontWeight: "900", marginBottom: 15 },
  contactCard: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 25,
  },
  contactRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 15, 
    marginBottom: 15 
  },
  iconBox: { 
    width: 40, 
    height: 40, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  contactText: { color: "#E2E8F0", fontSize: 16, fontWeight: "700" },
  brandingContainer: { marginBottom: 25, borderRadius: 15, overflow: "hidden" },
  brandingImage: { width: "100%", height: 220 },
  faqSection: { marginBottom: 40 },
  faqHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15 },
  accordionItem: {
    backgroundColor: "#1E293B",
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  questionText: { color: "#FFF", fontWeight: "800", fontSize: 14, flex: 1, marginRight: 10 },
  accordionContent: { padding: 18, paddingTop: 0, borderTopWidth: 1, borderTopColor: "#334155" },
  answerText: { color: "#94A3B8", lineHeight: 20, fontSize: 14 },
});