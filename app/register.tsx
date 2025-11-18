import { Alert } from "@/components/Alert";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import MainView from "@/components/MainView";
import { Title } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme, View } from "react-native";

export default function RegisterScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  useHeaderBehavior({ headerShown: screenConf.headerShown })

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const { t, i18n } = useTranslation();
  const auth = getAuth()


  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const checkPasswordRequirements = () => {
    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);

    const valid = hasMinLength && hasNumber && (hasLower || hasUpper);
    return valid
  }

  const checkPasswordsMatch = () => {
    return password === repeatPassword;
  }

  const checkEmail = () => {
    return email.includes('@');
  }

  const handleValidations = () => {
    let isValid = true;
    if (!checkPasswordRequirements()) {
      setPasswordError(t('invalidPassword'));
      isValid = false;
    }else{
      setPasswordError('');
    }

    if (!checkPasswordsMatch()) {
      setRepeatPasswordError(t('invalidRepeatedPassword'));
      isValid = false;
    }else{
      setRepeatPasswordError('');
    }
    
    if (!checkEmail()) {
      setEmailError(t('invalidEmail'));
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid
  };

  const handleRegister = async () => {
    const isValid = handleValidations();
    if(isValid){
      try {
        if(1==1){
          throw new Error('Probando el test crashlytics');
        }
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        try {          
          sendEmailVerification(user);
        } catch (error) {

          setAlertTitle(t('error'));
          setAlertMessage(t('errorSendingVerificationEmail'));
          setShowAlert(true);

          crashlytics().log('error_sending_email_verification: ' + error);
          crashlytics().crash()
        }
      } catch (error: any) {        

        if (error.code === 'auth/email-already-in-use') {
          setAlertTitle(t('error'));
          setAlertMessage(t('emailAlreadyInUse'));
          setShowAlert(true);
        } else if (error.code === 'auth/invalid-email') {
          setAlertTitle(t('error'));
          setAlertMessage(t('invalidEmail'));
          setShowAlert(true);
          console.log('That email address is invalid!');
        } else {
          setAlertTitle(t('error'));
          setAlertMessage(t('errorCreatingUser'));
          setShowAlert(true);
          crashlytics().log('error_creating_user: ' + error);
          crashlytics().crash()
        }

        console.error(error);
      }
    }
  }

  return (
    <MainView headerShown={screenConf.headerShown}>

      <Alert
        title={alertTitle}
        message={alertMessage}
        leftButton={
          <SecondaryButton style={{ height: globalStyles.alertButtonHeight }} title="Ok" onPress={() => {
            setShowAlert(false);
          }}/>
        }
        visible={showAlert}
      />
      

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={screenConf.headerShown ? 120 : 0}
      >
        <ScrollView>
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
            errorMessage={emailError}
            labelMessage={t('email')}
          />
          <PasswordInput
            style={styles.inputSpacing}
            value={password}
            onChangeValue={setPassword}
            placeholder={t('enterYourPassword')}
            errorMessage={passwordError}
            labelMessage={t('password')}
          />
            <PasswordInput
              style={styles.inputSpacing}
              value={repeatPassword}
              onChangeValue={setRepeatPassword}
              placeholder={t('repeatPassword')}
              errorMessage={repeatPasswordError}
              labelMessage={t('repeatPassword')}
            />
          <PrincipalButton style={styles.registerButton} title={t('signUp')} onPress={handleRegister} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
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
    registerButton: {
      marginTop: 40,
    },
  });
}