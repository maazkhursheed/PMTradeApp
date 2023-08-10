import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import NativeWrapper from "~root/Components/NativeWrapper";
import { SectionSOBQuotesActions } from "~root/Reducers/MaterialSectionsSOBQuotesReducers";
import CustomIcon from "../CustomIcon";
import style from "./MaterialsStageOfBuildItemStyle";

interface OwnProps {
  item: any;
  estimateNumber?: string;
}

type Props = OwnProps;

const MaterialsStageOfBuildItem: React.SFC<Props> = ({ item }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const performNavigation = React.useCallback(() => {
    dispatch(SectionSOBQuotesActions.setSOBScreenInfo({ screenName: item.item.name, sobId: item.item.id }));
    navigation.navigate("MaterialsScreen", {
      screen: "MaterialsScreen",
    });
  }, [item]);

  return (
    <NativeWrapper onPress={performNavigation}>
      <View style={style.container}>
        <Text style={style.description}>{item.item.name}</Text>
        <Text style={style.products}>
          {item.item.productCount}
          {item.item.productCount === 1 ? " product" : " products"}
        </Text>
        <CustomIcon style={style.iconStyle} name={"chevron-right"} />
      </View>
    </NativeWrapper>
  );
};

export default MaterialsStageOfBuildItem;
