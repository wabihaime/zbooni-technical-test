import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          source={require("@/assets/images/brand/zbooni-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Say hello to cCommerce</Text>
      </View>
      <View style={styles.buttons}></View>
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
    fontSize: 16,
    marginTop: 16,
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
