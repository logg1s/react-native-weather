import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { s } from "./StyledText.style";

export default function StyledText({
  style,
  children,
  ...textProps
}: {
  readonly children: ReactNode;
} & TextProps) {
  return (
    <Text style={[s.text, style]} {...textProps}>
      {children}
    </Text>
  );
}
