import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from "expo-image-picker";
import {
  Camera,
  UploadCloud,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react-native";

// 🪙 ADD THIS LINE:
const API_URL = "https://daringly-tacky-anemic.ngrok-free.dev";

export default function AssetVerificationScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    category: "Truck",
    owner_type: "Individual",
    make: "",
    model: "",
    year: "",
    capacity: "",
    city: "",
    contact_number: "",
    description: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!form.make || !form.model || !image) {
      Alert.alert(
        "Required Fields",
        "Please provide vehicle details and a photo.",
      );
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key as keyof typeof form]),
      );

      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("document", { uri: image, name: filename, type } as any);
      formData.append("document_type", "Vehicle_Registration");

      const response = await fetch(
        `${API_URL}/api/assets/register`,
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.ok) {
        Alert.alert("Success", "Asset submitted for verification!");
        router.replace("/fleet/list-vehicle");
      }
    } catch (error) {
      Alert.alert("Upload Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

const handleVerify = async () => {
  if (!form.make || !form.model || !image) {
    return Alert.alert("Error", "Please provide vehicle details and an image.");
  }

  setLoading(true);
  try {
    const userId = await SecureStore.getItemAsync("userId");
    
    // 🪙 Using FormData for multipart/form-data upload
    const formData = new FormData();
    formData.append("userId", userId || "");
    formData.append("category", form.category);
    formData.append("make", form.make);
    formData.append("model", form.model);
    formData.append("year", form.year);
    formData.append("capacity", form.capacity);
    formData.append("document_type", "vehicle_photo");

    // Process image for upload
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || "");
    const type = match ? `image/${match[1]}` : `image`;

    formData.append("document", {
      uri: image,
      name: filename,
      type,
    } as any);

    const response = await fetch(`${API_URL}/api/assets/register`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const result = await response.json();

    if (result.success) {
      Alert.alert("Success", "Truck submitted and published!");
      router.replace("/services/truck-hire"); // 🪙 Redirect to the hire screen
    } else {
      throw new Error(result.error || "Submission failed");
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>

        <Text style={styles.title}>Register Asset</Text>

        <Text style={styles.label}>Owner Type</Text>
        <View style={styles.row}>
          {["Individual", "Company"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeBtn,
                form.owner_type === type && styles.activeType,
              ]}
              onPress={() => setForm({ ...form, owner_type: type })}
            >
              <Text
                style={[
                  styles.typeText,
                  form.owner_type === type && styles.activeTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Make (e.g. Isuzu)"
          placeholderTextColor="#64748B"
          onChangeText={(v) => setForm({ ...form, make: v })}
        />
        <TextInput
          style={styles.input}
          placeholder="Model (e.g. NPR 400)"
          placeholderTextColor="#64748B"
          onChangeText={(v) => setForm({ ...form, model: v })}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          placeholderTextColor="#64748B"
          onChangeText={(v) => setForm({ ...form, year: v })}
        />
        <TextInput
          style={styles.input}
          placeholder="Capacity (e.g. 4 Tons)"
          placeholderTextColor="#64748B"
          onChangeText={(v) => setForm({ ...form, capacity: v })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          keyboardType="phone-pad"
          placeholderTextColor="#64748B"
          onChangeText={(v) => setForm({ ...form, contact_number: v })}
        />

        <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
          {image ? (
            <CheckCircle color="#10B981" size={40} />
          ) : (
            <UploadCloud color="#64748B" size={40} />
          )}
          <Text style={styles.uploadText}>
            {image ? "Photo Attached" : "Upload Vehicle Photo / Logbook"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitBtnText}>SUBMIT FOR VERIFICATION</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.assetBtn}
          onPress={() => router.push("/fleet/list-vehicle")}
        >
          <ShieldCheck color="#FFF" size={20} />
          <Text style={styles.assetText}>VIEW MY LISTED VEHICLES</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  title: { fontSize: 28, fontWeight: "900", color: "#FFF", marginBottom: 25 },
  label: { color: "#94A3B8", marginBottom: 10, fontWeight: "700" },
  row: { flexDirection: "row", gap: 10, marginBottom: 20 },
  typeBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  activeType: { backgroundColor: "#FBBF24", borderColor: "#FBBF24" },
  typeText: { color: "#94A3B8", fontWeight: "800" },
  activeTypeText: { color: "#000" },
  input: {
    backgroundColor: "#1E293B",
    color: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontWeight: "600",
  },
  uploadArea: {
    height: 150,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  uploadText: { color: "#64748B", marginTop: 10, fontWeight: "700" },
  submitBtn: {
    backgroundColor: "#FBBF24",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  submitBtnText: { color: "#000", fontWeight: "900", fontSize: 16 },
  assetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
  },
  assetText: { color: "#FFF", fontWeight: "700" },
});
