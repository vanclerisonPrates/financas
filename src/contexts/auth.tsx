import React, { ReactNode, createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProviderProps = {
  children?: ReactNode | undefined;
};

type AuthContextType = {
  user?: { id: string; name: string; email: string } | null;
  signUp: (nome: string, email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  loadingAuth: boolean;
  signed: boolean;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthContextProviderProps) {
  const navigation = useNavigation();

  const [user, setUser] = useState<AuthContextType["user"]>();
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@finToken");
      if (storageUser) {
        const response = await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });

        api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;
        setUser(response?.data);
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(email: string, password: string, nome: string) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/users", {
        name: nome,
        email: email,
        password: password,
      });
      setLoadingAuth(false);
      navigation.goBack();

      return response;
    } catch (err) {
      console.log("ERRO AO CADASTRAR", err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };

      await AsyncStorage.setItem("@finToken", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user?.id,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
