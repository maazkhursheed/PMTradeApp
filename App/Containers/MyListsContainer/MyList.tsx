import * as React from "react";
import { FlatList } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import style from "./MyListsContainerStyle";
import RenderItem from "./RenderItem";

const MyList: React.FC<{ myLists: any[] }> = props => {
  return (
    <FlatList
      contentContainerStyle={style.containerStyle}
      bounces={false}
      scrollEventThrottle={16}
      {...accessibility("myListDetails")}
      data={props.myLists}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <RenderItem item={item} />}
    />
  );
};

export default MyList;
