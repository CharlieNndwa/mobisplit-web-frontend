import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ShieldCheck, Camera, FileText, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';

export default function DriverVerificationScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleFinalize = async () => {
        setLoading(true);
        try {
            // This hits your backend to set is_verified: true[cite: 40]
            const response = await fetch('https://daringly-tacky-anemic.ngrok-free.dev/api/driver/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ driverId: 'CURRENT_SESSION_ID', status: true })
            });

            if (response.ok) {
                Alert.alert("Welcome Captain!", "Your account is now active. You are visible to riders.");
                router.replace('/onboarding/driver-dashboard');
            }
        } catch (e) {
            Alert.alert("Verification Error", "Please ensure your documents are clear.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MotiView from={{ opacity: 0, translateY: -20 }} animate={{ opacity: 1, translateY: 0 }} style={styles.header}>
                    <View style={styles.legoLogo}>
                        <ShieldCheck size={48} color="#FFF" />
                    </View>
                    <Text style={styles.title}>CAPTAIN VERIFICATION</Text>
                    <Text style={styles.sub}>Complete these blocks to start receiving pings.</Text>
                </MotiView>

                {/* LEGO DOCUMENT BLOCKS */}
                {[
                    { title: "Driver License", status: "Verified", color: "#10B981", icon: <Camera color="#FFF" /> },
                    { title: "Vehicle Paperwork", status: "Verified", color: "#10B981", icon: <FileText color="#FFF" /> },
                    { title: "Safety Screening", status: "Pending", color: "#F59E0B", icon: <ShieldCheck color="#FFF" /> }
                ].map((item, index) => (
                    <View key={index} style={styles.legoBlock}>
                        <View style={[styles.legoStud, { backgroundColor: item.color }]} />
                        <View style={styles.blockBody}>
                            <View style={styles.iconBox}>{item.icon}</View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={styles.blockTitle}>{item.title}</Text>
                                <Text style={styles.blockStatus}>{item.status}</Text>
                            </View>
                            <CheckCircle2 size={24} color={item.status === 'Verified' ? "#10B981" : "#334155"} />
                        </View>
                    </View>
                ))}

                <TouchableOpacity 
                    style={[styles.activateBtn, { opacity: loading ? 0.7 : 1 }]} 
                    onPress={handleFinalize}
                    disabled={loading}
                >
                    <Text style={styles.btnText}>{loading ? "PROCESSING..." : "ACTIVATE ACCOUNT"}</Text>
                    <ChevronRight color="#FFF" size={24} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F172A' },
    scroll: { padding: 25, paddingTop: 60 },
    header: { alignItems: 'center', marginBottom: 40 },
    legoLogo: { width: 90, height: 90, backgroundColor: '#1E40AF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
    sub: { color: '#94A3B8', fontSize: 14, textAlign: 'center', marginTop: 10 },
    legoBlock: { flexDirection: 'row', height: 90, marginBottom: 20 },
    legoStud: { width: 12, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
    blockBody: { flex: 1, backgroundColor: '#1E293B', borderTopRightRadius: 15, borderBottomRightRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    iconBox: { width: 45, height: 45, backgroundColor: '#334155', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    blockTitle: { color: '#FFF', fontSize: 17, fontWeight: '800' },
    blockStatus: { color: '#64748B', fontSize: 12, fontWeight: 'bold' },
    activateBtn: { backgroundColor: '#1E40AF', height: 75, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
    btnText: { color: '#FFF', fontSize: 18, fontWeight: '900', marginRight: 10 }
});