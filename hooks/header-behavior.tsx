import { colors } from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  NativeStackHeaderLeftProps,
  NativeStackNavigationOptions
} from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { useColorScheme } from "react-native";

type Options = {
  headerShown: boolean;
  loading?: boolean;
  iconName?: any;
};

export function useHeaderBehavior({ headerShown, loading = false, iconName = "" }: Options) {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const getBackgroundColor = () => {
    return isDarkMode ? colors.dark.background : colors.light.background;
  }

  let baseNavigationOptions: Partial<NativeStackNavigationOptions> = {
    title:"",
    headerBackButtonDisplayMode: "minimal",
    headerShadowVisible: false,
    headerShown: headerShown,
    headerBackVisible: !loading,
    gestureEnabled: !loading,
    headerTintColor: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
    headerStyle: {
      backgroundColor: getBackgroundColor(),
    },
  }

  if(iconName!=""){
    if(loading){
      baseNavigationOptions.headerLeft = ({ tintColor }: NativeStackHeaderLeftProps) => null
    }else{
      baseNavigationOptions.headerLeft = ({ tintColor }: NativeStackHeaderLeftProps) => (
        <Ionicons name={iconName} size={32} color={tintColor} />
      );
    }
    baseNavigationOptions.headerBackVisible = false;
  }

  useLayoutEffect(() => {
    navigation.setOptions(baseNavigationOptions);
  }, [navigation, loading]);

}