import * as React from "react";
import { Text, TextInput, View } from "react-native";
import colors from "~root/Themes/Colors";
import { occludeSensitiveView } from "../../../Lib/DataHelper";
import style from "./QuoteEmailSubjectStyles";

interface OwnProps {
  subject: string;
  setSubject: (subject: string) => void;
}

type Props = OwnProps;

const QuoteEmailSubject: React.FunctionComponent<Props> = ({ subject, setSubject }: Props) => {
  return (
    <View style={style.container}>
      <Text style={style.subject}>{"Subject:"}</Text>
      <View ref={occludeSensitiveView} style={style.emailsContainerView}>
        <TextInput
          ref={occludeSensitiveView}
          autoCapitalize="none"
          autoCorrect={false}
          style={style.inputStyle}
          value={subject}
          selectionColor={colors.lightBlue}
          onChangeText={setSubject}
        />
      </View>
    </View>
  );
};

export default QuoteEmailSubject;
