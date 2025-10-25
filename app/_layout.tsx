import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ title: "" }}>
      <Stack.Screen name="login" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="recover-account" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="register" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false, title: "", headerBackButtonDisplayMode: "minimal"}} />
    </Stack>
  )
}
