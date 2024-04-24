import { useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { ptBr } from "./LocaleCalendar";
import {
  ButtonFilter,
  ButtonFilterText,
  Container,
  ModalContent,
} from "./styles";

interface CalendarModalProps {
  setVisible: () => void;
  handleFilter: (date: Date) => void;
}

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

export default function CalendarModal({
  setVisible,
  handleFilter,
}: CalendarModalProps) {
  const [dateNow, setDateNow] = useState(new Date());

  const [markedDates, setMarkedDates] = useState({});

  function handleOnDayPress(date: DateData) {
    setDateNow(new Date(date.dateString));

    var markedDay: any = {};
    markedDay[date.dateString] = {
      selected: true,
      selectedColor: "#3b3ddf",
      textColor: "#fff",
    };

    setMarkedDates(markedDay);
  }

  function handleFiterDate() {
    handleFilter(dateNow);
    setVisible();
  }
  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{ flex: 1 }}>
          <Text>Teste</Text>
        </View>
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths
          theme={{
            todayTextColor: "#ff0000",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#fff",
          }}
        />
        <ButtonFilter onPress={handleFiterDate}>
          <ButtonFilterText>Filtrar</ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  );
}
