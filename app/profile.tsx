import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  Image, ScrollView, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from 'moti';
import { 
  ChevronLeft, Camera, User, Mail, Phone, Save, Edit3, PlusCircle, Fingerprint, FileText, Tag, Car
} from 'lucide-react-native';

// Replace your old ngrok lines with this dynamic look-up:
const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";
const BACKEND_URL = `${API_BASE}/api`;

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    profileImage: null,
  });

  const [driverData, setDriverData] = useState({
    vehicleMake: "",
    vehicleModel: "",
    plate: "",
    prdpImage: null,
    licenseImage: null
  });

useEffect(() => {
    fetchProfileData();
  }, []);

// 🪙 REFACTORED SECURE CORE SYNCHRONIZATION FUNCTION
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // 🪙 1. FAST CACHE PRELOAD: Pull cached values instantly so UI doesn't look blank
      const cachedName = await SecureStore.getItemAsync('user_full_name');
      const cachedEmail = await SecureStore.getItemAsync('saved_email');
      const cachedPhone = await SecureStore.getItemAsync('phone');
      const token = await SecureStore.getItemAsync("user_token");
      
      // Thorough identity lookups to catch variations in naming rules
      let userId = await SecureStore.getItemAsync('user_id');
      if (!userId || userId === "null" || userId === "undefined") {
        userId = await SecureStore.getItemAsync('userId');
      }
      
      if (!userId || userId === "null" || userId === "undefined") {
        const storedUserObj = await SecureStore.getItemAsync('user');
        if (storedUserObj) {
          try {
            const parsedUser = JSON.parse(storedUserObj);
            userId = parsedUser?.id || parsedUser?.userId || parsedUser?._id;
          } catch (e) {
            console.error("Failed to parse compound user payload:", e);
          }
        }
      }

      // Render whatever we have locally on screen immediately
      if (cachedName || cachedEmail || cachedPhone) {
        setProfile({
          fullName: cachedName || "",
          email: cachedEmail || "",
          phone: cachedPhone || "",
          profileImage: null,
        });
      }

      // 🪙 2. ROUTE GUARD PROTECTION: Catch missing parameters before making a broken network call
      if (!userId || userId === "null" || userId === "undefined") {
        console.warn("MobiSplit Warning: Fetch aborted. A valid user identity fingerprint does not exist yet.");
        setLoading(false);
        return;
      }

      if (!token) {
        console.warn("MobiSplit Warning: Fetch aborted due to missing authentication headers.");
        setLoading(false);
        return;
      }

      console.log(`🔄 Querying live database profile statistics for target: ${userId}`);

      // 🪙 3. CLOUD RECONCILIATION: Dispatch verified request matching updated backend route metrics
      const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }); 

      if (!response.ok) {
        throw new Error(`Server responded with state: ${response.status}`);
      }

      const result = await response.json();

      // 🪙 4. UNPACK DATA MATRIX: Read structural details securely out of the result.user block object
      if (result && result.success && result.user) {
        const freshData = {
          fullName: result.user.fullName || result.user.full_name || "",
          email: result.user.email || "",
          phone: result.user.phone || "",
          profileImage: result.user.profileImage || result.user.profilePic || null
        };

        // Update state hooks with clean camelCase keys mapped from the controller
        setProfile(freshData);
        setIsDriver(!!result.user.isDriver);

        // Map and extract nested vehicle profiles if the user is registered as a driver
        if (result.user.vehicleMake || result.user.plateNumber) {
          setDriverData({
            vehicleMake: result.user.vehicleMake || "",
            vehicleModel: result.user.vehicleModel || "",
            plate: result.user.plateNumber || "",
            prdpImage: null, 
            licenseImage: null
          });
        }

        // 🪙 5. CACHE SYNCHRONIZATION: Update offline storage with clean production values
        await SecureStore.setItemAsync('user_full_name', freshData.fullName);
        await SecureStore.setItemAsync('saved_email', freshData.email);
        await SecureStore.setItemAsync('phone', freshData.phone);
        await SecureStore.setItemAsync('user_id', userId);
      } else {
        throw new Error("Target payload contains an un-parsable data format schema.");
      }

    } catch (error: any) {
      console.error("🚨 Profile Sync Error:", error);
      // Fallback alert logic if local fallback profiles are completely empty
      if (!profile.fullName) {
        Alert.alert(
          "Sync Failure", 
          "Could not synchronize account profile details with the cloud environment safely."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVehicle = async () => {
    setUpdating(true);
    try {
      const userId = await SecureStore.getItemAsync('userId');
      const response = await fetch(`${BACKEND_URL}/profile/update-docs/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverData)
      });
      if (response.ok) {
        Alert.alert("Success", "Vehicle documents synchronized.");
        setIsEditing(false);
      }
    } catch (e) {
      Alert.alert("Error", "Failed to update details.");
    } finally {
      setUpdating(false);
    }
  };

  const pickDoc = async (key: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5, 
    });
    if (!result.canceled) {
      setDriverData({ ...driverData, [key]: result.assets[0].uri });
    }
  };

  if (loading && !profile.fullName) return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <ActivityIndicator size="large" color="#FDE047" />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color="#FFF" size={28}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          {isDriver ? (
            <TouchableOpacity onPress={() => isEditing ? handleUpdateVehicle() : setIsEditing(true)}>
              {isEditing ? <Save color="#22C55E" size={24}/> : <Edit3 color="#FFF" size={24}/>}
            </TouchableOpacity>
          ) : <View style={{ width: 28 }} />}
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View style={styles.imageSection}>
            <View style={styles.imageContainer}>
              {profile.profileImage ? (
                <Image source={{ uri: profile.profileImage }} style={styles.profileImg} />
              ) : (
                <View style={styles.placeholderImg}><User color="#94A3B8" size={70} /></View>
              )}
              <TouchableOpacity style={styles.cameraIconBadge}>
                <Camera color="#FFF" size={16} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userRoleText}>{isDriver ? 'Verified Driver' : 'MobiSplit Rider'}</Text>
          </View>

          <View style={styles.sectionGap}>
            <Text style={styles.sectionHeading}>Basic Information</Text>
            <LegoDataBlock label="Full Name" value={profile.fullName} icon={User} color="#4F46E5" />
            <LegoDataBlock label="Email Address" value={profile.email} icon={Mail} color="#1E40AF" />
            <LegoDataBlock label="Phone Number" value={profile.phone} icon={Phone} color="#0D9488" />

            {!isDriver ? (
              <MotiView from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }}>
                <Text style={styles.sectionHeading}>Security</Text>
                {/* <LegoActionButton 
                  title="VERIFY IDENTITY" 
                  icon={Fingerprint} color="#2563EB" shadowColor="#1E3A8A" 
                  onPress={() => router.push('/verify')}
                /> */}
                <View style={{ height: 20 }} />
                <LegoActionButton 
                  title="REGISTER AS DRIVER" 
                  icon={PlusCircle} color="#128408" shadowColor="#065F46" 
                  onPress={() => router.push('/onboarding/driver-setup')} 
                />
              </MotiView>
            ) : (
              <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Text style={styles.sectionHeading}>Vehicle Details</Text>
                {isEditing ? (
                   <View style={styles.editForm}>
                      <TextInput 
                        style={styles.legoInput} 
                        value={driverData.vehicleMake} 
                        onChangeText={(t) => setDriverData({...driverData, vehicleMake: t})}
                        placeholder="Vehicle Make" placeholderTextColor="#64748B"
                      />
                      <TextInput 
                        style={styles.legoInput} 
                        value={driverData.plate} 
                        onChangeText={(t) => setDriverData({...driverData, plate: t})}
                        placeholder="License Plate" placeholderTextColor="#64748B"
                      />
                   </View>
                ) : (
                  <>
                    <LegoDataBlock label="Vehicle" value={`${driverData.vehicleMake} ${driverData.vehicleModel}`} icon={Car} color="#A16207" />
                    <LegoDataBlock label="License Plate" value={driverData.plate} icon={Tag} color="#1F2937" />
                  </>
                )}
              </MotiView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      {updating && <View style={styles.overlay}><ActivityIndicator size="large" color="#FFF"/></View>}
    </KeyboardAvoidingView>
  );
}

// Supporting Components
const LegoDataBlock = ({ label, value, icon: Icon, color }: any) => (
  <View style={styles.dataWrapper}>
    <View style={styles.dataShadow} />
    <View style={styles.dataMain}>
      <View style={[styles.iconBoxSmall, { backgroundColor: color }]}><Icon color="#FFF" size={18} /></View>
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.dataLabel}>{label}</Text>
        <Text style={styles.dataValue}>{value || "Not Set"}</Text>
      </View>
    </View>
  </View>
);

const LegoActionButton = ({ title, icon: Icon, color, shadowColor, onPress }: any) => (
    <TouchableOpacity style={styles.legoActionWrapper} onPress={onPress}>
      <View style={[styles.legoActionShadow, { backgroundColor: shadowColor }]} />
      <View style={[styles.legoActionMain, { backgroundColor: color }]}>
        <Icon color="#FFF" size={20} />
        <Text style={styles.legoActionText}>{title}</Text>
      </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  imageSection: { alignItems: 'center', marginVertical: 20 },
  imageContainer: { width: 120, height: 120 },
  profileImg: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#334155' },
  placeholderImg: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' },
  cameraIconBadge: { position: 'absolute', bottom: 0, right: 5, backgroundColor: '#2563EB', padding: 8, borderRadius: 20 },
  userRoleText: { color: '#94A3B8', fontWeight: '800', marginTop: 12, textTransform: 'uppercase' },
  sectionGap: { paddingHorizontal: 20, marginTop: 10 },
  sectionHeading: { color: '#60A5FA', fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginVertical: 15, textTransform: 'uppercase' },
  dataWrapper: { height: 70, marginBottom: 15 },
  dataShadow: { position: 'absolute', top: 4, left: 0, right: 0, bottom: -4, borderRadius: 15, backgroundColor: '#000' },
  dataMain: { flex: 1, backgroundColor: '#1E293B', borderRadius: 15, borderWidth: 2, borderColor: '#000', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  iconBoxSmall: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  dataLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '700' },
  dataValue: { color: '#FFF', fontWeight: '800', fontSize: 15 },
  legoInput: { backgroundColor: '#1E293B', height: 55, borderRadius: 15, borderWidth: 2, borderColor: '#FDE047', color: '#FFF', paddingHorizontal: 15, marginBottom: 10 },
  legoActionWrapper: { height: 60 },
  legoActionMain: { flex: 1, borderRadius: 15, borderWidth: 2, borderColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  legoActionShadow: { position: 'absolute', top: 4, left: 0, right: 0, bottom: -4, borderRadius: 15 },
  legoActionText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  editForm: { backgroundColor: '#1E293B', padding: 15, borderRadius: 20, borderWidth: 2, borderColor: '#334155', marginBottom: 20 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 100 }
});