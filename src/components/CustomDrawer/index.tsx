import React, { useContext } from "react";
import { Text, Image, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { user, signOut } = useContext(AuthContext);
  return (
    <>
      <DrawerContentScrollView
        style={{ flex: 1, borderColor: "#121212", borderWidth: 1 }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 90, height: 90 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18, marginTop: 14 }}>Bem-vindo</Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 14,
              paddingHorizontal: 20,
            }}
            numberOfLines={1}
          >
            {user?.name}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        style={{
          position: "absolute",
          bottom: 0,

          width: "90%",
          height: 50,
        }}
        {...props}
        label="Sair"
        onPress={signOut}
        labelStyle={{
          color: "#c62c36",
        }}
      />
    </>
  );
}
