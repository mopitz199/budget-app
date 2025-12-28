import { colors } from "@/colors";
import { Alert } from "@/components/Alert";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import CurrencyOption from "@/components/CurrencyOption";
import { SelectorInput } from "@/components/inputs/SelectorInput";
import MainView from "@/components/MainView";
import { InputLabel, Text, Title } from "@/components/Texts";
import { globalStyles } from "@/global-styles";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { currencyOptions } from "@/utils/currencyUtil";
import { log } from "@/utils/logUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, getIdToken } from "@react-native-firebase/auth";
import { getCrashlytics, recordError } from "@react-native-firebase/crashlytics";
import { getDownloadURL, getStorage, putFile, ref } from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import uuid from 'react-native-uuid';

const IA_SERVER_URL = process.env.EXPO_PUBLIC_IA_SERVER_URL;

export default function UploadFileScreen() {

  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();
  const theme = useColorScheme();
  const crashlyticsInstance = getCrashlytics();
  const auth = getAuth()
  const { t, i18n } = useTranslation();
  const isDarkMode = theme === 'dark';

  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const [images, setImages] = useState<any[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  useHeaderBehavior({ loading: loading, headerShown: screenConf.headerShown });


  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: .1,
    })

    if(!result.canceled){
      let images_data = []
      for (const asset of result.assets) {
        images_data.push(asset)
      }
      setImages(images_data)
    }else{
      log(crashlyticsInstance, "User cancelled image selection");
    }
  }

  const readImages = async (token: string, images_urls: string[]) => {
    if (!IA_SERVER_URL) {
      throw new Error('IA_SERVER_URL is not defined');
    }
    const response = await fetch(IA_SERVER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // 👈 Enviar token como Bearer
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        images_url: images_urls
      }),
    });
    return response
  }

  const uploadImage = async () => {
    let user = auth.currentUser;
    if(user){
      setLoading(true)

      let images_urls = []
      for (const image of images) {
        const path = `/statements/${user?.uid}/${uuid.v4()}`
        const storage = getStorage()
        const reference = ref(storage, path)
        await putFile(reference, image.uri);
        const url = await getDownloadURL(reference);
        images_urls.push(url)
      }

      try {
        const token = await getIdToken(user);
        let response = await readImages(token, images_urls)
        if(response.ok){
          const data = await response.json();
          router.replace(
            {
              pathname: '/(auth)/upload-file-transactions-preview',
              params: {
                transactionsId: data.id,
                selectedCurrency: currency,
              },
            }
          )
          setImages([]); // Clear images after successful upload
        }else{
          const errorData = await response.json();
          recordError(
            crashlyticsInstance,
            new Error(`error_reading_image_transactions: ${JSON.stringify(errorData)}`)
          );
          setTitleAlert(t("error"));
          setMessageAlert(t("serverErrorReadingImages"));
          setShowAlert(true);
        }
      } catch (err) {
        recordError(
          crashlyticsInstance,
          new Error(`error_processing_images: ${JSON.stringify(err)}`)
        );
        setTitleAlert(t("error"));
        setMessageAlert(t("serverErrorReadingImages"));
        setShowAlert(true);
      }
    }else{
      recordError(
        crashlyticsInstance,
        new Error(`error_user_not_authenticated: The user is not authenticated.`)
      );
      setTitleAlert(t("error"));
      setMessageAlert(t("userNotAuthenticatedTryAgain"));
      setShowAlert(true);
    }
    setLoading(false)
  }

  const styles = makeStyles({ isDarkMode });

  const showImagesPreview = () => {
    if(images.length > 0){
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
            {(images.map((image, index) => {
              const ratio = image.width / image.height;
              return (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    style={[styles.imagePreview, { aspectRatio: ratio }]}
                    key={index}
                    source={{ uri: image.uri }}
                  />
                </View>
              )
            }
            ))}
        </ScrollView>
      )
    }else {
      return (
        <View style={styles.emptyState}>
          <Ionicons
            name={'document'}
            size={100}
            color={isDarkMode ? colors.dark.primary : colors.light.primary}
          />
          <Text style={styles.emptyStateText}>{t("imagePreviewPlaceholder")}</Text>
        </View>
      )
    }
  }

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>

      <Alert
        title={titleAlert}
        message={messageAlert}
        leftButton={
          <SecondaryButton style={{ height: globalStyles.alertButtonHeight }} title={t('close')} onPress={() => {
            setShowAlert(false);
          }}/>
        }
        visible={showAlert}
      />

      <Title style={styles.title}>{t("loadYourFiles")}</Title>
      <SelectorInput
        value={currency}
        placeholder={t("selectCurrency")}
        options={currencyOptions}
        onOptionSelect={(option) => { setCurrency(option.value); }}
        optionComponent={(option) => {
          return (
            <CurrencyOption
              currentValue={currency}
              currencyOption={option}
            />
          )
        }}
        errorMessage={currencyError}
        labelMessage="Currency"
      />

      <View style={styles.filesContainer}>
        <InputLabel>{t("files")}</InputLabel>
        <View style={styles.filesPreviewContainer}>
          {showImagesPreview()}
        </View>
      </View>
      <SecondaryButton
        title={t("selectFiles")}
        onPress={pickImageAsync}
        style={styles.selectFilesButton}
      />
      <PrincipalButton
        disabled={images.length === 0 || currency === ''}
        style={[
          styles.doneButton,
          { opacity: (images.length === 0 || currency === '') ? 0.5 : 1 }
        ]}
        title={t("done")} onPress={
          () => {uploadImage();}
        }
      />
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
    title:{
      marginBottom: 20
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 10,
    },
    imageContainer: {
      width: '50%',
      padding: 10,
    },
    imagePreview: {
      width: '100%',
    },
    emptyState: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyStateText: {
      marginTop: 10,
    },
    filesContainer: {
      flex: 1,
    },
    filesPreviewContainer: {
      flex: 1,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: isDarkMode ? colors.dark.onBackground : colors.light.onBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      borderRadius: 4,
    },
    selectFilesButton: {
      marginBottom: 20,
      marginTop: 20,
    },
    doneButton: {
      marginBottom: 20,
    },
  })
}