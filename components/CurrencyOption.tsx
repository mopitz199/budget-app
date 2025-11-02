import { colors } from "@/colors";
import { Image, Text, useColorScheme, View } from "react-native";

type CurrencyOptionProps = {
  currentValue: string;
  currencyOption: { label: string; value: string; extraInfo?: any };
};

export default function CurrencyOption({
  currentValue,
  currencyOption
}: CurrencyOptionProps) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const getOptionTextColor = () => {
    if (currentValue === currencyOption.value) {
      return colors.dark.onSurface
    }else {
      return isDarkMode ? colors.dark.onSurface : colors.light.onSurface;
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 0,
      }}
    >
      <Image
        style={{ width: 26, height: 26, marginRight: 8 }}
        source={currencyOption.extraInfo.flagImage}
      />
      <Text style={{
        fontSize: 16,
        color: getOptionTextColor(),
        paddingVertical: 12,
      }}>
        {currencyOption.label}
      </Text>
    </View>
  )
}