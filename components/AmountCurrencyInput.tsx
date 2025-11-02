import chileFlag from "@/assets/images/flags/chile.png";
import { colors } from "@/colors";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { JSX, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import BottomHalfModal from "./BottomHalfModal";
import { Input } from "./Input";

type InputProps = {
  value?: string;
  placeholder?: string;
  currencyValue: string;
  onChangeText?: (text: string) => void;
  currencyOptions?: Array<{ label: string; value: string, extraInfo?: any }>;
  optionComponent: (option: { label: string; value: string, extraInfo?: any }) => JSX.Element;
  onOptionSelect: (option: { label: string; value: string, extraInfo?: any }) => void;
};

export function AmountCurrencyInput (
  {
    value = '',
    currencyValue = 'clp',
    placeholder = 'Enter amount',
    onChangeText = () => {},
    currencyOptions = [],
    optionComponent,
    onOptionSelect,
  }: InputProps
){

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const [positive, setPositive] = useState(true);
  const [open, setOpen] = useState(false);

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

  const buildModalContent = () => {
    return (
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <ScrollView>
          {currencyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={{
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                backgroundColor: getOptionBackgroundColor(option),
                borderBottomColor: isDarkMode ? colors.dark.outline : colors.light.outline,
              }}
              onPress={() => {
                setOpen(false);
                onOptionSelect(option);
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
          value: value,
          onChangeText: onChangeText,
          placeholder: placeholder,
        }}
        leftComponent={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 26, height: 26, marginRight: 8 }}
              source={chileFlag}
            />
            <Text style={{
              color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
              fontFamily: 'Roboto', fontWeight: '500'
            }}>
              {getCurrentInputLabel()}
            </Text>
          </View>
        )}
        onLeftPress={() => setOpen(true)}
        cursorPaddingLeft={(61+(globalStyles.inputPaddingHorizontal*2))+globalStyles.inputPaddingHorizontal}
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
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftColor: getColor(),
                paddingLeft: globalStyles.inputPaddingHorizontal,
                borderLeftWidth: 1,
              }}
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
      />
    </>
  )
}