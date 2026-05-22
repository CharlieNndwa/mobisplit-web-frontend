import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  Image, Alert, ScrollView, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeft, ShieldCheck, Camera, FileText, CheckCircle } from 'lucide-react-native';
import { MotiView } from 'moti';

export default function VerifyScreen() {
  const router = useRouter();
  const [idImage, setIdImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickId = async () => {
    // Permission check for safety
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "MobiSplit needs access to your gallery to upload your ID.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6, // Slightly lower quality to save RAM during processing
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  const handleVerify = () => {
    if (!idImage) return Alert.alert("ID Required", "Please upload a clear photo of your ID or Passport.");
    
    setUploading(true);
    
    // Simulate back-end verification sync
    setTimeout(() => {
      setUploading(false);
      Alert.alert(
        "Verification Pending", 
        "Your documents have been submitted. We will notify you once verified.", 
        [{ text: "Return to Profile", onPress: () => router.back() }]
      );
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Lego-style spacing */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={28}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Check</Text>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Fixed MotiView: Using translateY instead of y to resolve TS2353[cite: 18] */}
        <MotiView 
          from={{ opacity: 0, translateY: 20 }} 
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ type: 'timing', duration: 500 }}
          style={styles.infoCard}
        >
          <View style={styles.iconCircle}>
            <ShieldCheck color="#FDE047" size={32} />
          </View>
          <Text style={styles.infoTitle}>Secure Verification</Text>
          <Text style={styles.infoDesc}>
            To keep our community safe, we need a clear photo of your official identification.
          </Text>
        </MotiView>

        <Text style={styles.label}>National ID or Passport</Text>
        <TouchableOpacity 
          style={[styles.uploadBox, idImage ? styles.uploadBoxActive : null]} 
          onPress={pickId}
          activeOpacity={0.8}
        >
          {idImage ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: idImage }} style={styles.previewImage} />
              <View style={styles.changeBadge}>
                <Camera color="#FFF" size={14} />
                <Text style={styles.changeText}>CHANGE</Text>
              </View>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <View style={styles.uploadIconCircle}>
                <FileText color="#60A5FA" size={30} />
              </View>
              <Text style={styles.uploadTitle}>Tap to Upload</Text>
              <Text style={styles.uploadSubtext}>JPG or PNG (Max 5MB)</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.guidelineBox}>
          <CheckCircle color="#22C55E" size={16} />
          <Text style={styles.guidelineText}>Ensure all text is clearly readable</Text>
        </View>

        <TouchableOpacity 
          style={[styles.submitBtn, (!idImage || uploading) && styles.submitBtnDisabled]} 
          onPress={handleVerify}
          disabled={uploading || !idImage}
        >
          {uploading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitBtnText}>CONFIRM SUBMISSION</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
  },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '900', letterSpacing: 0.5 },
  content: { padding: 20 },
  infoCard: { 
    backgroundColor: '#1E293B', 
    padding: 24, 
    borderRadius: 24, 
    alignItems: 'center', 
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#334155' 
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(253, 224, 71, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  infoTitle: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  infoDesc: { color: '#94A3B8', textAlign: 'center', marginTop: 10, lineHeight: 22, fontSize: 14 },
  label: { color: '#60A5FA', fontSize: 12, fontWeight: '900', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  uploadBox: { 
    height: 200, 
    backgroundColor: '#1E293B', 
    borderRadius: 24, 
    borderStyle: 'dashed', 
    borderWidth: 2, 
    borderColor: '#475569', 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden' 
  },
  uploadBoxActive: { borderStyle: 'solid', borderColor: '#2563EB' },
  uploadPlaceholder: { alignItems: 'center' },
  uploadIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  uploadTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  uploadSubtext: { color: '#64748B', fontSize: 12, marginTop: 4 },
  previewContainer: { width: '100%', height: '100%' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  changeBadge: { 
    position: 'absolute', 
    bottom: 12, 
    right: 12, 
    backgroundColor: 'rgba(15, 23, 42, 0.8)', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20 
  },
  changeText: { color: '#FFF', fontSize: 10, fontWeight: '900', marginLeft: 4 },
  guidelineBox: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, justifyContent: 'center' },
  guidelineText: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  submitBtn: { 
    backgroundColor: '#2563EB', 
    height: 64, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8
  },
  submitBtnDisabled: { backgroundColor: '#334155', elevation: 0 },
  submitBtnText: { color: '#FFF', fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});