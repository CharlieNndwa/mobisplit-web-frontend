// 🪙 1. UPDATED: _layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SocketProvider } from '../context/SocketContext'; // 🪙 Import your context

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SocketProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" /> 
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        </Stack>
      </SocketProvider>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}