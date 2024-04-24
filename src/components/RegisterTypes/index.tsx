import React, { useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { RegisterButton, RegisterContainer, RegisterLabel } from "./styles";

export type ExpensesType = "receita" | "despesa";

interface RegisterTypeProps {
  type: ExpensesType;
  sendTypeChanged: (value: ExpensesType) => void;
}

export default function RegisterType({
  type,
  sendTypeChanged,
}: RegisterTypeProps) {
  const [typeChecked, setTypeChecked] = useState(type);

  function changeType(type: ExpensesType) {
    setTypeChecked(type);
    sendTypeChanged(type);
  }

  return (
    <RegisterContainer>
      <RegisterButton
        check={typeChecked === "receita" ? true : false}
        onPress={() => changeType("receita")}
      >
        <Ionicons name="arrow-up" size={25} color="#121212" />
        <RegisterLabel>Receita</RegisterLabel>
      </RegisterButton>
      <RegisterButton
        check={typeChecked === "despesa" ? true : false}
        onPress={() => changeType("despesa")}
      >
        <Ionicons name="arrow-down" size={25} color="#121212" />
        <RegisterLabel>Despesa</RegisterLabel>
      </RegisterButton>
    </RegisterContainer>
  );
}
