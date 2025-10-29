import { colors } from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";

export function Input (
  { onChangeText, value }: { onChangeText: (text: string) => void; value: string }
) {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const style = makeStyles({ isDarkMode });

  return (
    <View style={{
      // borderColor: 'blue', borderWidth: 2
    }}>
      <View style={{
        position: 'relative',
        width: "100%",
        // borderColor: 'red', borderWidth: 2
      }}>
        <TextInput
          onChangeText={onChangeText}
          style={style.input}
          value={value}
        />
        <TouchableOpacity style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          top: 0,
          paddingRight: 10,
          paddingTop: 3,
          paddingBottom: 3,
          //borderColor: 'green', borderWidth: 2,
          justifyContent: 'center',
        }}>
          <Ionicons
            name={'close-circle'}
            size={32}
            color={'red'}
          />
        </TouchableOpacity>        
      </View>
    </View>
  )
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({ isDarkMode }: StyleParams) {
  return StyleSheet.create({
    input: {
      borderColor: isDarkMode ? '' : colors.light.loadingBackground,
      borderWidth: 0.5,
      borderRadius: 8,
      color: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      backgroundColor: isDarkMode ? colors.dark.surface : colors.light.surface,
      margin: 0,
      height: 56,
      fontSize: 16,
      //lineHeight: 40,
      paddingHorizontal: 16,
      paddingVertical: 12,  
    },
  });
}