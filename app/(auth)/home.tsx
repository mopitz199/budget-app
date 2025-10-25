import MainView from "@/components/MainView";
import { ScreenConf } from "@/types/screen-conf";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Button, Text } from "react-native";

export default function HomeScreen() {

  const screenConf: ScreenConf = {
    headerShown: false,
    navigation: useNavigation()
  };

  const router = useRouter();

  useLayoutEffect(() => {
    screenConf.navigation.setOptions({
      headerShown: screenConf.headerShown,
    });
  }, [screenConf.navigation]);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>Home Page</Text>
      <Button title="Go to UploadFile" onPress={() => router.navigate('/(auth)/upload-file')} />
    </MainView>
  );
}