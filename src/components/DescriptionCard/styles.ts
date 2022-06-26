import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape}
    border-radius: 5px;
    padding: 17px 24px;
    
    margin-right: 16px;
    margin-bottom: 16px;
    `;

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end
    align-items: center;
    `;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 2px;
  font-size: ${RFValue(20)}px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

// @ts-ignore
export const FeatherStyled = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: 17px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
