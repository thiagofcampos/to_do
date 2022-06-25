import React from "react";
import { Container, Header, Title, Form, Fields } from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputForm from "../../components/Forms/InputForm";
import DatePicker from "../../components/DatePicker";
import Buttom from "../../components/Buttom";
import { useForm } from "react-hook-form";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import CategorySelect from "../CategorySelect/CategorySelect";
import Select from "../../components/Forms/Select";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

interface FormType {
  [description: string]: any;
}

type NavigationProps = {
  navigate: (screen: string) => void;
};

const Register = () => {
  const [category, setCategory] = React.useState({
    key: "category",
    name: "Categoria",
  });
  const dataKeyDescriptions = "@todocontroll:description";
  const [modalOpen, setModalOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangeDate = (date: number | undefined) => {
    const timeStampToData = date ? new Date(date) : new Date();
    setDate(timeStampToData);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const navigation = useNavigation<NavigationProps>();

  const handleRegister = async (form: FormType) => {
    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    const dataFormRegister = {
      id: String(uuid.v4()),
      description: form.description,
      category: category.key,
      date: date,
    };
    try {
      const data = await AsyncStorage.getItem(dataKeyDescriptions);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, dataFormRegister];
      await AsyncStorage.setItem(
        dataKeyDescriptions,
        JSON.stringify(dataFormatted)
      );
      reset();
      setDate(new Date());
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível cadastrar");
    }
  };

  const schema = Yup.object().shape({
    description: Yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastrar</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              multiline={true}
              numberOfLines={10}
              name={"description"}
              placeholder="Descrição"
              autoCapitalize={"sentences"}
              autoCorrect={false}
              error={errors.description && errors.description.message}
            />
            <Select text={category.name} onPress={handleOpenModal} />
            <DatePicker
              text="Data"
              value={date}
              onChange={(e) => handleChangeDate(e.nativeEvent.timestamp)}
            />
          </Fields>
          <Buttom onPress={handleSubmit(handleRegister)} text={"Submit"} />
        </Form>
        <Modal visible={modalOpen}>
          <CategorySelect
            category={category}
            closeSelectCatergory={handleCloseModal}
            setCategory={setCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
