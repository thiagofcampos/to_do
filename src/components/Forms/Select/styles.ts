import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface containerProps {
  containerSize: "small" | "medium" | "full";
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<containerProps>`
    background-color: ${({ theme }) => theme.colors.shape}
    color: ${({ theme }) => theme.colors.text_dark}
    font-size: ${RFValue(14)}px;
    ${(props) =>
      props.containerSize === "small" &&
      css`
        width: 38%;
      `}
    ${(props) =>
      props.containerSize === "medium" &&
      css`
        width: 50%;
      `}
    ${(props) =>
      props.containerSize === "full" &&
      css`
        width: 100%;
      `}
    align-items: center;  
    flex-direction: row;
    justify-content: space-between;
    font-family: ${({ theme }) => theme.fonts.regular};
    border-radius: 5px;
    padding: 18px 16px;
    margin-bottom: 8px;
    `;

export const Options = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark}
  font-size:${RFValue(14)}px;
  `;
//@ts-ignore
export const Icon = styled(Feather)`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
