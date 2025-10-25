import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";
import { ScreenConf } from "../types/screen-conf";

export default function Index() {

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Splash</Text>
      <Button title="Go to Home" onPress={() => {
        router.replace('/(auth)/home')
      }} />
    </View>
  );
}
