import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { validateEmail } from "~root/Lib/StringHelper";
import colors from "~root/Themes/Colors";
import style from "./QuoteEmailItemStyle";

interface OwnProps {
  emailItem: any;
  onRemoveEmail: (index: number) => void;
  index: number;
}

type Props = OwnProps;

const QuoteEmailItem: React.FunctionComponent<Props> = ({ index, emailItem, onRemoveEmail }: Props) => {
  const [isEmailValid, setEmailValid] = React.useState(true);

  React.useEffect(() => setEmailValid(validateEmail(emailItem)), [emailItem]);

  return (
    <View style={[style.container, { backgroundColor: isEmailValid ? colors.borderGrey : colors.red }]}>
      <Text style={isEmailValid ? style.emailValid : style.emailInvalid}>{emailItem}</Text>
      <TouchableOpacity onPress={() => onRemoveEmail(index)} style={style.removeIcon}>
        <CustomIcon name={"clear"} style={isEmailValid ? style.removeValid : style.removeInvalid} />
      </TouchableOpacity>
    </View>
  );
};

export default QuoteEmailItem;
