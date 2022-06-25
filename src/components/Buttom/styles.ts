import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.secondary}
    width: 100%;
    align-items: center
    border-radius: 5px;
    padding: 18px;
    `;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape}
  font-size:${RFValue(14)}px;
`;
