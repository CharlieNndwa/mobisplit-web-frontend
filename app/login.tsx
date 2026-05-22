import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LoginOnboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.logoText}>MobiSplit</Text>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2965/2965311.png' }} 
          style={styles.heroImage}
        />
        <Text style={styles.title}>Move with safety and ease</Text>
      </View>

      <View style={styles.bottomSection}>
        {/* Phone Login */}
        <TouchableOpacity 
          style={styles.phoneBtn} 
          onPress={() => router.push('/auth/phone-login' as any)}
        >
          <View style={styles.btnContent}>
            <Phone color="#FFF" size={20} />
            <Text style={styles.phoneBtnText}>Continue with Phone Number</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Logins */}
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/300/300221.png' }} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png' }} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* Legal Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing up, you agree to our{' '}
            <Text style={styles.link} onPress={() => router.push('/legal/terms' as any)}>Terms & Conditions</Text>, acknowledge our{' '}
            <Text style={styles.link} onPress={() => router.push('/legal/privacy' as any)}>Privacy Policy</Text>, and confirm that you're over 18.
          </Text>
          <Text style={styles.footerTextSub}>
            We may send promotions related to our services - you can unsubscribe anytime in Communication Settings under your profile.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  topSection: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#FBBF24', position: 'absolute', top: 20 },
  heroImage: { width: 200, height: 200, resizeMode: 'contain' },
  title: { color: '#FFF', fontSize: 28, fontWeight: '800', textAlign: 'center', marginTop: 20 },
  
  bottomSection: { padding: 25, paddingBottom: 40 },
  phoneBtn: { backgroundColor: '#1E40AF', height: 60, borderRadius: 15, justifyContent: 'center' },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  phoneBtnText: { color: '#FFF', fontSize: 16, fontWeight: '800' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#1E293B' },
  orText: { color: '#64748B', paddingHorizontal: 15, fontSize: 14 },

  socialBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0F172A', 
    height: 60, 
    borderRadius: 15, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  socialIcon: { width: 20, height: 20, marginRight: 12 },
  socialText: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  footer: { marginTop: 20 },
  footerText: { color: '#64748B', fontSize: 11, textAlign: 'center', lineHeight: 18 },
  footerTextSub: { color: '#475569', fontSize: 10, textAlign: 'center', marginTop: 10 },
  link: { color: '#FBBF24', fontWeight: '700' }
});