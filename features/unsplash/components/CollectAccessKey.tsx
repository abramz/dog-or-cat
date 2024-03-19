import { router } from "expo-router";
import { ReactNode, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

import Button from "../../../components/Button";
import SimpleMarkdown from "../../../components/SimpleMarkdown";
import { SKIP_ACCESS_KEY } from "../../../constants";
import {
  COLLECTION_INSTRUCTIONS,
  COLLECTION_REQUEST_UNSPLASH_KEY,
  SKIP_ACCESS_KEY_TEXT,
} from "../../../constants/strings";
import { useUnsplashAccessKey } from "../context/UnsplashAccessKey";

export default function CollectAccessKey(): ReactNode {
  const [value, setValue] = useState("");

  const { saveKey } = useUnsplashAccessKey();

  async function handleSubmit(override?: string) {
    await saveKey(override ?? value);

    router.navigate("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{COLLECTION_REQUEST_UNSPLASH_KEY}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        returnKeyType="done"
        onSubmitEditing={() => handleSubmit()}
        secureTextEntry
        testID="input"
      />
      <View />
      <SimpleMarkdown text={COLLECTION_INSTRUCTIONS} style={styles.text} />

      <Button
        onPress={() => handleSubmit(SKIP_ACCESS_KEY)}
        testId="skip-access-key"
      >
        {SKIP_ACCESS_KEY_TEXT}
      </Button>
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
