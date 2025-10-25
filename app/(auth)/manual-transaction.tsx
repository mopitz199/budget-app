import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { Text } from "react-native";

export default function ManualTransactionScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>ManualTransaction Page</Text>
    </MainView>
  );
}