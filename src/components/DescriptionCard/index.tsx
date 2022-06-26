import React from "react";
import { categories } from "../../utils/categories";

import {
  Description,
  Category,
  CategoryName,
  Container,
  FeatherStyled,
  Footer,
  Date,
  HeaderContainer,
} from "./styles";
import { TouchableOpacity, View } from "react-native";
export interface DescriptionCardProps {
  description: string;
  category: string;
  date: string;
}

interface Props {
  data: DescriptionCardProps;
  closeCallback?: () => void;
  onPress?: () => void;
}

const DescriptionCard = ({ data, closeCallback, onPress }: Props) => {
  const category = categories.filter((item) => item.key === data.category)[0];
  const { description, date } = data;
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <HeaderContainer>
          {closeCallback && (
            <TouchableOpacity onPress={closeCallback}>
              <FeatherStyled name={"x-circle"} />
            </TouchableOpacity>
          )}
        </HeaderContainer>
        <Description>{description}</Description>
        <Footer>
          <Category>
            <CategoryName>{category.name}</CategoryName>
          </Category>
          <Date>{date}</Date>
        </Footer>
      </TouchableOpacity>
    </Container>
  );
};

export default DescriptionCard;
