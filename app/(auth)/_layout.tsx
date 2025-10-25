import { colors } from "@/colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const baseOptions: any = {
    title: "",
    headerBackButtonDisplayMode: "minimal",
    headerShadowVisible: false,
    headerTintColor: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    headerStyle: {
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
    },
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={baseOptions}/>
      <Stack.Screen name="settings" options={baseOptions}/>
      <Stack.Screen name="upload-file" options={baseOptions}/>
      <Stack.Screen name="upload-file-success" options={baseOptions}/>
      <Stack.Screen name="upload-file-transactions-preview" options={baseOptions}/>
      <Stack.Screen name="upload-file-transactions-preview-edition" options={baseOptions}/>
    </Stack>
  )
}
