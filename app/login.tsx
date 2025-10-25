import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function LoginScreen() {
  const screenConf: ScreenConf = {
    headerShown: false
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>Login Page</Text>
      <Button title="Go to Register Account" onPress={() => {router.navigate('/register')}} />
      <Button title="Go to Recover Account" onPress={() => {router.navigate('/recover-account')}} />
    </MainView>
  );
}