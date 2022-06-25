import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
}

const Buttom = ({ text, onPress, ...rest }: Props) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{text}</Title>
    </Container>
  );
};

export default Buttom;
