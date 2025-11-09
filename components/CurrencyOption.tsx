import { colors } from "@/colors";
import Text from "@/components/Text";
import { Image, StyleSheet, useColorScheme, View } from "react-native";

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
  const isSelected = currentValue == currencyOption.value;
  const styles = makeStyles({ isDarkMode, isSelected });

  return (
    <View style={styles.container}>
      <Image
        style={styles.flagImage}
        source={{
          uri: currencyOption.extraInfo.flagImage
        }}
      />
      <Text style={styles.label}>
        {currencyOption.label}
      </Text>
    </View>
  )
}

type StyleParams = {
  isDarkMode: boolean;
  isSelected: boolean;
};

function makeStyles({ isDarkMode, isSelected }: StyleParams) {
  const getOptionTextColor = () => {
    if (isSelected) {
      return colors.dark.onSurface
    } else {
      return isDarkMode ? colors.dark.onSurface : colors.light.onSurface;
    }
  }

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 0,
    },
    flagImage: {
      width: 26,
      height: 26,
      marginRight: 8,
    },
    label: {
      fontSize: 16,
      color: getOptionTextColor(),
      paddingVertical: 12,
    },
  });
}