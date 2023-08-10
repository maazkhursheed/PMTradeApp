import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import CustomIcon from "../CustomIcon";
import style from "./QuotesSectionStyle";

interface OwnProps {
  sectionTitle: string;
  sectionDescription: string;
  onPress: () => void;
  showTick?: boolean;
}

type Props = OwnProps;

const QuotesInfo: React.SFC<Props> = ({ showTick, sectionTitle, sectionDescription, onPress }: Props) => {
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();

  return (
    <TouchableOpacity style={style.sectionItemContainer} onPress={onPress}>
      <View style={style.container}>
        <Text style={style.sectionTitle}>{sectionTitle}</Text>
        <Text style={style.sectionDescription}>{sectionDescription}</Text>
      </View>
      {showTick && !isQuoteWonOrLost && (
        <View style={style.iconContainer}>
          <CustomIcon name={"tick"} style={style.icon} />
        </View>
      )}
      <CustomIcon name={"chevron-right"} style={style.chevron} />
    </TouchableOpacity>
  );
};

export default QuotesInfo;
