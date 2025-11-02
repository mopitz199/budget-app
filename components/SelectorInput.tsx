import { colors } from "@/colors";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { JSX, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";
import BottomHalfModal from "./BottomHalfModal";

type InputProps = {
  value?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string; extraInfo?: any }>;
  optionComponent: (option: { label: string; value: string; extraInfo?: any }) => JSX.Element;
  onOptionSelect: (option: { label: string; value: string; extraInfo?: any }) => void;
};

export function SelectorInput (
  {
    value = '',
    placeholder = 'Select an option',
    options = [],
    optionComponent,
    onOptionSelect,
  }: InputProps
) {

  const [open, setOpen] = useState(false);

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode});

  const getCurrentLabel = () => {
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : '';
  }

  const getTextColor = () => {
    if (value != '') {
      return isDarkMode ? colors.dark.onSurface : colors.light.onSurface;
    } else {
      return isDarkMode ? colors.dark.placeholder : colors.light.placeholder;
    }
  }

  const getOptionBackgroundColor = (option: { label: string; value: string }) => {
    if (value === option.value) {
      return isDarkMode ? colors.dark.primary : colors.light.primary;
    }else {
      return isDarkMode ? colors.dark.surface : colors.light.surface;
    }
  } 

  const buildModalContent = () => {
    return (
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <ScrollView>
          {options.map((option) => (
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
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: globalStyles.inputHeight,
        paddingHorizontal: globalStyles.inputPaddingHorizontal,
        justifyContent: 'space-between',
        borderColor: isDarkMode ? '' : colors.light.outline,
        borderWidth: isDarkMode ? 0 : 0.5,
        backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
        borderRadius: 8,
      }}
      onPress={() => {
        setOpen(true);
      }}
    >

      {buildModalContent()}

      <Text style={{
        fontSize: 16,
        color: getTextColor(),
      }}>
        {getCurrentLabel() || placeholder}
      </Text>
      <Ionicons
        name={'caret-down-outline'}
        size={globalStyles.inputRightIconSize}
        color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
      />
    </TouchableOpacity>
  )
}

type StyleParams = {
  isDarkMode: boolean;
  leftComponent?: () => JSX.Element;
  rightComponent?: () => JSX.Element;
  cursorPaddingLeft?: number;
};

function makeStyles({
  isDarkMode,
  rightComponent,
  leftComponent,
  cursorPaddingLeft,
}: StyleParams) {
  return StyleSheet.create({
    input: {
      borderColor: isDarkMode ? '' : colors.light.loadingBackground,
      borderWidth: isDarkMode ? 0 : 0.5,
      borderRadius: 8,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      margin: 0,
      height: 56,
      fontSize: 16,
      paddingRight: rightComponent!=undefined ? 50 : 12,
      paddingLeft: leftComponent!=undefined ? cursorPaddingLeft : 12,
    },
  });
}