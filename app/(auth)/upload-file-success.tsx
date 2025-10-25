import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { Text } from "react-native";

export default function UploadFileSuccessScreen() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>UploadFileSuccess Page</Text>
    </MainView>
  );
}