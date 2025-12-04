import { Alert } from "@/components/Alert";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import { Input } from "@/components/inputs/Input";
import MainView from "@/components/MainView";
import { Title } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, useColorScheme, View } from "react-native";

export default function RecoverAccountScreen() {
  const screenConf: ScreenConf = {
    headerShown: true
  };
  
  useHeaderBehavior({ headerShown: screenConf.headerShown });

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const styles = makeStyles({ isDarkMode });
  const { t, i18n } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleRegister = () => {
    // Implement registration logic here
  };

  return (
    <MainView headerShown={screenConf.headerShown}>

      <Alert
        title={alertTitle}
        message={alertMessage}
        leftButton={
          <SecondaryButton style={{ height: globalStyles.alertButtonHeight }} title="Ok" onPress={() => {
            setShowAlert(false);
          }}/>
        }
        visible={showAlert}
      />

      <View style={styles.headerContainer}>
        <Title style={styles.titleText}>{t('passwordRecovery')}</Title>
        <Image
          source={require('@/assets/images/squirrles/squirrle2.png')}
          style={styles.squirrelImage}
        />
      </View>
      <Input
        textInputProps={{
          value: email,
          onChangeText: setEmail,
          placeholder: t('enterYourEmail'),
          autoCapitalize: "none"
        }}
        errorMessage={emailError}
        labelMessage={t('email')}
      />
      <PrincipalButton style={styles.registerButton} title={t('signUp')} onPress={handleRegister} />

    </MainView>
  );
}

type StyleParams = {
  isDarkMode: boolean;
};

function makeStyles({
  isDarkMode,
}: StyleParams) {
  return StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: 40,
    },
    titleText: {
      marginRight: 8,
    },
    squirrelImage: {
      width: 50 * (987 / 724),
      height: 50,
    },
    inputSpacing: {
      marginTop: 20,
    },
    registerButton: {
      marginTop: 40,
    }
  });
}