import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ScreenSide } from "../types/ScreenSide";
import HelperText from "./HelperText";

export interface SwipeHelpersProps {
  side: ScreenSide | undefined;
}

export default function SwipeHelpers({ side }: SwipeHelpersProps): ReactNode {
  return (
    <View style={styles.container}>
      {side === ScreenSide.right ? (
        <HelperText style={[styles.box, styles.boxLeft]}>
          <FontAwesome5 name="arrow-right" size={40} />
          <Text style={styles.text}>{"Dog"}</Text>
        </HelperText>
      ) : null}
      {side === ScreenSide.left ? (
        <HelperText style={[styles.box, styles.boxRight]}>
          <FontAwesome5 name="arrow-left" size={40} />
          <Text style={styles.text}>{"Cat"}</Text>
        </HelperText>
      ) : null}
      {side === ScreenSide.top ? (
        <HelperText style={[styles.box, styles.boxBottom]}>
          <FontAwesome5 name="arrow-up" size={40} />
          <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>
            {"Inconclusive"}
          </Text>
        </HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    zIndex: 1,
  },
  box: {
    position: "absolute",
    alignItems: "center",
  },
  boxLeft: {
    left: 10,
  },
  boxRight: {
    right: 10,
  },
  boxBottom: {
    alignSelf: "center",
    bottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "TitanOne",
    fontSize: 40,
  },
});
