import { useEffect, useState } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import {
  BalanceItem,
  CalendarModal,
  Header,
  HistoryList,
} from "../../components";
import { HistoryType } from "../../components/HistoryList";

import api from "../../services/api";

import { format } from "date-fns";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Area, Background, List, ListBalance, Title } from "./styles";

const Home = () => {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);

  const [dateMovement, setDateMovement] = useState(new Date());

  const [movements, setMovements] = useState([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect((): any => {
    var isActive = true;
    var date = new Date(dateMovement);
    var onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
    var dateFormatted = format(onlyDate, "dd/MM/yyyy");

    async function getMovement() {
      const receives = await api.get("/receives", {
        params: {
          date: dateFormatted,
        },
      });
      const balance = await api.get("/balance", {
        params: {
          date: dateFormatted,
        },
      });
      if (isActive) {
        setListBalance(balance.data);
        setMovements(receives.data);
      }
    }

    getMovement();

    return () => (isActive = false);
  }, [isFocused, dateMovement]);

  async function handleDelete(id: string) {
    try {
      await api.delete("/receives/delete", {
        params: {
          item_id: id,
        },
      });

      setDateMovement(new Date());
    } catch (err) {
      console.log(err);
    }
  }

  function filterDateMovements(dateSelected: Date) {
    setDateMovement(dateSelected);
  }

  return (
    <Background>
      <Header title="Minhas movimentações" />
      <ListBalance
        data={listBalance}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />
      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="calendar-sharp" size={30} color="#121212" />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <HistoryList data={item as HistoryType} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </Background>
  );
};

export default Home;
