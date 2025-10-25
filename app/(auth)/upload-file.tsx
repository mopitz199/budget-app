import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text } from "react-native";

export default function UploadFileScreen() {

  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  useHeaderBehavior({ loading: loading, headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
      <Text>UploadFile Page</Text>
      <Button title="Enable Load" onPress={() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 3000);
      }} />
      <Button title="Disable Load" onPress={() => setLoading(false)} />
      <Button title="Go to UploadFileTransactionsPreview" onPress={() => router.navigate('/(auth)/upload-file-transactions-preview')} />
    </MainView>
  );
}