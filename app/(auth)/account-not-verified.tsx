import { colors } from "@/colors";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import Confetti, { ConfettiRef } from "@/components/Confetti";
import MainView from "@/components/MainView";
import { ConfirmationTitle, Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function AccountNotVerifiedScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  const router = useRouter();
  const { t, i18n } = useTranslation();
  const theme = useColorScheme();
  const auth = getAuth()
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const [loading, setLoading] = useState(false);

  const confettiRef = useRef<ConfettiRef>(null);
  const params = useLocalSearchParams<{ enableConfetti: string }>();

  useHeaderBehavior({headerShown: screenConf.headerShown});

  useEffect(() => {
    if(params.enableConfetti !== 'false'){
      confettiRef.current?.startConfettiFromParent();
    }
  }, []);

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
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
        <SecondaryButton style={{alignSelf: 'stretch', marginBottom: 20}} title="Sign out" onPress={() => {
          setLoading(true);
          signOut(auth).then(() => {
            setLoading(false);
            router.replace('/login');
          });
        }} />
        <PrincipalButton style={{alignSelf: 'stretch'}} title="Verificate Again" onPress={() => {
          router.replace('/');
        }} />
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
      transform: [{ translateY: -195 }],
    },
    description: {
      marginTop: 20,
      marginBottom: 40,
      textAlign: 'center',
    },
  });
}