import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();

  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Splash</Text>
      <Button title="Go to Home" onPress={() => {router.replace('/(auth)/home')}} />
      <Button title="Go to Login" onPress={() => {router.replace('/login')}} />
    </View>
  );
}
