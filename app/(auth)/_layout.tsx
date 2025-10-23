import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="upload-file" />
      <Stack.Screen name="upload-file-success" />
      <Stack.Screen name="upload-file-transactions-preview" />
      <Stack.Screen name="upload-file-transactions-preview-edition" />
    </Stack>
  )
}
