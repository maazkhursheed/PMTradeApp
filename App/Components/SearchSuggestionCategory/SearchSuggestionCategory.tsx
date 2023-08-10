import { Icon } from "native-base";
import * as React from "react";
import { Text, View } from "react-native";
import { splitAndMergeSearchCategory } from "~root/Lib/SearchSuggestion";
import styles from "./SearchSuggestionCategoryStyle";

interface Props {
  suggestion: string;
  keyword: string;
}

const SearchSuggestionCategory: React.SFC<Props> = ({ suggestion, keyword }: Props) => (
  <View style={styles.container}>
    <Icon style={styles.icon} type={"MaterialCommunityIcons"} name={"arrow-top-left"} />
    <Text style={styles.text} numberOfLines={1}>
      <Text>{"in "}</Text>
      {splitAndMergeSearchCategory(suggestion, keyword).map(item => {
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

export default SearchSuggestionCategory;
