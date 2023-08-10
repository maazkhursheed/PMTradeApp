import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { accessibility } from "~root/Lib/DataHelper";
import { isWonOrLostQuote } from "~root/Lib/StringHelper";
import style from "./QuotesListItemStyle";

export interface DispatchProps {}

interface OwnProps {
  item: any;
  quoteType?: any;
}

type Props = OwnProps & DispatchProps;

const QuotesListItem: React.SFC<Props> = ({ item, quoteType }: Props) => {
  const navigation = useNavigation();
  const onPress = React.useCallback(() => {
    navigation.navigate("QuoteDetails", {
      navParam: {
        quoteCode: item.code,
      },
    });
  }, [item.code]);

  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={style.accountsView} {...accessibility("QuoteListItem" + quoteType)}>
        <Text style={style.selectionItem}>{item.jobName}</Text>
        <Text style={style.valueItem}>{item.jobAddress?.formattedAddress}</Text>
      </View>
      {isWonOrLostQuote(item.status) && <Text style={style.viewOnlyText}>VIEW ONLY</Text>}
      <CustomIcon name={"chevron-right"} style={style.chevron} {...accessibility("QuoteListItemIcon")} />
    </TouchableOpacity>
  );
};

export default QuotesListItem;
