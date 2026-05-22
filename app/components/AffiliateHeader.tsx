import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { MotiView } from 'moti';

const AffiliateWalletHeader = ({ balance, onPress }: { balance: number, onPress: () => void }) => {
  return (
    <MotiView 
      from={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={onPress} style={styles.content}>
        <Wallet color="#00F2C3" size={14} />
        <Text style={styles.balanceText}>R {balance.toFixed(2)}</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

// Added default export[cite: 42]
export default AffiliateWalletHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 242, 195, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 195, 0.3)',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  balanceText: { color: '#00F2C3', fontSize: 12, fontWeight: '900' }
});