// src/utils/rtlHandler.js

import { I18nManager } from "react-native";
import i18n from "../i18n";
import * as Updates from "expo-updates";

// List of RTL languages
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"]; // Add other RTL languages as needed

export const handleRTL = async () => {
  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  if (I18nManager.isRTL !== isRTL) {
    try {
      await I18nManager.forceRTL(isRTL);
      // Reload the app to apply the changes
      // await Updates.reloadAsync();
    } catch (error) {
      console.error("Failed to set RTL:", error);
    }
  }
};
