import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import theme from "../../../global/styles/theme";

export const Container = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.shape}
    color: ${({ theme }) => theme.colors.text_dark}
    font-size: ${RFValue(14)}px;
    width: 100%;
    textAlignVertical: top;
    font-family: ${({ theme }) => theme.fonts.regular};
    border-radius: 5px;
    padding: 16px 18px;
    margin-bottom: 8px;
    `;
