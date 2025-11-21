import { log as crashlyticsLog } from '@react-native-firebase/crashlytics';

const useCrashlytics = false

export function log(crashlyticsInstance: any, message: string) {
  if(useCrashlytics){
    crashlyticsLog(crashlyticsInstance, message);
  }else{
    console.log(message);
  }
}