# Copilot Instructions for Budget App

## Architecture Overview

This is a React Native budget app built with Expo Router using file-based routing. The app follows a clear authentication flow with two main navigation groups: unauthenticated screens (login, register, recover-account) and authenticated screens under `(auth)/`.

## Key Patterns & Conventions

### Screen Structure
Every screen must follow this pattern:
```tsx
const screenConf: ScreenConf = {
  headerShown: false // or true
};
useHeaderBehavior({ headerShown: screenConf.headerShown });
```

### Component Architecture
- **MainView**: Wrapper component for all screens with built-in loading states and theming
- **Input**: Flexible input component with left/right icon slots and theme support
- **AmountCurrencyInput**: Specialized input for currency amounts with modal selection

### Styling System
- Uses centralized theming via `colors.tsx` with light/dark mode support
- `globalStyles.tsx` contains shared dimension constants (inputHeight: 56, etc.)
- Each component uses `makeStyles()` pattern with theme-aware parameters
- Always use `useColorScheme()` for theme detection and pass `isDarkMode` to styles

### Theme Pattern Example:
```tsx
const theme = useColorScheme();
const isDarkMode = theme === 'dark';
const styles = makeStyles({ isDarkMode });

function makeStyles({ isDarkMode }: { isDarkMode: boolean }) {
  return StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
    }
  });
}
```

### Navigation
- Uses Expo Router v6 with typed routes enabled
- Two-tier structure: root level (auth) + `(auth)` group for authenticated screens
- Navigate using `useRouter()` with paths like `/(auth)/home` or `/login`

### Development Workflow
- Start development: `npx expo start`
- Run on devices: `npm run android` or `npm run ios`
- The app uses Expo SDK 54 with React Native new architecture enabled
- Custom Roboto font with multiple weights configured in `app.json`

### External Dependencies
- Currency data from `flagsapi.com` for flag images
- Uses Expo Image for optimized image handling
- Haptics and other Expo modules integrated

### Component Composition
- Components use render prop pattern for customization (see `AmountCurrencyInput.optionComponent`)
- Modal system built with `BottomHalfModal` for selections
- Input components support left/right action areas with custom touch handlers

When adding new screens, always implement the `ScreenConf` pattern and `useHeaderBehavior` hook. For new components, follow the theming pattern with `makeStyles()` and ensure dark mode compatibility.