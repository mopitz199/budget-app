import { colors } from "@/colors";
import { PrincipalButton } from "@/components/Buttons";
import { ConfettiRef } from "@/components/Confetti";
import MainView from "@/components/MainView";
import { ConfirmationTitle, Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
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

  useHeaderBehavior({headerShown: screenConf.headerShown});

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
      <View style={styles.container}>
        <Ionicons
          name={ "checkmark-circle"}
          size={110}
          color={isDarkMode ? colors.light.primary : colors.dark.primary}
          style={styles.icon}
        />
        <ConfirmationTitle>{t('almostDone')}</ConfirmationTitle>
        <Text style={styles.description}>{t('weHaveSentYouVerificationLink')}</Text>
        <PrincipalButton style={{alignSelf: 'stretch'}} title="Sign out" onPress={() => {
          setLoading(true);
          signOut(auth).then(() => {
            setLoading(false);
            router.replace('/login');
          });
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
      transform: [{ translateY: -165 }],
    },
    description: {
      marginTop: 20,
      marginBottom: 40,
      textAlign: 'center',
    },
  });
}