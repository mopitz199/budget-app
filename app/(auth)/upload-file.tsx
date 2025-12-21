import { SelectorInput } from "@/components/inputs/SelectorInput";
import MainView from "@/components/MainView";
import { InputLabel, Text, Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, useColorScheme, View } from "react-native";
import { currencyOptions, formatDisplay, formatMask } from "@/utils/currencyUtil";
import CurrencyOption from "@/components/CurrencyOption";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import { globalStyles } from "@/global-styles";
import { colors } from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UploadFileScreen() {

  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  useHeaderBehavior({ loading: loading, headerShown: screenConf.headerShown });

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
      <Title style={{ marginBottom: 20 }}>Load your files</Title>
      <SelectorInput
        value={currency}
        placeholder="Select currency"
        options={currencyOptions}
        onOptionSelect={(option) => { setCurrency(option.value); }}
        optionComponent={(option) => {
          return (
            <CurrencyOption
              currentValue={currency}
              currencyOption={option}
            />
          )
        }}
        errorMessage={currencyError}
        labelMessage="Currency"
      />

      <View style={{ flex: 1 }}>
        <InputLabel>Files</InputLabel>
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: isDarkMode ? colors.dark.onBackground : colors.light.onBackground,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
          borderRadius: 4
        }}>
          <Ionicons
            name={'document'}
            size={100}
            color={isDarkMode ? colors.dark.primary : colors.light.primary}
          />
          <Text style={{ marginTop: 10 }}>Here you will see the image preview</Text>
        </View>
      </View>
      <SecondaryButton
        title="Select files"
        onPress={() => {console.log("Secondary button pressed")}}
        style={{ marginBottom: 20, marginTop: 20 }}
      />
      <PrincipalButton
        style={{ marginBottom: 20}}
        title="Done" onPress={
          () => {router.navigate('/(auth)/upload-file-transactions-preview')}
        }
      />
    </MainView>
  );
}