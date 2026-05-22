import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Phone, MessageSquare, ShieldCheck, MapPin, Clock } from 'lucide-react-native';

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specific asset details from your backend
    fetch(`https://daringly-tacky-anemic.ngrok-free.dev/api/assets/details/${id}`)
      .then(res => res.json())
      .then(data => {
        setAsset(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{flex:1}} color="#FBBF24" />;
  if (!asset) return <View style={styles.container}><Text style={{color:'#FFF'}}>Asset not found.</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: asset.image_url || 'https://via.placeholder.com/400' }} style={styles.heroImage} />
      
      <View style={styles.content}>
        <Text style={styles.category}>{asset.category} • {asset.owner_type}</Text>
        <Text style={styles.title}>{asset.make} {asset.model} ({asset.year})</Text>
        
        <View style={styles.locationRow}>
          <MapPin color="#94A3B8" size={16} />
          <Text style={styles.locationText}>{asset.city}, South Africa</Text>
        </View>

        <Text style={styles.sectionTitle}>Hire Rates</Text>
        {asset.pricing?.map((tier: any, index: number) => (
          <View key={index} style={styles.priceRow}>
            <Text style={styles.duration}>{tier.duration_label}</Text>
            <Text style={styles.price}>R{tier.price}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{asset.description}</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.chatBtn}
            onPress={() => Linking.openURL(`whatsapp://send?phone=${asset.contact_number}`)}
          >
            <MessageSquare color="#FFF" size={20} />
            <Text style={styles.btnText}>Chat to Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.callBtn}
            onPress={() => Linking.openURL(`tel:${asset.contact_number}`)}
          >
            <Phone color="#000" size={20} />
            <Text style={[styles.btnText, {color: '#000'}]}>Call Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  heroImage: { width: '100%', height: 300 },
  content: { padding: 20 },
  category: { color: '#FBBF24', fontWeight: '900', fontSize: 12, textTransform: 'uppercase' },
  title: { color: '#FFF', fontSize: 28, fontWeight: '900', marginTop: 5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 5 },
  locationText: { color: '#94A3B8', fontSize: 14 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 25, marginBottom: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1E293B', padding: 15, borderRadius: 12, marginBottom: 8 },
  duration: { color: '#94A3B8', fontWeight: '600' },
  price: { color: '#FFF', fontWeight: '900' },
  description: { color: '#64748B', lineHeight: 22 },
  actionGrid: { flexDirection: 'row', gap: 10, marginTop: 30 },
  chatBtn: { flex: 1, backgroundColor: '#10B981', height: 55, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  callBtn: { flex: 1, backgroundColor: '#FBBF24', height: 55, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#FFF', fontWeight: '900' }
});