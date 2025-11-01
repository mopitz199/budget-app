import { colors } from "@/colors";
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
};

export function Input (
  {
    leftComponent = undefined,
    onLeftPress = undefined,
    rightComponent = undefined,
    onRightPress = undefined,
    cursorPaddingLeft = 0,
    textInputProps = {},
  }: InputProps
) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode, leftComponent, rightComponent, cursorPaddingLeft });

  const buildLeftComponent = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          top: 0,
          paddingHorizontal: globalStyles.inputPaddingHorizontal,
          paddingTop: 3,
          paddingBottom: 3,
          borderColor: isDarkMode ? colors.dark.outline : colors.light.outline,
          borderRightWidth: 1,
          justifyContent: 'center',
        }}
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
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          top: 0,
          paddingRight: globalStyles.inputPaddingHorizontal,
          justifyContent: 'center',
        }}
        onPress={() => {
          {onRightPress && onRightPress()}
        }}
      >
          {rightComponent != undefined && rightComponent()}
        </TouchableOpacity>
    )
  }

  return (
    <View style={{
      // borderColor: 'blue', borderWidth: 2
    }}>
      <View style={{
        position: 'relative',
        width: "100%",
      }}>
        <TextInput
          placeholderTextColor={isDarkMode ? colors.dark.placeholder : colors.light.placeholder}
          style={style.input}
          {...textInputProps}
        />
        {leftComponent != undefined && buildLeftComponent()}
        {rightComponent != undefined && buildRightComponent()}
      </View>
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
    input: {
      borderColor: isDarkMode ? '' : colors.light.loadingBackground,
      borderWidth: isDarkMode ? 0 : 0.5,
      borderRadius: 8,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      margin: 0,
      height: globalStyles.inputHeight,
      fontSize: 16,
      paddingRight: rightComponent!=undefined ? 50 : globalStyles.inputPaddingHorizontal,
      paddingLeft: leftComponent!=undefined ? cursorPaddingLeft : globalStyles.inputPaddingHorizontal,
    },
  });
}