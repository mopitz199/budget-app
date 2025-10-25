import { NavigationProp, NavigationState } from '@react-navigation/native';

export interface ScreenConf {
  headerShown: boolean;
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}