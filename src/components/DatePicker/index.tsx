import React from "react";
import {
  AndroidNativeProps,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Select from "../Forms/Select";

interface Props extends AndroidNativeProps {
  text: string;
}

const DatePicker = ({
  onChange,
  display,
  value,
  mode = "date",
  text,
}: Props) => {
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: value,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode();
  };

  const formatDate = () => {
    const dateFormatted = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(value));

    return dateFormatted;
  };

  return (
    <Select
      text={formatDate()}
      onPress={showDatepicker}
      icon="calendar"
      containerSize="small"
    />
  );
};

export default DatePicker;
