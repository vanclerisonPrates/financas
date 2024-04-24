import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ButtonMenu, Container, Title } from "./styles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu-outline" size={35} color="#121212" />
      </ButtonMenu>
      {title && <Title>{title}</Title>}
    </Container>
  );
}
