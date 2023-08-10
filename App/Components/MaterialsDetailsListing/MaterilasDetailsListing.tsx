import React, { createContext, useContext, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import { accessibility } from "~root/Lib/DataHelper";
import { useQuoteWonOrLostStatus } from "~root/Lib/QuoteHelper";
import { RootState } from "~root/Reducers";
import { Colors } from "~root/Themes";
import { MaterialsDetailsHeader } from "./MaterialsDetailsHeader";
import styles from "./MaterialsDetailsListingStyle";
import MaterialListItem from "./MaterialsListItem";

interface OwnProps {
  data: any[];
  scrollY: Animated.Value;
  onEndReached: () => void;
  isMaterialsList?: boolean;
}

interface StateProps {
  isLoading: boolean;
  pagination: any;
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

export const SwapContext = createContext<{ onSwapSuccess?: () => void }>({ onSwapSuccess: () => console.log("default") });

export const useSwapContext = () => useContext(SwapContext);

const MaterialsDetailsListing: React.FC<Props> = ({ data, isLoading, scrollY, onEndReached, pagination, isMaterialsList }: Props) => {
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
  const isQuoteWonOrLost = useQuoteWonOrLostStatus();
  const listRef = useRef();
  return (
    <SwapContext.Provider
      value={{
        onSwapSuccess: () => {
          listRef.current?.scrollToPosition(0, 0, true);
        },
      }}
    >
      <LoadingView style={styles.loadingView} isLoading={isLoading}>
        <KeyboardAwareFlatList
          ref={listRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: data?.length === 0 ? 1 : undefined,
            borderTopColor: Colors.borderGrey,
            borderTopWidth: isQuoteWonOrLost ? 16 : 0,
          }}
          keyExtractor={(item, index) => item?.product?.code ?? index}
          onEndReachedThreshold={0.02}
          ListHeaderComponent={!isMaterialsList ? <MaterialsDetailsHeader dataLength={isLoading ? 0 : data?.length} /> : undefined}
          data={data}
          renderItem={({ item, index }) => <MaterialListItem item={item} index={index} isMaterialsList={isMaterialsList} />}
          bounces={false}
          onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          {...accessibility(!isMaterialsList ? "orderItemsFlatList" : "materialItemsFlatList")}
          onTouchStart={() => setOnEndReachedCalledDuringMomentum(false)}
          onEndReached={() => {
            if (!isMaterialsList && !onEndReachedCalledDuringMomentum && pagination?.currentPage < pagination?.totalPages - 1) {
              onEndReached();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          ListEmptyComponent={
            <View style={styles.emptyViewContainer}>
              <View style={{ flex: 3 }} />
              {!isQuoteWonOrLost && <Text style={styles.emptyViewText}>No products added yet.</Text>}
            </View>
          }
        />
      </LoadingView>
    </SwapContext.Provider>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isLoading: state.quotes?.fetching,
  pagination: state.quotes?.quotesProducts?.pagination,
});

export default connect(mapStateToProps)(MaterialsDetailsListing);
