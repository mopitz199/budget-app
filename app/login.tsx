import { GoogleButton, PrincipalButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import LoginLine from "@/components/LoginLine";
import MainView from "@/components/MainView";
import { LinkText, Text, Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";

export default function LoginScreen() {
  const screenConf: ScreenConf = {
    headerShown: false
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  GoogleSignin.configure({
    webClientId: '',
  });

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    router.replace('/(auth)/home')
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Trigger Google sign-in flow
    const signInResult = await GoogleSignin.signIn();

    // Get tokens (idToken is returned from getTokens())
    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  }

  return (
    <MainView headerShown={screenConf.headerShown}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Title style={styles.titleText}>{t('isTimeForSaving')}</Title>
            <Image
              source={require('@/assets/images/squirrle.png')}
              style={styles.squirrelImage}
            />
          </View>
          <Input
            textInputProps={{
              value: email,
              onChangeText: setEmail,
              placeholder: t('enterYourEmail'),
              autoCapitalize: "none"
            }}
            //errorMessage="The amount must be greater than zero"
            labelMessage={t('email')}
          />
          <PasswordInput
            style={styles.inputSpacing}
            value={password}
            onChangeValue={setPassword}
            placeholder={t('enterYourPassword')}
            //errorMessage="The amount must be greater than zero"
            labelMessage={t('password')}
          />
          <PrincipalButton style={styles.loginButton} title={t('logIn')} onPress={handleLogin} />
          <TouchableOpacity onPress={() => {router.navigate('/recover-account')}}>
            <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
          </TouchableOpacity>
          <LoginLine style={styles.loginLine}>or</LoginLine>
          <GoogleButton title={t('continueWithGoogle')} onPress={
            onGoogleButtonPress
          }/>
          <View style={styles.signUpContainer}>
            <Text>{t("doesNotHaveAnAccount")}</Text>
            <LinkText onPress={() => {router.navigate('/register')}}>{t("signUp")}</LinkText>
          </View>
        </ScrollView>
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
    },
    scrollView: {
      paddingTop: 40,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: 40,
    },
    titleText: {
      marginRight: 8,
    },
    squirrelImage: {
      width: 50 * (86 / 100),
      height: 50,
    },
    inputSpacing: {
      marginTop: 20,
    },
    loginButton: {
      marginTop: 40,
    },
    forgotPasswordText: {
      marginTop: 10,
      alignSelf: 'flex-end',
    },
    loginLine: {
      marginVertical: 10,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginTop: 10,
    },
  });
}