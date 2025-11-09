import { colors } from "@/colors";
import { AmountCurrencyInput } from "@/components/AmountCurrencyInput";
import CurrencyOption from "@/components/CurrencyOption";
import { Input } from "@/components/Input";
import MainView from "@/components/MainView";
import { PasswordInput } from "@/components/PasswordInput";
import { SelectorInput } from "@/components/SelectorInput";
import { Title } from "@/components/Text";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { currencyOptions, formatDisplay, formatMask } from "@/utils/currencyUtil";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, useColorScheme, View } from "react-native";

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
  const [showPassword, setShowPassword] = useState(false);
  const [currencyValue, setCurrencyValue] = useState('clp');

  return (
    <MainView headerShown={screenConf.headerShown}>



      <Title>Transaction</Title>
      <Button title="Go to Home" onPress={() => {router.replace('/(auth)/home')}} />
      <Button title="Go to Login" onPress={() => {router.replace('/login')}} />

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
      />

      <View style={{ marginVertical: 12 }}></View>

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Placeholder with no icons",
        }}
      />

      <View style={{ marginVertical: 12 }}></View>


      <PasswordInput
        value={text}
        onChangeValue={setText}
        placeholder="Placeholder password"
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
      />
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