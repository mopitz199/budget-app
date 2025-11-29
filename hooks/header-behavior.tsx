import { colors } from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NativeStackHeaderLeftProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, useColorScheme } from "react-native";

type Options = {
  headerShown: boolean;
  loading?: boolean;
  iconName?: any;
  onPressIconName?: () => void;
  navigationOptions?: Partial<NativeStackNavigationOptions>;
  backgroundColor?: string;
  headerTintColor?: string;
};

export function useHeaderBehavior({
  headerShown,
  loading = false,
  iconName = "",
  onPressIconName,
  navigationOptions,
  backgroundColor='',
  headerTintColor='',
}: Options) {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const getBackgroundColor = () => {
    return isDarkMode ? colors.dark.background : colors.light.background;
  }

  const getHeaderTintColor = () => {
    return isDarkMode ? colors.dark.onSurface : colors.light.onSurface;
  }

  let baseNavigationOptions: Partial<NativeStackNavigationOptions> = {
    title:"",
    headerBackButtonDisplayMode: "minimal",
    headerShadowVisible: false,
    headerShown: headerShown,
    headerBackVisible: !loading,
    gestureEnabled: !loading,
    headerTintColor: headerTintColor || getHeaderTintColor(),
    headerStyle: {
      backgroundColor: backgroundColor || getBackgroundColor(),
    },
  }

  // Merge navigationOptions, allowing them to override base options
  if (navigationOptions) {
    baseNavigationOptions = {
      ...baseNavigationOptions,
      ...navigationOptions,
    };
  }

  if(iconName!=""){
    if(loading){
      baseNavigationOptions.headerLeft = ({ tintColor }: NativeStackHeaderLeftProps) => null
    }else{
      baseNavigationOptions.headerLeft = ({ tintColor }: NativeStackHeaderLeftProps) => null
      baseNavigationOptions.headerRight = ({ tintColor }: NativeStackHeaderLeftProps) => {
        return (
          <Pressable onPress={() => {
            onPressIconName && onPressIconName();
          }}>
            <Ionicons name={iconName} size={32} color={tintColor} />
          </Pressable>
        )
      }
    }
    baseNavigationOptions.headerBackVisible = false;
  }

  useLayoutEffect(() => {
    navigation.setOptions(baseNavigationOptions);
  }, [navigation, loading]);

}