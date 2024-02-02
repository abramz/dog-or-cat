import { Linking } from "react-native";

export default function openExternalLink(href: string): void {
  Linking.openURL(href);
}
