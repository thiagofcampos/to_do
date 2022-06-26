import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HighlightCard from "../../components/HighlightCard";
import { ActivityIndicator, Modal } from "react-native";
import DescriptionCard, {
  DescriptionCardProps,
} from "../../components/DescriptionCard";
import { formatDate } from "../../utils/formatDate";
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
    setSelectedItem({ ...props });
    setModalOpen(true);
  };

  const handleRemoveTask = async (id: string) => {
    try {
      const removeFromList = task.filter(
        (item: DatalistProps) => item.id !== id
      );

      await AsyncStorage.setItem(
        dataKeyDescriptions,
        JSON.stringify(removeFromList)
      );

      setTask(removeFromList);
    } catch (error) {
      console.log(error);
    }
  };

  async function loadDescriptions() {
    try {
      const response = await AsyncStorage.getItem(dataKeyDescriptions);

      const descriptions = response ? JSON.parse(response) : [];

      setTask(descriptions);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!modalOpen) {
        loadDescriptions();
      }
    }, [modalOpen])
  );

  const handleFilterTaskOfTheDay = () => {
    const today = new Date().getDate();
    const filterTask = task.filter((item: DatalistProps) => {
      const getDate = new Date(item.date).getDate();
      return getDate === today;
    });
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
