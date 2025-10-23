import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function UploadFileTransactionsPreviewScreen() {
  const headerShown = false;

  return (
    <MainView headerShown={headerShown}>
      <Text>UploadFileTransactionsPreview Page</Text>
    </MainView>
  );
}