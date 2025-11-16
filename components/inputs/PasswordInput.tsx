import { colors } from "@/colors";
import { Input } from "@/components/inputs/Input";
import { globalStyles } from "@/global-styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useColorScheme } from "react-native";

type InputProps = {
  value: string;
  placeholder?: string;
  onChangeValue: (text: string) => void;
  errorMessage?: string;
  labelMessage?: string;
  style?: any;
}

export function PasswordInput (
  { value = '',
    placeholder = '',
    onChangeValue,
    errorMessage = '',
    labelMessage = '',
    style = {},
  }: InputProps
){

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      textInputProps={{
        value: value,
        onChangeText: onChangeValue,
        placeholder: placeholder,
        secureTextEntry: !showPassword,
      }}
      rightComponent={() => (
        <Ionicons
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          size={globalStyles.inputRightIconSize}
          color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
        />
      )}
      onRightPress={() => {setShowPassword(!showPassword)}}
      errorMessage={errorMessage}
      labelMessage={labelMessage}
      style={style}
    />
  )
}