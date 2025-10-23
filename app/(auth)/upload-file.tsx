import MainView from "@/components/MainView";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function UploadFileScreen() {
  const router = useRouter();

  const headerShown = true;

  return (
    <MainView headerShown={headerShown}>
      <Text>UploadFile Page</Text>
      <Button title="Go to UploadFileSuccess" onPress={() => router.navigate('/(auth)/upload-file-success')} />
    </MainView>
  );
}