import { KeyboardTypeOptions } from "react-native";

export interface FormFieldConfig<T> {
  name: keyof T;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  readOnly?: boolean;
  accessory?: React.ReactNode;
  secureTextEntry?: boolean;
}
