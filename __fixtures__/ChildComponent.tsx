import { View } from "react-native";

export const TEST_ID = "child";

export default function ChildComponent() {
  return <View testID={TEST_ID} />;
}
