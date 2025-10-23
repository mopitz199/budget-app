import MainView from "@/components/MainView";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Button, Text } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const headerShown = false;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerShown,
    });
  }, [navigation]);

  return (
    <MainView headerShown={headerShown}>
      <Text>Home Page</Text>
      <Button title="Go to UploadFile" onPress={() => router.navigate('/(auth)/upload-file')} />
    </MainView>
  );
}