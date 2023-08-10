import React from "react";
import { SectionList, Text, View } from "react-native";
import { connect } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { RootState } from "~root/Reducers";
import Item from "./ListItem";
import style from "./TradeAccountStyle";

interface StateProps {
  filteredAccounts: [];
}

export type Props = StateProps;

const SectionRenderList: React.SFC<Props> = ({ filteredAccounts }: Props) => {
  return (
    <SectionList
      {...accessibility("tradeAccountSectionListID")}
      style={style.sectionList}
      sections={filteredAccounts ?? []}
      keyExtractor={(item, index) => item?.custId ?? index.toString()}
      renderItem={({ item }) => <Item item={item} />}
      contentContainerStyle={style.sectionContainerStyle}
      renderSectionHeader={({ section: { title } }) => (
        <View style={style.sectionHeaderTitle}>
          <Text {...accessibility("tradeAccount")} style={style.header}>
            {title}
          </Text>
        </View>
      )}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  filteredAccounts: state?.connectTrade?.dataTradeListUserInfo || [],
});

export default connect(mapStateToProps)(SectionRenderList);
