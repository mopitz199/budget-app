import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { Text } from "react-native";

export default function UploadFileTransactionsPreviewEditionScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();

  
  useHeaderBehavior({
    headerShown: screenConf.headerShown,
    iconName: "close-circle",
    onPressIconName: () => {
      router.back();
    },
    navigationOptions: { animation: "slide_from_bottom" }
  });

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>UploadFileTransactionsPreviewEdition Page</Text>
    </MainView>
  );
}