import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function HomeScreen() {

  const screenConf: ScreenConf = {
    headerShown: false
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>Home Page</Text>
      <Button title="Go to UploadFile" onPress={() => router.navigate('/(auth)/upload-file')} />
      <Button title="Go to Manual Transaction" onPress={() => router.navigate('/(auth)/manual-transaction')} />
      <Button title="Go to Settings" onPress={() => router.navigate('/(auth)/settings')} />
      <Button title="Go to Transactions" onPress={() => router.navigate('/(auth)/transactions')} />
    </MainView>
  );
}