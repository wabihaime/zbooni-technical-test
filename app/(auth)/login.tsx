import { FullButton } from "@/components/base/button";
import { Header } from "@/components/base/header";
import CustomTextInput from "@/components/base/input/TextInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

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

  const handleLogin = async (values: { email: string; password: string }) => {
    console.log("Values", values);
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
                <CustomTextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <View style={styles.errorContainer}>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <CustomTextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  accessory={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                      />
                    </TouchableOpacity>
                  }
                />
                <View style={styles.errorContainer}>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
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
