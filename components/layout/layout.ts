import styled from "styled-components/native";

export const Center = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View<{
  marginTop?: number;
  marginBottom?: number;
  background?: string;
  alignHorizontal?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
}>`
  width: 100%;
  flex-direction: row;
  margin-top: ${({ marginTop }) => marginTop || "0"}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"}px;
  background-color: ${({ background }) => background || "transparent"};
  justify-content: ${({ alignHorizontal }) => alignHorizontal || "flex-start"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "wrap"};
`;

export const Column = styled.View<{
  flex?: number;
  alignVertical?: "flex-start" | "center" | "flex-end";
}>`
  flex: ${({ flex }) => flex || 1};
  justify-content: ${({ alignVertical }) => alignVertical || "flex-start"};
`;

export const Margin = styled.View<{
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
}>`
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const Padding = styled.View<{
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}>`
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
  padding-left: ${({ paddingLeft }) => paddingLeft || 0}px;
  padding-right: ${({ paddingRight }) => paddingRight || 0}px;
`;
