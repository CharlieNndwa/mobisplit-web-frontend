import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Tag, Bell, LifeBuoy, Megaphone } from 'lucide-react-native';
import { MotiView } from 'moti';

export default function InboxScreen() {
  const router = useRouter();

  const LegoMessage = ({ title, body, icon: Icon, color, shadowColor, delay }: any) => (
    <MotiView 
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 400, delay }}
        style={styles.messageWrapper}
    >
      <View style={[styles.legoShadow, { backgroundColor: shadowColor }]} />
      <View style={[styles.legoMain, { backgroundColor: color }]}>
        <View style={styles.iconCircle}>
          <Icon color="#FFF" size={20} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.msgTitle}>{title}</Text>
          <Text style={styles.msgBody}>{body}</Text>
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>INBOX</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.sectionLabel}>PROMOTIONS & OFFERS</Text>
          
          <LegoMessage 
            title="Welcome Gift!"
            body="First two rides are free for new users"
            icon={Tag}
            color="#F59E0B"
            shadowColor="#92400E"
            delay={100}
          />

          <Text style={styles.sectionLabel}>ANNOUNCEMENTS</Text>
          
          <LegoMessage 
            title="System Update"
            body="MobiSplit 2.0 is now live with better mapping."
            icon={Megaphone}
            color="#10B981"
            shadowColor="#065F46"
            delay={200}
          />

          <LegoMessage 
            title="Safety Check"
            body="Remember to verify your driver's OTP."
            icon={Bell}
            color="#4F46E5"
            shadowColor="#3730A3"
            delay={300}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { padding: 10, backgroundColor: '#1E293B', borderRadius: 12, borderWidth: 2, borderColor: '#000' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  scroll: { padding: 20 },
  sectionLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginBottom: 15, marginTop: 10 },
  
  messageWrapper: { height: 100, marginBottom: 20 },
  legoMain: { flex: 1, borderRadius: 20, borderWidth: 2, borderColor: '#000', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, zIndex: 2 },
  legoShadow: { position: 'absolute', top: 5, left: 0, right: 0, bottom: -5, borderRadius: 20, zIndex: 1, borderWidth: 2, borderColor: '#000' },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  msgTitle: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  msgBody: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2, fontWeight: '600' }
});