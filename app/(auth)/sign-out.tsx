import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, StatusBar, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const HERO_IMAGE = require('../images/couple-consulting-gps-while-traveling.jpg'); 

export default function SignOutScreen() {
  const router = useRouter();
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Start the progress bar animation
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 3000, // 3 seconds for the bar to fill
      useNativeDriver: false,
    }).start();

    // 2. Timeout to route to gateway
    const timeout = setTimeout(() => {
      router.replace('/gateway');
    }, 3500); // Slight delay after bar finishes for smoothness

    return () => clearTimeout(timeout);
  }, []);

  const interpolatedWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HERO IMAGE SECTION --- */}
      <View style={styles.heroContainer}>
        <Image 
          source={HERO_IMAGE} 
          style={styles.heroImage} 
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(15,23,42,0.8)', '#0F172A']}
          style={styles.heroOverlay}
        />
      </View>

      {/* --- CONTENT & AUTOMATED LOADER --- */}
      <SafeAreaView style={styles.contentArea}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Securely Signed Out</Text>
          <Text style={styles.subtitle}>
            Thank you for being part of MobiSplit. Your presence is valuable to our community. See you on your next trip!
          </Text>
        </MotiView>

        <View style={styles.loaderSection}>
          <Text style={styles.loadingLabel}>Redirecting to Login...</Text>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressBar, { width: interpolatedWidth }]} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  
  heroContainer: { 
    height: height * 0.55, 
    width: width, 
    position: 'relative', 
    overflow: 'hidden' 
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },

  contentArea: { flex: 1, paddingHorizontal: 30, justifyContent: 'space-between' },
  textContainer: { marginTop: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', textAlign: 'center' },
  subtitle: { 
    fontSize: 15, 
    color: '#94A3B8', 
    fontWeight: '500', 
    textAlign: 'center', 
    marginTop: 12, 
    lineHeight: 22 
  },

  loaderSection: {
    marginBottom: 60,
    alignItems: 'center',
  },
  loadingLabel: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#22C55E', // Lime Green progress for branding
  }
});