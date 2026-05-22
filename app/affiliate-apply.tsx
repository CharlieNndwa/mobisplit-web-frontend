import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, ShieldCheck, Camera, Globe, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AffiliateApplyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call to backend to set status to 'pending'
    setTimeout(() => {
      setLoading(false);
      router.replace('/affiliate'); // Redirect back
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Affiliate Application</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.infoBox}>
          <Award color="#00F2C3" size={32} />
          <Text style={styles.infoTitle}>MobiSplit Partner Program</Text>
          <Text style={styles.infoDesc}>Join an elite network of promoters. Please provide your marketing details for verification.</Text>
        </View>

        <Text style={styles.inputLabel}>Primary Social Media / Website</Text>
        <View style={styles.inputWrapper}>
          {/* 🧜‍♂️ Fixed Syntax: Space added between Camera and color */}
          <Camera color="#64748B" size={20} style={styles.icon} />
          <TextInput placeholder="@username or link" placeholderTextColor="#475569" style={styles.input} />
        </View>

        <Text style={styles.inputLabel}>Promotion Strategy</Text>
        <TextInput 
          placeholder="How do you plan to promote MobiSplit?" 
          placeholderTextColor="#475569" 
          multiline 
          numberOfLines={4}
          style={[styles.input, styles.textArea]} 
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="#000" /> : (
            <Text style={styles.submitText}>SUBMIT APPLICATION</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.securityNote}>
          <ShieldCheck color="#475569" size={16} />
          <Text style={styles.securityText}>Secure processing by DevBeam Identity</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backBtn: { padding: 10, backgroundColor: '#1F2937', borderRadius: 12 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginLeft: 15 },
  scroll: { padding: 20 },
  infoBox: { alignItems: 'center', marginBottom: 30, backgroundColor: '#111827', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#1F2937' },
  infoTitle: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 10 },
  infoDesc: { color: '#94A3B8', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  inputLabel: { color: '#94A3B8', fontSize: 13, fontWeight: '700', marginBottom: 10, marginTop: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#1F2937' },
  icon: { marginRight: 10 },
  input: { flex: 1, color: '#FFF', height: 55 },
  textArea: { padding: 15, textAlignVertical: 'top', height: 120, backgroundColor: '#111827', borderRadius: 12, color: '#FFF', borderWidth: 1, borderColor: '#1F2937' },
  submitBtn: { backgroundColor: '#00F2C3', height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  submitText: { color: '#000', fontWeight: '900', letterSpacing: 1 },
  securityNote: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 5 },
  securityText: { color: '#475569', fontSize: 12 }
});