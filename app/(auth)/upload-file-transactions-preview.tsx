import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function UploadFileTransactionsPreviewScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();
  useHeaderBehavior({
    headerShown: screenConf.headerShown,
    iconName: "close-circle",
    onPressIconName: () => {
      router.replace('/home');
    }
  });

  return (
      <MainView headerShown={screenConf.headerShown}>
        <Text>UploadFileTransactionsPreview Page</Text>
        <Button title="Go to UploadFileSuccess" onPress={() => router.navigate('/(auth)/upload-file-success')} />
        <Button title="Go to UploadFileTransactionsPreviewEdition" onPress={() => router.navigate('/(auth)/upload-file-transactions-preview-edition')} />
    </MainView>
  );
}