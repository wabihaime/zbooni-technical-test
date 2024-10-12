import { FullButton } from "@/components/base/button";
import { useRouter } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("@/assets/images/brand/zbooni-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Say hello to cCommerce</Text>
      </View>
      <View style={styles.buttons}>
        <FullButton
          title="Log in"
          variant="primary"
          onPress={() => router.push("/login")}
        />
        <FullButton
          title="Create a free account"
          variant="secondary"
          onPress={() => router.push("/register")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#101820",
  },
  main: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 64,
    width: 190,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 16,
    fontWeight: "semibold",
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
    paddingHorizontal: 34,
  },
});
