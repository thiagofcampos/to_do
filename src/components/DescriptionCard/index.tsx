import React from "react";
import { categories } from "../../utils/categories";

import {
  Description,
  Category,
  CategoryName,
  Container,
  FeatherStyled,
  Footer,
  Title,
  Date,
  HeaderContainer,
} from "./styles";
import { TouchableOpacity, View } from "react-native";
export interface DescriptionCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
}

interface Props {
  data: DescriptionCardProps;
  closeCallback?: () => void;
}

const DescriptionCard = ({ data, closeCallback }: Props) => {
  const category = categories.filter((item) => item.key === data.category)[0];
  const { description, date, title } = data;
  return (
    <Container>
      <HeaderContainer>
        <Title>{title}</Title>
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
    </Container>
  );
};

export default DescriptionCard;
