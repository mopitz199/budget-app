import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{animation: 'none'}}>
      <Stack.Screen name="login" options={{animation: 'default'}}/>
      <Stack.Screen name="component-example" options={{animation: 'default'}}/>
      <Stack.Screen name="recover-account" options={{animation: 'default'}}/>
      <Stack.Screen name="register" options={{animation: 'default'}}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'default' }} />
    </Stack>
  )
}


