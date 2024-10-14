# Welcome to the Expo technical test 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

For this project, I focused on the mobile development over web.

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

## Packages used

> These are packages that don't come with the expo project

- Form, validation and error display
  - Yup
  - Formik
- API Integration
  - Axios
- Internationalization
  - i18next
  - expo-localization
- Country picker
  - react-native-country-codes-picker
- Storing of access token
  - expo Secure Store

## State management

- React Context because of the small scope

## Routing

- Root
  - index.ts -> Welcome screen
  - Stack
    - login
    - signup
  - Tabs
    - home routes
