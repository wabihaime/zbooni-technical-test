import { FullButton } from "@/components/base/button";
import { Header } from "@/components/base/header";
import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Create() {
  return (
    <>
      <Header
        title="New Invoice"
        rightOption={
          <TouchableOpacity>
            <Text>Log out</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/graphics/new-invoice-graphic.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.header}>Create a new order</Text>
          <Text style={styles.subtitle}>
            Share with your customer for easy checkout
          </Text>
        </View>
        <FullButton title="Create order" onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  image: {
    height: 214,
    width: 214,
  },
  textContainer: {
    alignItems: "center",

    gap: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#848484",
  },
});
