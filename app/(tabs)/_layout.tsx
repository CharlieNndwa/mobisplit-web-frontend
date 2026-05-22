import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import {
  Home,
  LayoutGrid,
  ClipboardList,
  Wallet,
  UserCircle,
} from "lucide-react-native";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("user_token");
        if (!token) {
          router.replace("/(auth)/gateway");
          return;
        }
      } catch (error) {
        router.replace("/(auth)/gateway");
      } finally {
        setTimeout(() => setIsLoading(false), 50);
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {
              height: 65 + insets.bottom,
              paddingBottom: insets.bottom > 0 ? insets.bottom - 10 : 10,
            },
          ],
          tabBarActiveTintColor: "#FDE047",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        {/* 1. HOME (Left-most) - Mapping to home.tsx */}
        <Tabs.Screen
          name="home" 
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={22} color={color} />,
          }}
        />

        {/* 2. SERVICES */}
        <Tabs.Screen
          name="services"
          options={{
            title: "Services",
            tabBarIcon: ({ color }) => <LayoutGrid size={22} color={color} />,
          }}
        />

        {/* 3. ACTIVITY */}
        <Tabs.Screen
          name="activity"
          options={{
            title: "Activity",
            tabBarIcon: ({ color }) => (
              <ClipboardList size={22} color={color} />
            ),
          }}
        />

        {/* 4. WALLET */}
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color }) => <Wallet size={22} color={color} />,
          }}
        />

        {/* 5. ACCOUNT (Far Right) */}
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <UserCircle size={22} color={color} />,
          }}
        />
      </Tabs>

      {isLoading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#0F172A", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator size="large" color="#FDE047" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0F172A",
    borderTopWidth: 2,
    borderTopColor: "#1E293B",
    elevation: 0,
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "900",
    marginTop: -5,
    marginBottom: 5,
  },
});