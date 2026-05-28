import React, { useState, useEffect } from "react";
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
  Ticket,
  Gift,
  Users,
  ArrowRight,
  Zap,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";  

const PromoCard = ({ title, desc, code, color, shadowColor, isAutoApplied = false }: any) => (
  <View style={[styles.legoCard, { backgroundColor: color, shadowColor: shadowColor }]}>
    <View style={styles.cardHeader}>
      {isAutoApplied ? <Zap color="#000" size={24} fill="#000" /> : <Ticket color="#000" size={24} />}
      <View style={styles.badge}><Text style={styles.badgeText}>{isAutoApplied ? "AUTO-APPLIED" : "ACTIVE"}</Text></View>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{desc}</Text>
    {!isAutoApplied && (
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{code}</Text>
        <TouchableOpacity style={styles.copyBtn}><Text style={styles.copyBtnText}>COPY</Text></TouchableOpacity>
      </View>
    )}
  </View>
);

export default function PromotionsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 🪙 Main Hero Image - Intact */}
      <Image source={require("../app/images/Gemini_Generated_Image_gwevz0gwevz0gwev.png")} style={styles.heroImage} /> 

      <View style={styles.promoContent}>
        <Text style={styles.sectionLabel}>NEW USER SPECIAL</Text>
        
        {/* 🪙 "First 2 Free" logic applied */}
        <PromoCard 
          title="FREE LOGIN WITHOUT SUBSCRIPTION PASS"
          desc="Your first 2 logins without subscription are free! Valid for all local rides."
          isAutoApplied={true}
          color="#10B981"
          shadowColor="#064E3B"
        />

        {/* 🪙 NEW: External Section Image */}
        <View style={styles.externalPromoSection}>
          <Image 
            source={{ uri: 'https://lirp.cdn-website.com/4768b30f/dms3rep/multi/opt/5616698-640w.jpg' }}
            style={styles.externalImage}
          />
          <View style={styles.externalTextPadding}>
            <Text style={styles.externalTitle}>Community Lifts</Text>
            <Text style={styles.externalSub}>Safe, shared, and subsidized for the youth.</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>OTHER OFFERS</Text>
        <PromoCard title="Refer a Friend" desc="Get R50 credit for every new driver." code="REF50" color="#FDE047" shadowColor="#B45309" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  heroImage: { width: '100%', height: 200 },
  promoContent: { padding: 20 },
  sectionLabel: { fontWeight: '900', fontSize: 12, color: '#64748B', marginBottom: 10 },
  legoCard: { padding: 20, borderWidth: 3, borderColor: '#000', marginBottom: 20, shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  badge: { backgroundColor: '#000', paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#000' },
  cardDesc: { fontSize: 14, fontWeight: '600', marginTop: 5, marginBottom: 15 },
  codeContainer: { flexDirection: 'row', borderWidth: 2, borderColor: '#000' },
  codeText: { flex: 1, padding: 10, fontWeight: '900' },
  copyBtn: { backgroundColor: '#000', padding: 12 },
  copyBtnText: { color: '#FFF', fontWeight: '900' },
  
  // 🪙 External Section Styles
  externalPromoSection: { marginBottom: 30, borderWidth: 3, borderColor: '#000', backgroundColor: '#000', overflow: 'hidden' },
  externalImage: { width: '100%', height: 160 },
  externalTextPadding: { padding: 15 },
  externalTitle: { color: '#FFF', fontWeight: '900', fontSize: 18 },
  externalSub: { color: '#94A3B8', fontSize: 12 }
});
