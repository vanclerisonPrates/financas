import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: rgba(34, 34, 34, 0.4);
`;

export const ModalContent = styled.View`
  flex-grow: 0.1;
  justify-content: center;
  background-color: #fff;
  padding: 14px;
`;

export const ButtonFilterText = styled.Text`
  font-weight: bold;
  font-size: 19px;
  color: #fff;
`;

export const ButtonFilter = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: #3b3ddf;
  align-items: center;
  justify-content: center;
  height: 50px;
`;
