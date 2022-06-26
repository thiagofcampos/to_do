import React from "react";
import { Container, Header, Title, Content, Description } from "./styles";
import { formatDate } from "../../utils/formatDate";

interface item {
  description: string;
  date: string;
}

interface Props {
  title: string;
  task: item[];
}

const HighlightCard = ({ task, title }: Props) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        {task.map((item: item, index) => {
          return (
            <Description key={`description-${index}`}>
              {item.description} - {formatDate(item.date)}
            </Description>
          );
        })}
      </Content>
    </Container>
  );
};

export default HighlightCard;
