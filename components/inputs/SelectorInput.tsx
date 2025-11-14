import { colors } from "@/colors";
import { Text } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { JSX, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import BottomHalfModal from "../BottomHalfModal";

type InputProps = {
  value?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string; extraInfo?: any }>;
  optionComponent: (option: { label: string; value: string; extraInfo?: any }) => JSX.Element;
  onOptionSelect: (option: { label: string; value: string; extraInfo?: any }) => void;
  errorMessage?: string;
  labelMessage?: string;
};

export function SelectorInput (
  {
    value = '',
    placeholder = 'Select an option',
    options = [],
    optionComponent,
    onOptionSelect,
    errorMessage = '',
    labelMessage = '',
  }: InputProps
) {

  const [open, setOpen] = useState(false);

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });

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
              style={StyleSheet.compose(styles.optionItem, { backgroundColor: getOptionBackgroundColor(option)})}
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
      {labelMessage !== '' && <Text style={styles.labelMessage}>{labelMessage}</Text>}
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setOpen(true);
        }}
      >

        {buildModalContent()}

        <Text style={StyleSheet.compose(styles.inputText, { color: getTextColor() })}>
          {getCurrentLabel() || placeholder}
        </Text>
        <Ionicons
          name={'caret-down-outline'}
          size={globalStyles.inputRightIconSize}
          color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
        />
      </TouchableOpacity>
      <Text style={styles.errorMessage}>
        {errorMessage}
      </Text>
    </>
  )
}

type StyleParams = {
  isDarkMode: boolean
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: globalStyles.inputHeight,
      paddingHorizontal: globalStyles.inputPaddingHorizontal,
      justifyContent: 'space-between',
      borderColor: isDarkMode ? '' : colors.light.outline,
      borderWidth: isDarkMode ? 0 : 0.5,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      borderRadius: globalStyles.inputBorderRadius,
    },
    optionItem: {
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.outline : colors.light.outline,
    },
    inputText: {
      fontSize: globalStyles.inputFontSize,
    },
    errorMessage: {
      marginTop: 4,
      color: isDarkMode ? colors.dark.error : colors.light.error,
    },
    labelMessage: {
      marginBottom: 4,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    }
  });
}