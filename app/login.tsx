import { Alert } from "@/components/Alert";
import { GoogleButton, PrincipalButton, SecondaryButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import LoginLine from "@/components/LoginLine";
import MainView from "@/components/MainView";
import { LinkText, Text, Title } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { getCrashlytics, recordError } from "@react-native-firebase/crashlytics";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from "expo-router";
import { FirebaseError } from 'firebase/app';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";


export default function LoginScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEBCLIENTID,
  });

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const { t, i18n } = useTranslation();
  const auth = getAuth()
  const crashlyticsInstance = getCrashlytics();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const handleLogin = () => {
    signIn();
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Only navigate on successful login
      router.replace('/(auth)/home');
    } catch (e: any) {
      const err = e as FirebaseError;
      recordError(crashlyticsInstance, new Error('error_email_password_signin: ' + err.message));
      displayAlert(t('error'), t('errorUnableToLoginPleaseCheckCredentials'));
    } finally {
      setLoading(false);
    }
  }

  const displayAlert = (title: string, message: string) => {
    setTitleAlert(title);
    setMessageAlert(message);
    setShowAlert(true);
  }

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    } catch (err) {
      recordError(crashlyticsInstance, new Error('error_google_play_services: ' + err));
      setLoading(false);
    }

    // Trigger Google sign-in flow
    try {
      let signInResult = await GoogleSignin.signIn();
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        recordError(crashlyticsInstance, new Error('error_google_token_not_found: Token is null'));
        setLoading(false);
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      try{
        await signInWithCredential(auth, googleCredential);
      }catch (error) {
        recordError(crashlyticsInstance, new Error('error_sign_in_with_credential: ' + error));
        setLoading(false);
      }
    }catch (error) {
      recordError(crashlyticsInstance, new Error('error_google_signin_flow: ' + error));
      setLoading(false);
    }
    setLoading(false);
    router.replace('/')
  }

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>

      <Alert
        title={titleAlert}
        message={messageAlert}
        leftButton={
          <SecondaryButton style={{ height: globalStyles.alertButtonHeight }} title={t('close')} onPress={() => {
            setShowAlert(false);
          }}/>
        }
        visible={showAlert}
      />

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
      //paddingTop: 40,
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