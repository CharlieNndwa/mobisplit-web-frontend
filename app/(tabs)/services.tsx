import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  ImageBackground,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LayoutGrid, ArrowRight, Construction } from 'lucide-react-native';
import { MotiView } from 'moti';
import AdBanner from "../components/AdBanner";

const { width } = Dimensions.get('window');

const SERVICES = [
  { 
    id: 'rides', 
    title: 'Trips', 
    desc: 'Find reliable lift shares across the city.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/1048/1048315.png',
    bgImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=500&auto=format&fit=crop',
    route: '/plan-ride', 
    color: '#3B82F6',
    shadowColor: '#1D4ED8'
  },
  { 
    id: 'boat', 
    title: 'Boat Hire', 
    desc: 'Quick waterway taxi and private boat rentals.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/9760/9760653.png',
    bgImage: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/42/d6/b5/hersonissos-sunset-boat.jpg?w=500&h=500&s=1',
    route: '/services/boat-hire', 
    color: '#10B981',
    shadowColor: '#047857'
  },
  { 
    id: 'shuttle', 
    title: 'Shuttle', 
    desc: 'Daily commute solutions for your workspace.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/12902/12902833.png',
    bgImage: 'https://media.istockphoto.com/id/1195019183/photo/shuttle-bus-brought-people-to-the-airport-for-the-flight.jpg?s=612x612&w=0&k=20&c=K-62TWK0Y8w9lIWRnF3rrdggS47lHPn1DvOfLIbkBjA=',
    route: '/services/shuttle-hire', 
    color: '#F59E0B',
    shadowColor: '#B45309'
  },
  { 
    id: 'delivery', 
    title: 'Heavy Duty', 
    desc: 'Professional truck and logistics services.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/1048/1048329.png',
    bgImage: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/european-truck-on-the-road-free-photo.jpg?w=600&quality=80',
    route: '/services/truck-hire', 
    color: '#EF4444',
    shadowColor: '#991B1B'
  },
  { 
    id: 'kids', 
    title: 'Teens & Kids', 
    desc: 'Safe and monitored school runs for children.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/3153/3153024.png',
    bgImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500&auto=format&fit=crop',
    route: '/services/kids-travel', 
    color: '#8B5CF6',
    shadowColor: '#5B21B6'
  },
  { 
    id: 'seniors', 
    title: 'Seniors', 
    desc: 'Comfortable and assisted travel for the elderly.', 
    iconPng: 'https://cdn-icons-png.flaticon.com/128/9301/9301343.png',
    bgImage: 'https://images.unsplash.com/photo-1523225918988-00624e6d8fee?fm=jpg&q=60&w=3000&auto=format&fit=crop',
    route: '/services/senior-travel', 
    color: '#EC4899',
    shadowColor: '#9D174D'
  },
];

// Reusable Service Lego Brick Component
const ServiceBrick = ({ title, desc, icon, bgImage, color, shadowColor, onPress }: any) => (
  <View style={styles.brickWrapper}>
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      style={[styles.legoCard, { borderColor: '#000' }]}
    >
      <ImageBackground 
        source={{ uri: bgImage }} 
        style={styles.brickBackground}
        imageStyle={{ opacity: 0.7 }}
      >
        {/* Color Overlay to keep it Midnight themed */}
        <View style={[styles.colorOverlay, { backgroundColor: color, opacity: 0.4 }]} />
        
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.iconPlate}>
               <Image source={{ uri: icon }} style={{ width: 22, height: 22 }} />
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>BOOK NOW!</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{title.toUpperCase()}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{desc}</Text>

          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>PLAN TRIP</Text>
            <View style={styles.arrowBox}>
              <ArrowRight color="#FFF" size={18} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    {/* Hard Shadow Element for Lego Depth */}
    <View style={[styles.hardShadow, { backgroundColor: shadowColor }]} />
  </View>
);

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>SERVICES</Text>
              <Text style={styles.headerSub}>CHOOSE YOUR MODE OF TRANSPORT</Text>
            </View>
            <View style={styles.headerIconBox}>
               <LayoutGrid color="#FFF" size={24} />
            </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentPadding}>
            {SERVICES.map((service, index) => (
              <MotiView
                key={service.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 100, type: 'timing' }}
              >
                <ServiceBrick 
                  title={service.title}
                  desc={service.desc}
                  icon={service.iconPng}
                  bgImage={service.bgImage}
                  color={service.color}
                  shadowColor={service.shadowColor}
                  onPress={() => router.push(service.route as any)}
                />
              </MotiView>
            ))}

          
          </View>

          {/* --- NEW AD SECTION --- */}
  <View style={styles.adSectionWrapper}>
    <Text style={styles.adSectionLabel}>ADVERTISEMENTS</Text>
    <View style={styles.adScrollContainer}>
      <AdBanner />
    </View>
  </View>

  {/* Spacer to ensure it clears the Tab Bar/Bottom of screen */}
  <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#1E293B'
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  headerSub: { fontSize: 10, fontWeight: '800', color: '#3B82F6', letterSpacing: 2 },
  headerIconBox: {
    padding: 10,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0
  },
  // scrollContent: { paddingBottom: 140 },
  contentPadding: { padding: 20 },
  
  brickWrapper: { marginBottom: 30 },
  legoCard: {
    height: 200,
    borderRadius: 0,
    borderWidth: 3,
    overflow: 'hidden',
    zIndex: 2,
  },
  brickBackground: { flex: 1 },
  colorOverlay: { ...StyleSheet.absoluteFillObject },
  cardContent: { flex: 1, padding: 15, justifyContent: 'flex-end' },
  
  cardHeader: { 
    position: 'absolute', 
    top: 15, 
    left: 15, 
    right: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  iconPlate: { backgroundColor: '#FFF', padding: 6, borderWidth: 2, borderColor: '#000' },
  badge: { backgroundColor: '#000', paddingHorizontal: 8, paddingVertical: 4, height: 22 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  
  cardTitle: { fontSize: 26, fontWeight: '900', color: '#FFF', marginBottom: 4, textShadowColor: '#000', textShadowRadius: 4, textShadowOffset: { width: 2, height: 2 } },
  cardDesc: { fontSize: 13, color: '#FFF', marginBottom: 15, fontWeight: '700', textShadowColor: '#000', textShadowRadius: 2 },
  
  actionContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderWidth: 2, 
    borderColor: '#000',
    alignItems: 'center'
  },
  actionText: { flex: 1, padding: 10, fontWeight: '900', fontSize: 12, color: '#000', letterSpacing: 1 },
  arrowBox: { backgroundColor: '#000', padding: 10 },

  hardShadow: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    left: 10,
    top: 10,
    zIndex: 1,
  },

  footerNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 },
  footerNoteText: { fontSize: 10, fontWeight: '900', color: '#475569', letterSpacing: 1 },

  scrollContent: {
    paddingBottom: 20, // Ensure there is room at the bottom
  },

  adSectionWrapper: {
    marginTop: 30,
    paddingHorizontal: 15, // Matches your grid padding
    alignItems: 'center',
    width: '100%',
  },

  adSectionLabel: {
    color: '#64748B', 
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
    alignSelf: 'flex-start',
    marginLeft: 5,
    textTransform: 'uppercase',
  },

  adScrollContainer: {
    width: '100%',
    backgroundColor: '#1E293B', 
    borderRadius: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});