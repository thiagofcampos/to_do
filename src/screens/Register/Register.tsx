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
import { categories } from "../../utils/categories";
import CategorySelect from "../CategorySelect/CategorySelect";
import Select from "../../components/Forms/Select";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { DatalistProps } from "../Dashboard/Dashboard";

interface FormType {
  [description: string]: any;
}

interface Props {
  selectedItem?: DatalistProps;
  data?: DatalistProps[];
  closeEditModal?: () => void;
}

type NavigationProps = {
  navigate: (screen: string) => void;
};

const Register = ({ selectedItem, data, closeEditModal }: Props) => {
  const [category, setCategory] = React.useState({
    key: "category",
    name: "Categoria",
  });
  const dataKeyDescriptions = "@todocontroll:description";
  const [modalOpen, setModalOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const pageTile = selectedItem ? "Editar" : "Cadastrar";

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

  const setDefaultValues = () => {
    data?.map((item) => {
      if (item.id === selectedItem?.id) {
        const formatDate = new Date(selectedItem.date);
        const getCategory = categories.find(
          (category) => category.key === item.category
        );
        setDate(formatDate);
        setCategory(
          getCategory
            ? { name: getCategory?.name, key: getCategory?.key }
            : { key: "category", name: "Categoria" }
        );
      }
    });
  };

  const prepareValues = (currentData: DatalistProps[], form: FormType) => {
    return currentData?.map((item) => {
      if (item.id === selectedItem?.id) {
        return {
          id: selectedItem?.id,
          description: form.description,
          category: category.key,
          date: date,
        };
      } else {
        return {
          ...item,
        };
      }
    });
  };

  const navigation = useNavigation<NavigationProps>();

  const returnToDashboard = () => {
    if (closeEditModal) {
      closeEditModal();
      navigation.navigate("Listagem");
    } else {
      navigation.navigate("Listagem");
    }
  };

  const handleRegister = async (form: FormType) => {
    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    const dataFormRegister = {
      id: selectedItem?.id || String(uuid.v4()),
      description: form.description,
      category: category.key,
      date: date,
    };

    try {
      const data = await AsyncStorage.getItem(dataKeyDescriptions);
      const currentData = data ? JSON.parse(data) : [];
      const teste = prepareValues(currentData, form);
      const dataFormatted = selectedItem?.id
        ? prepareValues(currentData, form)
        : [...currentData, dataFormRegister];

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

      returnToDashboard();
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (selectedItem?.id) {
      setDefaultValues();
      setValue("description", selectedItem?.description);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>{pageTile}</Title>
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
