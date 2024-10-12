// components/FormField.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import TextInput from "@/components/base/input/TextInput"; // Ensure the path is correct
import CustomTextInput from "@/components/base/input/TextInput";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
}

export interface FormFieldConfig {
  name: keyof RegisterFormValues;
  placeholder: string;
  type: "text" | "email" | "password" | "phone";
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  readOnly?: boolean;
  accessory?: "passwordToggle" | "countryPicker";
}

interface FormFieldProps extends TextInputProps {
  placeholder: string;
  type: "text" | "email" | "password" | "phone";
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  accessory?: React.ReactNode;
  readOnly?: boolean;
}

export function FormField({
  placeholder,
  type,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  accessory,
  readOnly = false,
  ...rest
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder={placeholder}
        secureTextEntry={type === "password"}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        accessory={accessory}
        editable={!readOnly}
        accessibilityLabel={placeholder}
        accessibilityHint={`Input for ${placeholder}`}
        {...rest}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 5,
  },
});
