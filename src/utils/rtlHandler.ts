import { I18nManager } from "react-native";
import i18n from "../i18n";

const RTL_LANGUAGES = ["ar"]; // Add other RTL languages here

export const handleRTL = async () => {
  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  if (I18nManager.isRTL !== isRTL) {
    try {
      await I18nManager.forceRTL(isRTL);
      // Reload the app to apply the changes
    } catch (error) {
      console.error("Failed to set RTL:", error);
    }
  }
};
