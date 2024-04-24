import React, { useMemo } from "react";
import { Balance, Container, Label } from "./styles";

interface Props {
  data: any;
}

export default function BalanceItem({ data }: Props) {
  const labelName = useMemo(() => {
    if (data.tag === "saldo") {
      return {
        label: "Saldo Atual",
        color: "#3b3bbf",
      };
    } else if (data.tag === "receita") {
      return {
        label: "Entradas de hoje",
        color: "#00b94a",
      };
    } else {
      return {
        label: "Saídas de hoje",
        color: "#Ef463a",
      };
    }
  }, [data]);

  return (
    <Container style={{ backgroundColor: labelName.color }}>
      <Label>{labelName.label}</Label>
      <Balance>R$ {data.saldo}</Balance>
    </Container>
  );
}
