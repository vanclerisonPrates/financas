import { Platform, Text, View } from "react-native";

import {
  AreaInput,
  Background,
  Container,
  Input,
  Link,
  LinkText,
  Logo,
  SubmitButton,
  SubmitText,
} from "./styles";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { navigate } = navigation;

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Logo source={require("../../assets/Logo.png")} />

        <AreaInput>
          <Input placeholder="Seu email" />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Sua senha" />
        </AreaInput>

        <SubmitButton activeOpacity={0.8}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigate("SignUp")}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;
