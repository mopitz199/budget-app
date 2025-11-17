import { GoogleButton, PrincipalButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import LoginLine from "@/components/LoginLine";
import MainView from "@/components/MainView";
import { LinkText, Text, Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const screenConf: ScreenConf = {
    headerShown: false
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    router.replace('/(auth)/home')
  };

  return (
    <MainView headerShown={screenConf.headerShown}>
      <View style={{ flex: 1, borderWidth: 0}}>
        <ScrollView style={{ paddingTop: '20%' }}>
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
          <PrincipalButton style={{ marginTop: 40 }} title={t('logIn')} onPress={handleLogin} />
          <TouchableOpacity onPress={() => {router.navigate('/recover-account')}}>
            <Text style={{ marginTop: 10, alignSelf: 'flex-end' }}>{t('forgotPassword')}</Text>
          </TouchableOpacity>
          <LoginLine style={{marginVertical: 10}}>or</LoginLine>
          <GoogleButton title={t('continueWithGoogle')} onPress={() => {router.replace('/login')}}/>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 10 }}>
            <Text>{t("doesNotHaveAnAccount")}</Text>
            <LinkText onPress={() => {router.navigate('/register')}}>{t("signUp")}</LinkText>
          </View>
        </ScrollView>
      </View>
    </MainView>
  );
}