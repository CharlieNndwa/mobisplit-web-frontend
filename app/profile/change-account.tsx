import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ChevronLeft, Trash2, ShieldAlert } from "lucide-react-native";

const API_URL = "https://daringly-tacky-anemic.ngrok-free.dev";
const HERO_IMAGE =
  "https://www.shutterstock.com/image-photo/programmers-hand-tapping-on-file-600nw-2450533077.jpg";

export default function ChangeAccountScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🪙 UPDATED: Hardened Delete Logic to wipe credentials and local state
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Wipe Account?",
      "This will permanently delete your credentials from MobiSplit. You will need to create a brand new account to use the app again.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "DELETE EVERYTHING",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const userId = await SecureStore.getItemAsync("userId");

              // 1. Call Backend to truncate user data from mobisplit_db
              const response = await fetch(
                `${API_URL}/api/users/delete-permanent`,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId }),
                },
              );

              // 2. Wipe Local Secure Storage completely
              await SecureStore.deleteItemAsync("user_token");
              await SecureStore.deleteItemAsync("userId");
              await SecureStore.deleteItemAsync("user_role");
              await SecureStore.deleteItemAsync("user_full_name");
              await SecureStore.deleteItemAsync("is_verified_driver");

              Alert.alert("Success", "Account wiped. Credentials released.");
              router.replace("/(auth)/gateway");
            } catch (error) {
              Alert.alert(
                "Error",
                "Could not complete wipe. Check connection.",
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 🪙 HERO SECTION */}
        <View style={styles.heroWrapper}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.headerTitle}>ACCOUNT PRIVACY</Text>

          <View style={styles.warningCard}>
            <ShieldAlert color="#F87171" size={32} />
            <Text style={styles.warningText}>
              Deleting your account will remove all ride history, wallet
              balances, and your verification status.
            </Text>
          </View>

          {/* 🪙 DELETE BUTTON ONLY */}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Trash2 color="#FFF" size={20} />
                <Text style={styles.deleteBtnText}>DELETE MY ACCOUNT</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  heroWrapper: { height: 250, width: "100%", position: "relative" },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { padding: 25 },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
  },
  warningCard: {
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1E293B",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
  },
  warningText: { color: "#94A3B8", flex: 1, fontSize: 14, fontWeight: "600" },
  deleteBtn: {
    height: 65,
    backgroundColor: "#7F1D1D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#000",
  },
  deleteBtnText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
});
