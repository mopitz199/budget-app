import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login"/>
      <Stack.Screen name="recover-account"/>
      <Stack.Screen name="register"/>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  )
}


