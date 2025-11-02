import { colors } from "@/colors";
import { AmountCurrencyInput } from "@/components/AmountCurrencyInput";
import BottomHalfModal from "@/components/BottomHalfModal";
import CurrencyOption from "@/components/CurrencyOption";
import { Input } from "@/components/Input";
import MainView from "@/components/MainView";
import { SelectorInput } from "@/components/SelectorInput";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, useColorScheme, View } from "react-native";
import chileFlag from "../assets/images/flags/chile.png";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const styles = makeStyles({ isDarkMode: isDarkMode });

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currencyValue, setCurrencyValue] = useState('clp');

  return (
    <MainView headerShown={screenConf.headerShown}>
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <Text>
          Contenido aquí… Desliza hacia abajo o toca fuera para cerrar.
        </Text>
      </BottomHalfModal>

      <Text>Splash</Text>
      <Button title="Open Modal" onPress={() => {setOpen(true)} }/>
      <Button title="Go to Home" onPress={() => {router.replace('/(auth)/home')}} />
      <Button title="Go to Login" onPress={() => {router.replace('/login')}} />

      <AmountCurrencyInput
        value={text}
        currencyValue={currencyValue}
        placeholder="Monto en CLP"
        onChangeText={setText}
        currencyOptions={[
          {
              label: 'Chilean Peso (CLP)',
              value: 'clp',
              extraInfo: {
                inputLabel: 'CLP',
                flagImage: chileFlag
              }
          },
          { label: 'US Dollar (USD)', value: 'usd', extraInfo: { inputLabel: 'USD', flagImage: chileFlag } },
          { label: 'Euro (EUR)', value: 'eur', extraInfo: { inputLabel: 'EUR', flagImage: chileFlag } },
          { label: 'Japanese Yen (JPY)', value: 'jpy', extraInfo: { inputLabel: 'JPY', flagImage: chileFlag } },
          { label: 'British Pound (GBP)', value: 'gbp', extraInfo: { inputLabel: 'GBP', flagImage: chileFlag } },
          { label: 'Australian Dollar (AUD)', value: 'aud', extraInfo: { inputLabel: 'AUD', flagImage: chileFlag } },
          { label: 'Canadian Dollar (CAD)', value: 'cad', extraInfo: { inputLabel: 'CAD', flagImage: chileFlag } },
          { label: 'Swiss Franc (CHF)', value: 'chf', extraInfo: { inputLabel: 'CHF', flagImage: chileFlag } },
          { label: 'Chinese Yuan (CNY)', value: 'cny', extraInfo: { inputLabel: 'CNY', flagImage: chileFlag } },
          { label: 'Swedish Krona (SEK)', value: 'sek', extraInfo: { inputLabel: 'SEK', flagImage: chileFlag } },
        ]}
        onOptionSelect={(option) => { setCurrencyValue(option.value); }}
        optionComponent={(option) => {
          return (
            <CurrencyOption
              currentValue={text}
              currencyOption={option}
            />
          )
        }}
      />

      <View style={{ marginVertical: 12 }}></View>

      <Input
        textInputProps={{
          value: text,
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

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Placeholder password",
        }}
        rightComponent={() => (
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={globalStyles.inputRightIconSize}
            color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
          />
        )}
        onRightPress={() => {setShowPassword(!showPassword)}}
      />

      <View style={{ marginVertical: 12 }}></View>

      <SelectorInput
        value={text}
        placeholder="Select currency"
        options={[
          {
              label: 'Chilean Peso (CLP)',
              value: 'clp',
              extraInfo: {
                inputLabel: 'CLP',
                flagImage: chileFlag
              }
          },
          { label: 'US Dollar (USD)', value: 'usd', extraInfo: { inputLabel: 'USD', flagImage: chileFlag } },
          { label: 'Euro (EUR)', value: 'eur', extraInfo: { inputLabel: 'EUR', flagImage: chileFlag } },
          { label: 'Japanese Yen (JPY)', value: 'jpy', extraInfo: { inputLabel: 'JPY', flagImage: chileFlag } },
          { label: 'British Pound (GBP)', value: 'gbp', extraInfo: { inputLabel: 'GBP', flagImage: chileFlag } },
          { label: 'Australian Dollar (AUD)', value: 'aud', extraInfo: { inputLabel: 'AUD', flagImage: chileFlag } },
          { label: 'Canadian Dollar (CAD)', value: 'cad', extraInfo: { inputLabel: 'CAD', flagImage: chileFlag } },
          { label: 'Swiss Franc (CHF)', value: 'chf', extraInfo: { inputLabel: 'CHF', flagImage: chileFlag } },
          { label: 'Chinese Yuan (CNY)', value: 'cny', extraInfo: { inputLabel: 'CNY', flagImage: chileFlag } },
          { label: 'Swedish Krona (SEK)', value: 'sek', extraInfo: { inputLabel: 'SEK', flagImage: chileFlag } },
        ]}
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