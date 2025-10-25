import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="settings" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="upload-file" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="upload-file-success" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="upload-file-transactions-preview" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
      <Stack.Screen name="upload-file-transactions-preview-edition" options={{title: "", headerBackButtonDisplayMode: "minimal"}}/>
    </Stack>
  )
}
