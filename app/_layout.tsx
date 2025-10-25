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
      <Stack.Screen name="login" options={baseOptions}/>
      <Stack.Screen name="recover-account" options={baseOptions}/>
      <Stack.Screen name="register" options={baseOptions}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false, ...baseOptions }} />
    </Stack>
  )
}


