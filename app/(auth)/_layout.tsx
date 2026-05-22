import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="gateway" />
      <Stack.Screen name="phone-onboard" />
      <Stack.Screen name="password-setup" />
      <Stack.Screen name="phone-verify" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="user-type" /> {/* Added user-type to the stack */}
      <Stack.Screen name="welcome" />
    </Stack>
  );
}
