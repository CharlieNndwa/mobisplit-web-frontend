import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import * as Location from 'expo-location';
import { socket } from '../socket';

interface SOSButtonProps {
  userId: string;
  role: string;
}

const SOSButton = ({ userId, role }: SOSButtonProps) => {
  const triggerSOS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Location access is required for SOS.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({ 
        accuracy: Location.Accuracy.High 
      });
      
      socket.emit('emergency:sos', {
        userId,
        userRole: role,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        timestamp: new Date()
      });

      Alert.alert("SOS Sent", "Emergency notified.");
    } catch (error) {
      Alert.alert("Error", "Failed to send SOS signal.");
      console.error(error);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.sosCircle} 
      onPress={triggerSOS}
      activeOpacity={0.7}
    >
      <ShieldAlert color="#FFF" size={30} />
    </TouchableOpacity>
  );
};

// Added default export[cite: 41]
export default SOSButton;

const styles = StyleSheet.create({
  sosCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#EF4444',
    justifyContent: 'center', alignItems: 'center', elevation: 10,
  }
});