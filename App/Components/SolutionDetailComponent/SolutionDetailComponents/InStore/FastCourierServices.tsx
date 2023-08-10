import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import style from "~root/Components/SolutionDetailComponent/SolutionDetailComponentStyle";
import { RootState } from "~root/Reducers";

interface OwnProps {}

interface IStateProps {}

type Props = OwnProps & IStateProps;

const FastCourierServices: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={style.textStyle}>
        Are you running low of some consumables? Are there products that you need fast to continue work on the site? Simply go to "Courier orders" on this app
        and order the products you need. We have an courier option to get what you need to you in 60 minutes meaning no more lost time or missing people from
        the job. You can also give your store a call and order your products to be delivered quickly.
      </Text>
      <View style={style.separator} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OrderProduct", {
            categoryId: ":Sort By:category:root",
          });
        }}
      >
        <Text style={style.textURLStyle}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: RootState): IStateProps => ({});

export default connect(mapStateToProps)(FastCourierServices);
