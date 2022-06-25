import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Container, Options, Icon } from "./styles";

interface Props {
  text: string;
  onPress: () => void;
  icon?: string;
  containerSize?: "small" | "medium" | "full";
}

const Select = ({
  text,
  onPress,
  icon = "chevron-down",
  containerSize = "full",
}: Props) => {
  return (
    <Container onPress={onPress} containerSize={containerSize}>
      <Options>{text}</Options>
      <Icon name={icon} />
    </Container>
  );
};

export default Select;
