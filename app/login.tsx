import { GoogleButton, PrincipalButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import LoginLine from "@/components/LoginLine";
import MainView from "@/components/MainView";
import { LinkText, Text } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button, View } from "react-native";

export default function LoginScreen() {
  const screenConf: ScreenConf = {
    headerShown: false
  };

  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <MainView headerShown={screenConf.headerShown}>
      <View style={{ flex: 1, justifyContent: 'center', borderWidth: 4 }}>
        <Input
          textInputProps={{
            value: email,
            onChangeText: setEmail,
            placeholder: "Placeholder with no icons",
          }}
          errorMessage="The amount must be greater than zero"
          labelMessage="Label input"
        />
        <PasswordInput
          value={password}
          onChangeValue={setPassword}
          placeholder="Placeholder password"
          errorMessage="The amount must be greater than zero"
          labelMessage="Password input"
        />
      </View>
      <PrincipalButton title={t('logIn')} onPress={() => {router.replace('/(auth)/home')}} />
      <Text>{t('forgotPassword')}</Text>
      <LoginLine>or</LoginLine>
      <GoogleButton title={t('continueWithGoogle')} onPress={() => {router.replace('/login')}}/>
      <View>
        <Text>{t("doesNotHaveAnAccount")}</Text>
        <LinkText onPress={() => {router.navigate('/register')}}>{t("signUp")}</LinkText>
      </View>
      <Button title="Go to Register Account" onPress={() => {router.navigate('/register')}} />
      <Button title="Go to Recover Account" onPress={() => {router.navigate('/recover-account')}} />
    </MainView>
  );
}