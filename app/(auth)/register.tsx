import { Header } from "@/components/base/header";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import TextInput from "@/components/base/input/TextInput";
import { Formik } from "formik";
import { useState } from "react";
import { FullButton } from "@/components/base/button";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  countryCode: Yup.string().required("Country code is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
});

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
    phoneNumber: string;
  }) => {
    console.log("Values", values);
  };

  return (
    <>
      <Header
        title="Create an Account"
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
      <View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            countryCode: "",
            phoneNumber: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={{ gap: 20 }}>
              <View style={styles.content}>
                <TextInput
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <TextInput
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
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
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Country Code Field
              <TouchableOpacity
                style={styles.countryCodeContainer}
                onPress={() =>
                  router.push("/country-picker", { setFieldValue })
                }
              >
                <Text
                  style={
                    values.countryCode
                      ? styles.countryCodeText
                      : styles.placeholderText
                  }
                >
                  {values.countryCode || "Select Country Code"}
                </Text>
              </TouchableOpacity>
              {errors.countryCode && touched.countryCode && (
                <Text style={styles.errorText}>{errors.countryCode}</Text>
              )} */}
              </View>
              <View style={styles.content}>
                <TextInput
                  placeholder="Country Code"
                  readOnly
                  onChangeText={handleChange("countryCode")}
                  onBlur={handleBlur("countryCode")}
                  value={values.countryCode}
                  accessory={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text>
                        {values.countryCode || "Select a country code"}
                      </Text>
                    </TouchableOpacity>
                  }
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
                <TextInput
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </View>

              <View>
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <FullButton
                    title="Create Account"
                    variant="primary"
                    onPress={handleSubmit}
                    disabled={!!errors.email || !!errors.password}
                  />
                )}
              </View>
            </View>
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
  countryCodeContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#848484",
  },
  countryCodeText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#848484",
  },
});
