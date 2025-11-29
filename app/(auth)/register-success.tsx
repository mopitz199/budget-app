import { colors } from "@/colors";
import Confetti, { ConfettiRef } from "@/components/Confetti";
import MainView from "@/components/MainView";
import { ConfirmationTitle, Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useColorScheme, View } from "react-native";

export default function RegisterSuccessScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  const router = useRouter();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const confettiRef = useRef<ConfettiRef>(null);

  useHeaderBehavior({
    headerShown: screenConf.headerShown,
    iconName: "close-circle",
    navigationOptions: {
      animation: 'none',
    },
    onPressIconName: () => {
      router.replace('/');
    }
  });

  useEffect(() => {
    confettiRef.current?.startConfettiFromParent();
  }, []);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Confetti ref={confettiRef} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons
          name={ "checkmark-circle"}
          size={110}
          color={isDarkMode ? colors.light.primary : colors.dark.primary}
          style={{ position: 'absolute', transform: [{ translateY: -100 }] }}
        />
        <ConfirmationTitle>Awesome!</ConfirmationTitle>
        <Text style={{marginTop: 20}}>Your account has been created successfully.</Text>
      </View>
    </MainView>
  );
}