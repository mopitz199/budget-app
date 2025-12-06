# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Setting Up Screen

This part shows how to configure each screen in order to make them consistently like

### Using the MainView

Each screen must contain the MainView component like:

```html
<MainView headerShown={true} loading={false}>
   ...
</MainView>
```

Where basically the MainView must receive the param:

- headerShown(bool): To describe if the screen will have a header or not. According to this param, it will create a main container using the right space considering the safe area or not.
- loading(bool): To describe if the screen is loading something. If it's true, it will display a loading modal


### Setting up the useHeaderBehavior

Here we will describe all the configuration that our header should have

```tsx
const screenConf: ScreenConf = {
   headerShown: false
};
useHeaderBehavior({
   headerShown: bool, # Show the header or not
   iconName: string, # Set the right icon to use. This will hide the left back icon
   onPressIconName: func, # When the right icon is pressed
   loading: bool, # It will hide all the header icons
});
```

### Complete example

```tsx
import { useHeaderBehavior } from "@/hooks/header-behavior";
import { ScreenConf } from "@/types/screen-conf";
import { useState } from "react";
import MainView from "@/components/MainView";

export default function ExampleScreen() {

  const screenConf: ScreenConf = {
    headerShown: true
  };

  useHeaderBehavior({ headerShown: screenConf.headerShown })

  const [loading, setLoading] = useState(false);

  return (
    <MainView headerShown={screenConf.headerShown} loading={loading}>
      <>
    </MainView>
  )
}
```

## Using the Alert Component

The `Alert` component is a custom modal dialog that supports dark/light themes and flexible button layouts.

### Basic Usage

```tsx
import { Alert } from '@/components/Alert';
import { PrincipalButton } from '@/components/Buttons';
import { useState } from 'react';

function MyComponent() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <>
      <PrincipalButton 
        title="Show Alert" 
        onPress={() => setAlertVisible(true)} 
      />

      <Alert
        visible={alertVisible}
        title="Alert Title"
        message="This is the alert message"
        onClose={() => setAlertVisible(false)}
        rightButton={
          <PrincipalButton 
            title="OK" 
            onPress={() => setAlertVisible(false)} 
          />
        }
      />
    </>
  );
}
```

### Props

- **visible** (required): `boolean` - Controls whether the alert is shown
- **title**: `string` - Optional title displayed at the top
- **message**: `string` - Optional message text below the title
- **onClose**: `() => void` - Callback when the backdrop is pressed
- **onOutsidePress**: `() => void` - Additional callback when pressing outside the alert
- **leftButton**: `React.ReactNode` - Optional button on the left side
- **rightButton**: `React.ReactNode` - Optional button on the right side

### Two-Button Layout

```tsx
<Alert
  visible={confirmVisible}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  onClose={() => setConfirmVisible(false)}
  leftButton={
    <SecondaryButton 
      title="Cancel" 
      onPress={() => setConfirmVisible(false)} 
    />
  }
  rightButton={
    <PrincipalButton 
      title="Confirm" 
      onPress={handleConfirm} 
    />
  }
/>
```

### Features

- Automatically themed for dark/light mode
- Backdrop dismissal support
- Centered modal with max 80% screen width
- Flexible button layout (one or two buttons)
- Touch events properly handled to prevent backdrop dismissal when pressing the alert content
