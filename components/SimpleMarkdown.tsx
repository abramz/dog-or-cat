import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

import openExternalLink from "../features/linking/services/openExternalLink";

export interface SimpleMarkdownProps {
  text: string;
  style?: TextStyle;
}

const LINK_REGEX = /\[.*?\|.*?\]/g;

function Link({
  href,
  children,
}: PropsWithChildren<{ href: string; style: TextStyle }>): ReactNode {
  return (
    <Text
      style={styles.link}
      onPress={() => {
        openExternalLink(href);
      }}
    >
      {children}
    </Text>
  );
}

// This does exactly what I need where I need it to make strings less of a pain to deal with
// below are known things not do to, it may not work for other things either:
// NB: this works only for text with links
// NB: do not put a link at the beginning of the text
// NB: do not put two links next to each other
// is this even markdown style links? IDK, it works though
export default function SimpleMarkdown({
  text,
  style,
}: SimpleMarkdownProps): ReactNode {
  const children = [];
  const matches = text.match(LINK_REGEX);

  if (!matches) {
    children.push(
      <Text style={style} key={1}>
        {text}
      </Text>
    );
  } else {
    const rest = text.split(LINK_REGEX);

    rest.forEach((bit, index) => {
      children.push(bit);

      const nextLink = matches[index];
      if (!nextLink) {
        return;
      }

      // the escaping is kinda important
      // eslint-disable-next-line no-useless-escape
      const parts = nextLink.replace(/[\[\]]/g, "").split("|");

      children.push(
        <Link key={index + "-link"} href={parts[1]} style={style ?? {}}>
          {parts[0]}
        </Link>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text style={style}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  link: { textDecorationLine: "underline", fontStyle: "italic" },
});
