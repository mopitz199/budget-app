import { colors } from "@/colors";
import { Input } from "@/components/Input";
import Text from "@/components/Text";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { JSX, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import BottomHalfModal from "./BottomHalfModal";

type InputProps = {
  amountValue?: string;
  placeholder?: string;
  currencyValue: string;
  onChangeValue?: (text: string) => void;
  currencyOptions?: Array<{ label: string; value: string, extraInfo?: any }>;
  optionComponent: (option: { label: string; value: string, extraInfo?: any }) => JSX.Element;
  onOptionSelect: (previousValue: string, option: { label: string; value: string, extraInfo?: any }) => void;
  errorMessage?: string;
};

export function AmountCurrencyInput (
  {
    amountValue = '',
    currencyValue = 'usd',
    placeholder = 'Enter amount',
    onChangeValue = () => {},
    currencyOptions = [],
    optionComponent,
    onOptionSelect,
    errorMessage = '',
  }: InputProps
){

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const [positive, setPositive] = useState(true);
  const [open, setOpen] = useState(false);
  const styles = makeStyles({isDarkMode});

  const getOptionBackgroundColor = (option: { label: string; value: string, extraInfo?: any }) => {
    if (currencyValue === option.value) {
      return isDarkMode ? colors.dark.primary : colors.light.primary;
    }else {
      return isDarkMode ? colors.dark.surface : colors.light.surface;
    }
  }

  const getCurrentInputLabel = () => {
    const selectedOption = currencyOptions.find(option => option.value === currencyValue);
    return selectedOption ? selectedOption.extraInfo.inputLabel : '';
  }

  const getCurrentFlag = () => {
    const selectedOption = currencyOptions.find(option => option.value === currencyValue);
    return selectedOption ? selectedOption.extraInfo.flagImage : '';
  }

  const buildModalContent = () => {
    return (
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <ScrollView>
          {currencyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={StyleSheet.compose(styles.currencyTouchableOption, {
                backgroundColor: getOptionBackgroundColor(option),
              })}
              onPress={() => {
                setOpen(false);
                onOptionSelect(currencyValue, option);
              }}
            >
              {optionComponent(option)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomHalfModal>
    )
  }

  return (
    <>
      {buildModalContent()}
      <Input
        textInputProps={{
          value: amountValue,
          onChangeText: onChangeValue,
          placeholder: placeholder,
        }}
        leftComponent={() => (
          <View style={styles.viewLeftComponent}>
            <Image
              style={styles.viewLeftImageComponent}
              source={{
                uri: getCurrentFlag(),
              }}
            />
            <Text style={styles.viewLeftTextComponent}>
              {getCurrentInputLabel()}
            </Text>
          </View>
        )}
        onLeftPress={() => setOpen(true)}
        cursorPaddingLeft={85+globalStyles.inputPaddingHorizontal}
        rightComponent={() => {

          const getColor = () => {
            if (positive) {
              return isDarkMode ? colors.dark.success : colors.light.success;
            } else {
              return isDarkMode ? colors.dark.error : colors.light.error;
            }
          }

          return (
            <View
              style={StyleSheet.compose(styles.viewRightComponent, {
                borderLeftColor: getColor(),
              })}
            >
              <Ionicons
                name={positive ? 'add-circle-outline' : 'remove-circle-outline'}
                size={globalStyles.inputRightIconSize}
                color={getColor()}
              />
            </View>
          )
        }}
        onRightPress={() => {
          setPositive(!positive);
        }}
        errorMessage={errorMessage}
      />
    </>
  )
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    currencyTouchableOption: {
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.outline : colors.light.outline,
    },
    viewLeftComponent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewLeftImageComponent: {
      width: 26,
      height: 26,
      marginRight: 8
    },
    viewLeftTextComponent: {
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      fontWeight: '500'
    },
    viewRightComponent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: globalStyles.inputPaddingHorizontal,
      borderLeftWidth: 1,
    },
    errorMessage: {
      marginTop: 4,
      color: isDarkMode ? colors.dark.error : colors.light.error
    }
  });
}