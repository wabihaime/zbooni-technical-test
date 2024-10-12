// components/FormField.js
import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import TextInput, {
  CustomTextInputProps,
} from "@/components/base/input/TextInput"; // Ensure the path is correct

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

interface FormFieldProps extends CustomTextInputProps {
  error?: string;
  touched?: boolean;
  accessory?: React.ReactNode;
  readOnly?: boolean;
}

export function FormField({
  placeholder,

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
    <Fragment>
      <TextInput
        readOnly={readOnly}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        accessory={accessory}
        {...rest}
      />
      <View style={styles.errorContainer}>
        {!!error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </Fragment>
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
  errorContainer: { height: 20 },
});
