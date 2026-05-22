// trip-summary.tsx - 🪙 AUDITED & CORRECTED
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CheckCircle, Clock, Navigation } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSocket } from '../../context/SocketContext';

const { width } = Dimensions.get('window');

export default function TripSummaryScreen() {
  const router = useRouter();
  const socket = useSocket();
  const params = useLocalSearchParams();

  // 🪙 Helper to resolve the string | string[] ambiguity
  const getStringParam = (param: string | string[] | undefined): string => {
    if (Array.isArray(param)) return param[0];
    return param || "0";
  };

  // 🪙 Resolved TS2345: These are now guaranteed strings
  const fareStr = getStringParam(params.fare);
  const timeTaken = getStringParam(params.timeTaken);
  const distance = getStringParam(params.distance);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBalance, setNewBalance] = useState(getStringParam(params.currentBalance));

  // 🪙 Calculation Logic
  const fareNumber = parseFloat(fareStr);
  const netEarnings = (fareNumber - 5).toFixed(2); // 🪙 Fixed R5 MobiSplit Fee

  useEffect(() => {
    setShowConfetti(true);

    socket?.on('wallet:update', (data) => {
      setNewBalance(data.balance.toString());
    });

    return () => {
      socket?.off('wallet:update');
    };
  }, []);

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}

      <MotiView 
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.mainCard}
      >
        <View style={styles.verifiedBadge}>
          <CheckCircle color="#10B981" size={60} />
          <Text style={styles.headerLabel}>Trip Completed</Text>
        </View>

        {/* 🪙 FIXED: Now using fareNumber instead of the missing 'fare' name */}
        <Text style={styles.mainFare}>R {fareNumber.toFixed(2)}</Text>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Clock size={18} color="#94A3B8" />
            <Text style={styles.detailText}>{timeTaken} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Navigation size={18} color="#94A3B8" />
            <Text style={styles.detailText}>{distance} km</Text>
          </View>
        </View>

        {/* 🪙 AUDITED COMMISSION BREAKDOWN BOX */}
        <View style={styles.breakdownBox}>
          <View style={styles.breakdownLine}>
            <Text style={styles.breakdownLabel}>Total Collected</Text>
            <Text style={styles.breakdownValue}>R {fareNumber.toFixed(2)}</Text>
          </View>
          
          <View style={styles.breakdownLine}>
            <Text style={[styles.breakdownLabel, { color: '#F87171' }]}>MobiSplit Fee</Text>
            <Text style={[styles.breakdownValue, { color: '#F87171' }]}>- R 5.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownLine}>
            <Text style={[styles.breakdownLabel, { fontSize: 18, color: '#10B981' }]}>Net Payout</Text>
            <Text style={[styles.breakdownValue, { fontSize: 18, color: '#10B981' }]}>
              R {netEarnings}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.doneBtn} 
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.doneBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 20,
  },
  mainCard: {
    backgroundColor: '#1E293B',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  verifiedBadge: { alignItems: 'center', marginBottom: 10 },
  headerLabel: { color: '#10B981', fontSize: 18, fontWeight: '900', marginTop: 10 },
  mainFare: { color: '#FFF', fontSize: 56, fontWeight: '900', marginVertical: 10 },
  detailRow: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { color: '#94A3B8', fontSize: 16, fontWeight: '600' },
  breakdownBox: { 
    width: '100%', 
    backgroundColor: '#0F172A', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 20 
  },
  breakdownLine: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  breakdownLabel: { color: '#64748B', fontWeight: '600' },
  breakdownValue: { color: '#FFF', fontWeight: '700' },
  divider: { 
    height: 1, 
    backgroundColor: '#334155', 
    marginVertical: 10 
  },
  doneBtn: {
    backgroundColor: '#10B981',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  }
});