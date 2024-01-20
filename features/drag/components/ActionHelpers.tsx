import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import HelperText from "./HelperText";
import {
  ACTION_HELPER_CAT,
  ACTION_HELPER_DOG,
  ACTION_HELPER_INCONCLUSIVE,
} from "../../../constants/strings";
import { ScreenSide } from "../../../types/ScreenSide";

export interface ActionHelpersProps {
  side: ScreenSide;
}

export default function ActionHelpers({ side }: ActionHelpersProps): ReactNode {
  return (
    <View style={styles.container}>
      {side === ScreenSide.right ? (
        <HelperText style={[styles.box, styles.boxLeft]}>
          <FontAwesome5 name="arrow-right" size={40} />
          <Text style={styles.text}>{ACTION_HELPER_DOG}</Text>
        </HelperText>
      ) : null}
      {side === ScreenSide.left ? (
        <HelperText style={[styles.box, styles.boxRight]}>
          <FontAwesome5 name="arrow-left" size={40} />
          <Text style={styles.text}>{ACTION_HELPER_CAT}</Text>
        </HelperText>
      ) : null}
      {side === ScreenSide.top ? (
        <HelperText style={[styles.box, styles.boxBottom]}>
          <FontAwesome5 name="arrow-up" size={40} />
          <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>
            {ACTION_HELPER_INCONCLUSIVE}
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
