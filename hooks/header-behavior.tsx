import { colors } from "@/colors";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { useColorScheme } from "react-native";

type Options = {
  headerShown: boolean;
  loading?: boolean;
};

export function useHeaderBehavior({ headerShown, loading = false }: Options) {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const getBackgroundColor = () => {
    return isDarkMode ? colors.dark.background : colors.light.background;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackButtonDisplayMode: "minimal",
      headerShadowVisible: false,
      headerShown: headerShown,
      headerBackVisible: !loading,
      gestureEnabled: !loading,
      headerTintColor: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      headerStyle: {
        backgroundColor: getBackgroundColor(),
      },
    } as any);
  }, [navigation, loading]);

}