// app/_layout.tsx - 🪙 PRODUCTION CORE ENVIRONMENT ROUTER
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SocketProvider } from '../context/SocketContext'; // 🪙 Import your updated context

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SocketProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* The index entry point maps root traffic cleanly */}
            <Stack.Screen name="index" /> 
            <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
            <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
            <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
          </Stack>
        </SocketProvider>
      </ThemeProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </GestureHandlerRootView>
  );
}