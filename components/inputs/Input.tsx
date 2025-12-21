import { colors } from "@/colors";
import { InputLabel, Text } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { JSX } from "react";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

type InputProps = {
  leftComponent?: () => JSX.Element;
  onLeftPress?: () => void;
  rightComponent?: () => JSX.Element;
  onRightPress?: () => void;
  cursorPaddingLeft?: number;
  textInputProps?: object;
  errorMessage?: string;
  labelMessage?: string;
  style?: any;
};

export function Input (
  {
    leftComponent = undefined,
    onLeftPress = undefined,
    rightComponent = undefined,
    onRightPress = undefined,
    cursorPaddingLeft = 0,
    textInputProps = {},
    errorMessage = '',
    labelMessage = '',
    style = {},
  }: InputProps
) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode, leftComponent, rightComponent, cursorPaddingLeft });

  const buildLeftComponent = () => {
    return (
      <TouchableOpacity
        style={styles.leftComponent}
        onPress={() => {
          {onLeftPress && onLeftPress()}
        }}
      >
          {leftComponent != undefined && leftComponent()}
        </TouchableOpacity>
    )
  }

  const buildRightComponent = () => {
    return (
      <TouchableOpacity
        style={styles.rightComponent}
        onPress={() => {
          {onRightPress && onRightPress()}
        }}
      >
          {rightComponent != undefined && rightComponent()}
        </TouchableOpacity>
    )
  }

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {labelMessage !== '' && <InputLabel style={styles.labelMessage}>{labelMessage}</InputLabel>}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={isDarkMode ? colors.dark.placeholder : colors.light.placeholder}
          style={styles.input}
          {...textInputProps}
        />
        {leftComponent != undefined && buildLeftComponent()}
        {rightComponent != undefined && buildRightComponent()}
      </View>
      <Text style={styles.errorMessage}>
        {errorMessage}
      </Text>
    </View>
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
    container: {
      // borderColor: 'blue', borderWidth: 2
    },
    inputWrapper: {
      position: 'relative',
      width: "100%",
    },
    input: {
      borderColor: isDarkMode ? '' : colors.light.loadingBackground,
      borderWidth: isDarkMode ? 0 : 0.5,
      borderRadius: globalStyles.inputBorderRadius,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      margin: 0,
      height: globalStyles.inputHeight,
      fontSize: globalStyles.inputFontSize,
      fontFamily: globalStyles.fontFamily,
      paddingRight: rightComponent!=undefined ? 50 : globalStyles.inputPaddingHorizontal,
      paddingLeft: leftComponent!=undefined ? cursorPaddingLeft : globalStyles.inputPaddingHorizontal,
    },
    leftComponent: {
      flex: 1,
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      width: 85,
      borderColor: isDarkMode ? colors.dark.outline : colors.light.outline,
      borderRightWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightComponent: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      paddingRight: globalStyles.inputPaddingHorizontal,
      justifyContent: 'center',
    },
    errorMessage: {
      marginTop: 4,
      color: isDarkMode ? colors.dark.error : colors.light.error,
    },
    labelMessage: {
      marginBottom: 4
    }
  });
}