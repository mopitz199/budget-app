import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="home" options={{animation: 'none'}}/>
      <Stack.Screen name="register-success"/>
      <Stack.Screen name="settings"/>
      <Stack.Screen name="transactions"/>
      <Stack.Screen name="manual-transaction"/>
      <Stack.Screen name="upload-file"/>
      <Stack.Screen name="upload-file-success"/>
      <Stack.Screen name="upload-file-transactions-preview"/>
      <Stack.Screen name="upload-file-transactions-preview-edition" />
    </Stack>
  )
}
