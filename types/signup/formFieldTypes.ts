import { KeyboardTypeOptions } from "react-native";
import { RegisterFormValues } from "./formTypes";

export interface FormFieldConfig {
  name: keyof RegisterFormValues;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  readOnly?: boolean;
  accessory?: React.ReactNode;
}
