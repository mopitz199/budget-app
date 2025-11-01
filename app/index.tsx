import { colors } from "@/colors";
import BottomHalfModal from "@/components/BottomHalfModal";
import { Input } from "@/components/Input";
import MainView from "@/components/MainView";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import chileFlag from "../assets/images/flags/chile.png";

export default function Index() {
  const screenConf: ScreenConf = {
    headerShown: false
  };
  const router = useRouter();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });
  
  const styles = makeStyles({ isDarkMode: isDarkMode });

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainView headerShown={screenConf.headerShown}>
      <BottomHalfModal visible={open} onClose={() => setOpen(false)}>
        <Text>
          Contenido aquí… Desliza hacia abajo o toca fuera para cerrar.
        </Text>
      </BottomHalfModal>

      <Text>Splash</Text>
      <Button title="Open Modal" onPress={() => {setOpen(true)} }/>
      <Button title="Go to Home" onPress={() => {router.replace('/(auth)/home')}} />
      <Button title="Go to Login" onPress={() => {router.replace('/login')}} />

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Monto en CLP",
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
              CLP
            </Text>
          </View>
        )}
        cursorPaddingLeft={93}
      />

      <View style={{ marginVertical: 12 }}></View>

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Placeholder with right icon",
        }}
        rightComponent={() => (
          <Ionicons
            name={'close-circle'}
            size={32}
            color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
          />
        )}
      />

      <View style={{ marginVertical: 12 }}></View>

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Placeholder with no icons",
        }}
      />

      <View style={{ marginVertical: 12 }}></View>

      <Input
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholder: "Placeholder password",
        }}
        rightComponent={() => (
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={32}
            color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
          />
        )}
        onRightPress={() => {setShowPassword(!showPassword)}}
      />

      <View style={{ marginVertical: 12 }}></View>

      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderWidth: isDarkMode ? 0 : 0.5,
        backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
        borderRadius: 8,
      }}>
        <Text style={{
          fontSize: 16,
          color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
        }}>
          Currency
        </Text>
        <Ionicons
          name={'caret-down-outline'}
          size={32}
          color={isDarkMode ? colors.dark.onSurface : colors.light.onSurface}
        />
      </TouchableOpacity>
    </MainView>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      padding: 20,
    },
  });
}