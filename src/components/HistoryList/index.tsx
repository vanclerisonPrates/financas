import { Alert, TouchableWithoutFeedback } from "react-native";

import { ExpensesType } from "../RegisterTypes";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Container, IconView, Type, TypeText, ValueText } from "./styles";

export type HistoryType = {
  type: ExpensesType;
  value: string;
  id: string;
};

interface HistoryProps {
  data: HistoryType;
  deleteItem: (value: string) => void;
}

export default function HistoryList({ data, deleteItem }: HistoryProps) {
  function handleDeleteItem() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja deletar esse registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => deleteItem(data.id),
        },
      ]
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleDeleteItem}>
      <Container>
        <Type>
          <IconView type={data.type}>
            <TypeText>{data.type}</TypeText>
            <Ionicons
              name={data.type === "despesa" ? "arrow-down" : "arrow-up"}
              size={20}
              color="#fff"
            />
          </IconView>
        </Type>
        <ValueText>R$ {data.value}</ValueText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
