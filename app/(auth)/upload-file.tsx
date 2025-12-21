import { SelectorInput } from "@/components/inputs/SelectorInput";
import MainView from "@/components/MainView";
import { InputLabel, Text, Title } from "@/components/Texts";
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, useColorScheme, View } from "react-native";
import { currencyOptions, formatDisplay, formatMask } from "@/utils/currencyUtil";
import CurrencyOption from "@/components/CurrencyOption";
import { PrincipalButton, SecondaryButton } from "@/components/Buttons";
import { globalStyles } from "@/global-styles";
import { colors } from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, getIdToken } from "@react-native-firebase/auth";
import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, putFile, ref } from '@react-native-firebase/storage';

export default function UploadFileScreen() {

  const screenConf: ScreenConf = {
    headerShown: true
  };
  const router = useRouter();
  const theme = useColorScheme();
  const auth = getAuth()
  const isDarkMode = theme === 'dark';

  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const [images_uri, setImagesURI] = useState<string[]>([]);

  useHeaderBehavior({ loading: loading, headerShown: screenConf.headerShown });


  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: .1,
    })

    if(!result.canceled){
      let aux_images_uri = []
      for (const asset of result.assets) {
        aux_images_uri.push(asset.uri)
      }
      setImagesURI(aux_images_uri)
    }else{
      console.log("No image selected")
    }
  }

  const readImages = async (token: string, images_urls: string[]) => {
    const response = await fetch('http://192.168.1.88:8080/analyze-bank-transactions', {
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
    const user = auth.currentUser;
    const router = useRouter();

    if(user){
      setLoading(true)

      let images_urls = []
      for (const uri of images_uri) {
        const path = `/statements/${user?.uid}/${uuid.v4()}`
        const storage = getStorage()
        const reference = ref(storage, path)
        await putFile(reference, uri);
        const url = await getDownloadURL(reference);
        images_urls.push(url)
      }

      try {
        const token = await getIdToken(user);
        const response = await readImages(token, images_urls)
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
          setImagesURI([]); // Clear images after successful upload
        }else{
          const errorData = await response.json();
          Alert.alert("Error", "An error occurred while processing the images. Please try again later.");
        }
      } catch (err) {
        Alert.alert("Error", "An error occurred while reading the images. Please try again later.");
      }
    }else{
      Alert.alert("Error", "The user is not authenticated. Please log in again.");
    }
    setLoading(false)
  }

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
      <Title style={{ marginBottom: 20 }}>Load your files</Title>
      <SelectorInput
        value={currency}
        placeholder="Select currency"
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

      <View style={{ flex: 1 }}>
        <InputLabel>Files</InputLabel>
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: isDarkMode ? colors.dark.onBackground : colors.light.onBackground,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
          borderRadius: 4
        }}>
          <Ionicons
            name={'document'}
            size={100}
            color={isDarkMode ? colors.dark.primary : colors.light.primary}
          />
          <Text style={{ marginTop: 10 }}>Here you will see the image preview</Text>
        </View>
      </View>
      <SecondaryButton
        title="Select files"
        onPress={pickImageAsync}
        style={{ marginBottom: 20, marginTop: 20 }}
      />
      <PrincipalButton
        style={{ marginBottom: 20}}
        title="Done" onPress={
          () => {router.navigate('/(auth)/upload-file-transactions-preview')}
        }
      />
    </MainView>
  );
}