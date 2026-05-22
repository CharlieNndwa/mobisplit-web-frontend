import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { ChevronLeft, ShieldCheck, CreditCard, Anchor, Clock, Users } from "lucide-react-native";

const { height } = Dimensions.get("window");

const CONTENT: any = {
  'boat-hire': {
    title: "Boat Hire",
    tagline: "Waterway Marketplace",
    hero: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
    accent: '#38BDF8',
    guides: [
      { id: 1, icon: <Anchor color="#38BDF8" />, title: "Safety First", desc: "All vessels carry certified life jackets for every passenger." },
      { id: 2, icon: <ShieldCheck color="#10B981" />, title: "Verified Captains", desc: "Skipers are vetted for valid maritime licenses." }
    ]
  },
  'shuttle-hire': {
    title: "Shuttle",
    tagline: "Daily Marketplace Commute",
    hero: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800',
    accent: '#818CF8',
    guides: [
      { id: 1, icon: <Clock color="#818CF8" />, title: "On-Time", desc: "Follow fixed schedules for a predictable commute." },
      { id: 2, icon: <Users color="#10B981" />, title: "Split Fare", desc: "Cost-effective travel by sharing with fellow commuters." }
    ]
  },
  'truck-hire': {
    title: "Heavy Duty",
    tagline: "Logistics Marketplace",
    hero: 'https://st.depositphotos.com/36151166/61478/i/450/depositphotos_614786942-stock-photo-cargo-trucks-parking-lift-ramp.jpg',
    accent: '#FBBF24',
    guides: [
      { id: 1, icon: <ShieldCheck color="#FBBF24" />, title: "Secure Cargo", desc: "Tracked logistics for your valuable goods." }
    ]
  },
  'kids-travel': {
    title: "Kids & Teens",
    tagline: "Safe School Runs",
    hero: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800',
    accent: '#F472B6',
    guides: [
      { id: 1, icon: <Users color="#F472B6" />, title: "Trusted Drivers", desc: "Enhanced background checks for school transport." }
    ]
  },
  'senior-travel': {
    title: "Pensioners",
    tagline: "Comfortable Mobility",
    hero: 'https://images.unsplash.com/photo-1523225918988-00624e6d8fee?q=80&w=800',
    accent: '#FB923C',
    guides: [
      { id: 1, icon: <ShieldCheck color="#FB923C" />, title: "Assisted Care", desc: "Drivers trained for elderly passenger support." }
    ]
  }
};



export default function DynamicServiceScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // The "replace" fix: handle undefined safely
  const serviceId = id ? (id as string) : 'boat-hire';
  const data = CONTENT[serviceId] || CONTENT['boat-hire'];

  const handleProceed = () => {
    if (id === 'boat-hire') {
        router.push('/services/boat-hire' as any);
    } else if (id === 'truck-hire') {
        router.push('/services/truck-hire' as any);
    } else {
        // Default to ride planning for standard ride types
        router.push('/plan-ride');
    }
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false}>
        <View style={styles.hero}>
          <Image source={{ uri: data.hero }} style={styles.heroImg} />
          <LinearGradient colors={['transparent', '#020617']} style={styles.overlay} />
          <SafeAreaView style={styles.nav}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ChevronLeft color="#FFF" size={24} />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.heroText}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.tagline}>{data.tagline}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
          {data.guides.map((g: any, i: number) => (
            <MotiView 
              key={g.id || i} // 🔑 Unique key added to the top-level element inside the loop
              from={{ opacity: 0, transform: [{ translateX: -20 }] }} 
              animate={{ opacity: 1, transform: [{ translateX: 0 }] }}
              transition={{ delay: i * 100 }} // Stagger entry for a smooth minimalist experience
              style={styles.guide} // 🎨 Ensures the layout uses the flex alignment correctly
            >
              <View style={styles.iconBox}>{g.icon}</View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.gTitle}>{g.title}</Text>
                <Text style={styles.gDesc}>{g.desc}</Text>
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: data.accent }]} onPress={() => router.push('/plan-ride')}>
          <Text style={styles.btnText}>Proceed to {data.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  hero: { height: height * 0.5 },
  heroImg: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject },
  nav: { position: 'absolute', left: 20 },
  backBtn: { width: 45, height: 45, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  heroText: { position: 'absolute', bottom: 30, left: 25 },
  title: { color: '#FFF', fontSize: 42, fontWeight: '900' },
  tagline: { color: '#94A3B8', fontSize: 16, fontWeight: '600' },
  body: { padding: 25 },
  sectionLabel: { color: '#475569', fontSize: 12, fontWeight: '900', letterSpacing: 2, marginBottom: 20 },
  guide: { flexDirection: 'row', marginBottom: 25, alignItems: 'center' },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center' },
  gTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  gDesc: { color: '#64748B', fontSize: 14, marginTop: 4 },
  footer: { padding: 25, paddingBottom: 40 },
  btn: { height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: '900' }
});