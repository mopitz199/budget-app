import MainView from "@/components/MainView";
import { Text } from "react-native";

export default function UploadFileSuccessScreen() {
  const headerShown = false;

  return (
    <MainView headerShown={headerShown}>
      <Text>UploadFileSuccess Page</Text>
    </MainView>
  );
}