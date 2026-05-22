import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ShieldCheck, ArrowLeft, ChevronRight, AlertCircle, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get("window");
const HERO_URL = "https://t4.ftcdn.net/jpg/05/15/30/57/360_F_515305790_58wwwoB0DbvAidgDZbK7U3ZPhUvvfjzy.jpg";

// Define the shape of our insurance data for TypeScript
interface InsuranceData {
  provider: string;
  policyNumber: string;
  expiry?: string;
}

export default function InsuranceProfile() {
  const router = useRouter();
  const [insurance, setInsurance] = useState<InsuranceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const storedData = await SecureStore.getItemAsync('user_insurance_data');
        if (storedData) {
          setInsurance(JSON.parse(storedData));
        }
      } catch (e) {
        console.error("Failed to load insurance info", e);
      } finally {
        setLoading(false);
      }
    };
    fetchInsurance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Image source={{ uri: HERO_URL }} style={styles.heroImage} />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Insurance Profile</Text>

        {insurance ? (
          <View style={styles.dataCard}>
            <View style={styles.cardHeader}>
                <ShieldCheck color="#22C55E" size={24} />
                <Text style={styles.verifiedText}>Verified Active Policy</Text>
            </View>
            
            <View style={styles.infoRow}>
                <Text style={styles.label}>PROVIDER</Text>
                <Text style={styles.value}>{insurance.provider}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
                <Text style={styles.label}>POLICY NUMBER</Text>
                <Text style={styles.value}>{insurance.policyNumber}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <AlertCircle color="#94A3B8" size={48} />
            <Text style={styles.emptyTitle}>No Active Cover Detected</Text>
            <Text style={styles.emptySub}>
                To ensure passenger safety and comply with MobiSplit standards, 
                please provide your liability details.
            </Text>
            
            <TouchableOpacity 
              style={styles.applyNowBtn} 
              onPress={() => router.push("/insurance")}
            >
              <Text style={styles.applyNowText}>APPLY NOW FOR COVER</Text>
              <ChevronRight color="#FFF" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  heroContainer: { height: 220, width: '100%' },
  heroImage: { width: '100%', height: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 12 },
  content: { padding: 25 },
  title: { color: '#FFF', fontSize: 28, fontWeight: '900', marginBottom: 20 },
  
  // Missing Styles Added Below:
  dataCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 12,
    borderRadius: 12,
  },
  verifiedText: { color: '#22C55E', fontWeight: '800', fontSize: 14 },
  infoRow: { marginVertical: 5 },
  label: { color: '#64748B', fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  value: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', marginTop: 15 },
  emptySub: { color: '#94A3B8', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  applyNowBtn: { 
    backgroundColor: '#0EA5E9', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical: 18, 
    borderRadius: 20, 
    marginTop: 30 
  },
  applyNowText: { color: '#FFF', fontWeight: '900', marginRight: 10 }
});