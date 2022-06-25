import React from "react";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  ButtomContainer,
} from "./styles";
import Buttom from "../../components/Buttom";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCatergory: () => void;
}

const CategorySelect = ({
  category,
  setCategory,
  closeSelectCatergory,
}: Props) => {
  const handleCategorySelect = (item: Category) => {
    setCategory(item);
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={item.key === category.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />
      <ButtomContainer>
        <Buttom onPress={closeSelectCatergory} text={"Escolher"} />
      </ButtomContainer>
    </Container>
  );
};

export default CategorySelect;
