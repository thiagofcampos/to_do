import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface CategorySelected {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${RFValue(19)}px;
`;
export const Category = styled.TouchableOpacity<CategorySelected>`
  width: 100%;
  background-color: ${({ isActive }) =>
    isActive
      ? ({ theme }) => theme.colors.secondary_light
      : ({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  margin: 1px 0;
  padding: 14px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 14px;
`;
//@ts-ignore
export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
`;

export const ButtomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 16px;
`;
