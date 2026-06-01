import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const LOGO_IMAGE = require("./images/logoroza-removebg-preview.png");

export default function LoadingScreen() {
  const router = useRouter();
  const loaderWidth = useRef(new Animated.Value(0)).current;

  // 🪙 UPDATED: Use a ref instead of state to track navigation status.
  // This prevents extra re-renders that crash the hook order.
  const hasAttemptedNavigation = useRef(false);

  useEffect(() => {
    // 🪙 UPDATED: Single pass animation for smoother performance on 4GB RAM
    const animation = Animated.timing(loaderWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    });

    animation.start();

    const checkAuthAndNavigate = async () => {
      // 🪙 UPDATED: Prevent multiple navigation attempts during the same mount
      if (hasAttemptedNavigation.current) return;

      try {
        const userToken = await SecureStore.getItemAsync("user_token");

        // 🪙 UPDATED: A tiny 100ms delay ensures the Expo Router context is
        // fully initialized before we try to switch layouts.
        setTimeout(() => {
          hasAttemptedNavigation.current = true;
          if (userToken) {
            router.replace("/(tabs)/home");
          } else {
            router.replace("/(auth)/gateway");
          }
        }, 100);
      } catch (e) {
        hasAttemptedNavigation.current = true;
        router.replace("/(auth)/gateway");
      }
    };

    checkAuthAndNavigate();
    return () => animation.stop();
  }, []);

  const interpolatedWidth = loaderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0F172A", "#020617"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.centerContent}>
        <Image source={LOGO_IMAGE} style={styles.heroImg} />
        <View style={styles.loaderContainer}>
          <View style={styles.track} />
          <Animated.View
            style={[styles.progress, { width: interpolatedWidth }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
  centerContent: { alignItems: "center", width: "100%", paddingHorizontal: 20 },
  heroImg: { width: width * 0.8, height: 300, resizeMode: "contain" },
  loaderContainer: {
    marginTop: 50,
    width: 200,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  track: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  progress: { height: "100%", backgroundColor: "#FDE047" },
});
