import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawer } from "../components";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: "#3b3bbf",
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "#f0f2ff",
        drawerInactiveTintColor: "#121212",
      }}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Register" component={Register} />
      <AppDrawer.Screen name="Perfil" component={Profile} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
