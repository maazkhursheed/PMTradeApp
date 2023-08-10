import { Icon } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { splitAndMergeSearchSuggestion } from "~root/Lib/SearchSuggestion";
import styles from "./SearchSuggestionItemStyle";

interface Props {
  suggestion: string;
  keyword: string;
}

const SearchSuggestionItem: React.SFC<Props> = ({ suggestion, keyword }: Props) => (
  <View style={styles.container}>
    <Icon style={styles.icon} type={"FontAwesome5"} name={"search"} />
    <Text style={styles.text} numberOfLines={1}>
      {splitAndMergeSearchSuggestion(suggestion, keyword).map(item => {
        return item.isMatch ? (
          <Text key={item.text} style={styles.textHighlighted}>
            {item.text}
          </Text>
        ) : (
          <Text>{item.text}</Text>
        );
      })}
    </Text>
  </View>
);

export default SearchSuggestionItem;
