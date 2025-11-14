import { colors } from "@/colors";
import { GoogleButton, PrincipalButton, SecondaryButton } from "@/components/Buttons";
import CurrencyOption from "@/components/CurrencyOption";
import { AmountCurrencyInput } from "@/components/inputs/AmountCurrencyInput";
import { Input } from "@/components/inputs/Input";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { SelectorInput } from "@/components/inputs/SelectorInput";
import MainView from "@/components/MainView";
import { Text, Title } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { currencyOptions, formatDisplay, formatMask } from "@/utils/currencyUtil";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const styles = makeStyles({ isDarkMode: isDarkMode });

  const [text, setText] = useState("");
  const [currencyValue, setCurrencyValue] = useState('clp');

  return (
    <MainView headerShown={screenConf.headerShown}>

      <ScrollView>
        <Title>Main title</Title>
        <Text>Regular text</Text>

        <View style={{ marginVertical: 12 }}></View>
        
        <AmountCurrencyInput
          amountValue={text}
          currencyValue={currencyValue}
          placeholder="Monto en CLP"
          onChangeValue={(value) => {
            setText(formatDisplay(formatMask(value, currencyValue) as string, currencyValue));
          }}
          currencyOptions={currencyOptions}
          onOptionSelect={(previousValue, option) => {
            setText(formatDisplay(formatMask(text, previousValue) as string, option.value));
            setCurrencyValue(option.value);
          }}
          optionComponent={(option) => {
            return (
              <CurrencyOption
                currentValue={currencyValue}
                currencyOption={option}
              />
            )
          }}
          errorMessage="The amount must be greater than zero"
          labelMessage="Selector input"
        />

        <View style={{ marginVertical: 12 }}></View>

        <Input
          textInputProps={{
            value: formatMask(text, currencyValue, true).toString(),
            onChangeText: setText,
            placeholder: "Placeholder with right icon",
          }}
          rightComponent={() => (
            <Ionicons
              name={'close-circle'}
              size={globalStyles.inputRightIconSize}
              color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
            />
          )}
          errorMessage="The amount must be greater than zero"
          labelMessage="Label input"
        />

        <View style={{ marginVertical: 12 }}></View>

        <Input
          textInputProps={{
            value: text,
            onChangeText: setText,
            placeholder: "Placeholder with no icons",
          }}
          errorMessage="The amount must be greater than zero"
          labelMessage="Label input"
        />

        <View style={{ marginVertical: 12 }}></View>


        <PasswordInput
          value={text}
          onChangeValue={setText}
          placeholder="Placeholder password"
          errorMessage="The amount must be greater than zero"
          labelMessage="Password input"
        />

        <View style={{ marginVertical: 12 }}></View>

        <SelectorInput
          value={text}
          placeholder="Select currency"
          options={currencyOptions}
          onOptionSelect={(option) => { setText(option.value); }}
          optionComponent={(option) => {
            return (
              <CurrencyOption
                currentValue={text}
                currencyOption={option}
              />
            )
          }}
          errorMessage="The amount must be greater than zero"
          labelMessage="Selector input"
        />

        <View style={{ marginVertical: 12 }}></View>

        <PrincipalButton title="Primary" onPress={() => {router.replace('/(auth)/home')}} />

        <View style={{ marginVertical: 12 }}></View>

        <SecondaryButton title="Secondary" onPress={() => {router.replace('/login')}}/>

        <View style={{ marginVertical: 12 }}></View>

        <GoogleButton title="Continue with Google" onPress={() => {router.replace('/login')}}/>

      </ScrollView>

      
    </MainView>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      padding: 20,
    },
  });
}