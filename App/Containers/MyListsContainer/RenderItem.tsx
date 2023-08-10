// Styles
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import MyListItem from "~root/Components/MyListItem";

const RenderItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <MyListItem
      item={item}
      onPress={() => {
        navigation.navigate("MyListDetail", {
          item,
        });
      }}
    />
  );
};

export default RenderItem;
