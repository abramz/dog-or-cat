import { PropsWithChildren, ReactNode } from "react";
import { Button as RNButton, StyleSheet, View } from "react-native";

export interface ButtonProps {
  onPress: () => void;
  testId: string;
}

export default function Button({
  children,
  onPress,
  testId,
}: PropsWithChildren<ButtonProps>): ReactNode {
  return (
    <View style={styles.container}>
      <RNButton
        title={children as string}
        onPress={onPress}
        testID={testId}
        color="#193c3c"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
