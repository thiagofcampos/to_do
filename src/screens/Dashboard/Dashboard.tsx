import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HighlightCard from "../../components/HighlightCard";
import { ActivityIndicator, Modal } from "react-native";
import DescriptionCard, {
  DescriptionCardProps,
} from "../../components/DescriptionCard";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  HighlightCards,
  Descriptions,
  Title,
  DescriptionsList,
  LoaderContainer,
} from "./styles";
import Register from "../Register/Register";

export interface DatalistProps extends DescriptionCardProps {
  id: string;
}
const Dashboard = () => {
  const dataKeyDescriptions = "@todocontroll:description";
  const theme = useTheme();
  const [isLoading, setIsloading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [task, setTask] = React.useState<DatalistProps[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<DatalistProps>();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = async (props: DatalistProps) => {
    const response = await AsyncStorage.getItem(dataKeyDescriptions);
    const descriptions = response ? JSON.parse(response) : [];
    const selectDataObject = descriptions.find(
      (item: DatalistProps) => item.id === props.id
    );
    setSelectedItem({
      ...props,
      date: selectDataObject.date,
    });
    setModalOpen(true);
  };

  const dateFormatter = (date: Date) => {
    const dateFormatted = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(date));

    return dateFormatted;
  };

  const handleRemoveTask = async (id: string) => {
    try {
      const response = await AsyncStorage.getItem(dataKeyDescriptions);
      const descriptions = response ? JSON.parse(response) : [];

      const removeFromList = descriptions.filter(
        (item: DatalistProps) => item.id !== id
      );

      const removeFromState = task.filter(
        (item: DatalistProps) => item.id !== id
      );

      await AsyncStorage.setItem(
        dataKeyDescriptions,
        JSON.stringify(removeFromList)
      );

      setTask(removeFromState);
    } catch (error) {
      console.log(error);
    }
  };

  async function loadDescriptions() {
    try {
      //AsyncStorage.clear();
      const response = await AsyncStorage.getItem(dataKeyDescriptions);

      const descriptions = response ? JSON.parse(response) : [];
      const taskFormatted: DatalistProps[] = descriptions.map(
        (item: DatalistProps) => {
          const dateFormatted = Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(item.date));

          return {
            id: item.id,
            description: item.description,
            category: item.category,
            date: dateFormatted,
          };
        }
      );

      setTask(taskFormatted);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    loadDescriptions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!modalOpen) {
        loadDescriptions();
      }
    }, [modalOpen])
  );

  const handleFilterTaskOfTheDay = () => {
    const today = new Date();
    const todayFormatted = dateFormatter(today);

    const filterTask = task.filter(
      (item: DatalistProps) => item.date === todayFormatted
    );

    return filterTask;
  };

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <ActivityIndicator color={theme.colors.secondary} size={"large"} />
        </LoaderContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/26800964?s=400&u=a78a4617ff2c706a7de5003fcd2815d136d7eee7&v=4.png",
                  }}
                />
                <User>
                  <UserGreeting>Lista de tarefas</UserGreeting>
                  <UserName>Thiago</UserName>
                </User>
              </UserInfo>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Tarefas do dia"
              task={handleFilterTaskOfTheDay()}
            />
          </HighlightCards>
          <Descriptions>
            <Title>Listagem</Title>
            <DescriptionsList
              data={task}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DescriptionCard
                  data={item}
                  onPress={() => handleOpenModal(item)}
                  closeCallback={() => handleRemoveTask(item.id)}
                />
              )}
            />
          </Descriptions>
          <Modal visible={modalOpen}>
            <Register
              data={task}
              selectedItem={selectedItem}
              closeEditModal={handleCloseModal}
            />
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
