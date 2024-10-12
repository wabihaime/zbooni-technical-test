import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  leftOption?: React.ReactNode;
  rightOption?: React.ReactNode;
}

export function Header({ title, leftOption, rightOption }: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <View style={styles.side}>{leftOption}</View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.side}>{rightOption}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  side: {
    width: 64,
    flex: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
  },
});
