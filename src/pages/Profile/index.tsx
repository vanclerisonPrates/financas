import React, { useContext } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Header } from "../../components";

import { AuthContext } from "../../contexts/auth";

import {
  Container,
  LogoutButton,
  LogoutText,
  Message,
  NewLink,
  NewText,
  Nome,
} from "./styles";

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user, signOut } = useContext(AuthContext);
  return (
    <Container>
      <Header title="Meu perfil" />
      <Message>Hey, bem vindo de volta!</Message>
      <Nome numberOfLines={1}>{user?.name}</Nome>
      <NewLink onPress={() => navigation.navigate("Register")}>
        <NewText>Fazer registro</NewText>
      </NewLink>
      <LogoutButton onPress={signOut}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
}
