import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const Text = styled.TextInput`
  width: 30%;
  background-color: #fff;
  align-items: center
  padding: 18px;
  height: ${RFValue(50)}px;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.secondary}
    width: 25%;
    align-items: center
    padding: 18px;
    height: ${RFValue(50)}px;
    `;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape}
  font-size:${RFValue(14)}px;
`;
