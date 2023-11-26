import { StyleSheet } from "react-native";
import { View } from "../../components/themed";
import React from "react";
import { RegisterFormType } from "../../modules/register/form-type";
import firestore from "@react-native-firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useGetUsers } from "../../api-hook/user/query";
import { Button, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import { PaperSelect } from "react-native-paper-select";

export default function TabOneScreen() {
  const { data, isLoading } = useGetUsers();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [visible, setVisible] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string | undefined>();
  return (
    <View style={styles.container}>
      <TextInput
        label="test"
        placeholder="test"
        onPressIn={() => console.log("aw")}
      />
      <DatePickerInput
        inputMode="start"
        locale="en"
        onChange={(date) => setDate(date)}
        value={date}
      />
      <DropDown
        list={[
          {
            label: "test",
            value: "test",
          },
          {
            label: "test",
            value: "test-001",
          },
          {
            label: "test",
            value: "test-002",
          },
          {
            label: "test",
            value: "test-003",
          },
          {
            label: "test",
            value: "test-004",
          },
        ]}
        visible={visible}
        onDismiss={() => setVisible(false)}
        showDropDown={() => setVisible(true)}
        value={id}
        setValue={setId}
        label="testss"
      />
      <PaperSelect
        label="Select Gender"
        multiEnable={false}
        selectedArrayList={[]}
        onSelection={(e) => {
          console.log(e);
        }}
        textInputMode="outlined"
        value=""
        arrayList={[
          {
            _id: "001",
            value: "001",
          },
          {
            _id: "002",
            value: "002",
          },
          {
            _id: "003",
            value: "004",
          },
        ]}
      />
      <Button mode="contained">Test</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});
