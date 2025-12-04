import { colors } from "@/colors";
import Confetti, { ConfettiRef } from "@/components/Confetti";
import MainView from "@/components/MainView";
import { ConfirmationTitle, Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function RegisterSuccessScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  const router = useRouter();
  const { t, i18n } = useTranslation();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

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

      <View style={styles.container}>
        <Ionicons
          name={ "checkmark-circle"}
          size={110}
          color={isDarkMode ? colors.light.primary : colors.dark.primary}
          style={styles.icon}
        />
        <ConfirmationTitle>{t('almostDone')}</ConfirmationTitle>
        <Text style={styles.description}>{t('weHaveSentYouVerificationLink')}</Text>
      </View>
    </MainView>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({
  isDarkMode,
}: StyleParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      position: 'absolute',
      transform: [{ translateY: -100 }],
    },
    description: {
      marginTop: 20,
      textAlign: 'center',
    },
  });
}