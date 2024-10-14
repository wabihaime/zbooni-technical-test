import { FullButton } from "@/components/base/button";
import { Header } from "@/components/base/header";
import { FormField } from "@/components/base/input/FormField";
import { loginUser } from "@/src/api/login";
import { LoginFormValues } from "@/types/signup";
import { FormFieldConfig } from "@/types/signup/formFieldTypes";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "@/src/contexts";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const fields: FormFieldConfig<LoginFormValues>[] = [
    {
      name: "email",
      placeholder: "Email",
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    {
      name: "password",
      placeholder: "Password",
      accessory: "passwordToggle",
      secureTextEntry: !showPassword,
    },
  ];

  const handleLogin = async (
    values: { email: string; password: string },
    { setErrors }: { setErrors: (errs: Partial<LoginFormValues>) => void }
  ) => {
    try {
      const response = await loginUser({
        username: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        setUser(response.data);
        await SecureStore.setItemAsync(
          "access_token",
          response.data.access_token
        );

        if (Platform.OS === "web") {
          window.alert("Logged in successfully");
          router.replace("/(home)/create");
        } else {
          router.replace("/(home)/create");
        }
      } else {
        setErrors({
          password:
            response?.data?.error_description || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const renderAccessory = (fieldName: keyof LoginFormValues) => {
    if (fieldName === "password") {
      return (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          accessibilityRole="button"
        >
          <Feather name={showPassword ? "eye" : "eye-off"} size={24} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <>
      <Header
        title="Welcome back"
        leftOption={
          router.canGoBack() && (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={24} />
            </TouchableOpacity>
          )
        }
      />
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={styles.content}>
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    placeholder={field.placeholder}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    accessory={renderAccessory(field.name) ?? null}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    secureTextEntry={field.secureTextEntry}
                  />
                ))}
              </View>
              <View style={styles.submitContainer}>
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <FullButton
                    title="Login"
                    variant="primary"
                    onPress={handleSubmit}
                    disabled={!!errors.email || !!errors.password}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitContainer: {
    padding: 24,
    alignItems: "center",
  },
  errorContainer: { height: 20 },
  errorText: {
    color: "red",
  },
});
