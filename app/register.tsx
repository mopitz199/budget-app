import { colors } from "@/colors";
import { PrincipalButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import MainView from "@/components/MainView";
import { Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function RegisterScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };

  useHeaderBehavior({
    headerShown: screenConf.headerShown,
    backgroundColor: colors.light.primary,
    headerTintColor: colors.light.onPrimary
  });

  const { t, i18n } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = () => {
    // Handle login logic here
  };

  return (
    <MainView headerShown={screenConf.headerShown}>
      <LinearGradient
        colors={[colors.light.primary, colors.light.background]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
        }}
      />
      <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={screenConf.headerShown ? 100 : 0}
        >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <ScrollView style={{}}>
              <Image
                source={require('@/assets/images/squirrle.png')}
                style={{ marginBottom: 20, alignSelf: 'center', height: 50 }}
                resizeMode="contain"
              />
              <Title style={{ alignSelf: 'center', marginBottom: 40 }}>{t('isTimeForSaving')}</Title>
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
                style={{marginTop: 20}}
                value={password}
                onChangeValue={setPassword}
                placeholder={t('enterYourPassword')}
                //errorMessage="The amount must be greater than zero"
                labelMessage={t('password')}
              />
                <PasswordInput
                  style={{marginTop: 20}}
                  value={repeatPassword}
                  onChangeValue={setRepeatPassword}
                  placeholder={t('repeatPassword')}
                  //errorMessage="The amount must be greater than zero"
                  labelMessage={t('repeatPassword')}
                />
              <PrincipalButton style={{ marginTop: 40 }} title={t('logIn')} onPress={handleRegister} />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainView>
  );
}