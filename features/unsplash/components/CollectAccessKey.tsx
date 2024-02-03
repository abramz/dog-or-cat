import { router } from "expo-router";
import { ReactNode, useCallback, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

import SimpleMarkdown from "../../../components/SimpleMarkdown";
import {
  COLLECTION_INSTRUCTIONS,
  COLLECTION_REQUEST_UNSPLASH_KEY,
} from "../../../constants/strings";
import { useUnsplashAccessKey } from "../context/UnsplashAccessKey";

export default function CollectAccessKey(): ReactNode {
  const [value, setValue] = useState("");

  const { saveKey } = useUnsplashAccessKey();

  const handleSubmit = useCallback(async () => {
    await saveKey(value);

    router.navigate("/");
  }, [saveKey, value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{COLLECTION_REQUEST_UNSPLASH_KEY}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        secureTextEntry
        testID="input"
      />
      <View />
      <SimpleMarkdown text={COLLECTION_INSTRUCTIONS} style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b7cece",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: { fontSize: 18, marginBottom: 8 },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    marginBottom: 16,
    padding: 4,
  },
  text: { fontSize: 16 },
});
