import { PrincipalButton } from "@/components/Buttons";
import MainView from "@/components/MainView";
import { useUserSettings } from "@/contexts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { getCrashlytics, recordError } from "@react-native-firebase/crashlytics";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function HomeScreen() {

  const screenConf: ScreenConf = {
    headerShown: false
  };

  const crashlyticsInstance = getCrashlytics();
  const router = useRouter();
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  const auth = getAuth()
  const userSettings = useUserSettings();

  return (
    <MainView headerShown={screenConf.headerShown}>
      <Text>Home Page</Text>
      <Text>{userSettings.userSettingsData.defaultCurrency}</Text>
      <Text>Chao</Text>
      <Button title="Go to UploadFile" onPress={() => router.navigate('/(auth)/upload-file')} />
      <Button title="Go to Manual Transaction" onPress={() => router.navigate('/(auth)/manual-transaction')} />
      <Button title="Go to Settings" onPress={() => router.navigate('/(auth)/settings')} />
      <Button title="Go to Transactions" onPress={() => router.navigate('/(auth)/transactions')} />
      <PrincipalButton title="Sign out" onPress={async () => {

        try {
          await signOut(auth);

          const currentUser = await GoogleSignin.getCurrentUser();
          if (currentUser) {
            await GoogleSignin.signOut();
            // opcional:
            // await GoogleSignin.revokeAccess();
          }
        } catch (error) {
          recordError(
            crashlyticsInstance,
            new Error('error_signing_out: ' + error)
          );
        }

        router.replace('/login');
      }} />
    </MainView>
  );
}