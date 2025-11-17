import { PrincipalButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import MainView from "@/components/MainView";
import { Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, useColorScheme, View } from "react-native";

export default function RegisterScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  useHeaderBehavior({
    headerShown: screenConf.headerShown,
  });

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const { t, i18n } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = () => {
    // Handle login logic here
  };

  return (
    <MainView headerShown={screenConf.headerShown}>
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
            <PasswordInput
              style={styles.inputSpacing}
              value={repeatPassword}
              onChangeValue={setRepeatPassword}
              placeholder={t('repeatPassword')}
              //errorMessage="The amount must be greater than zero"
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