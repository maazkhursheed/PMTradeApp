import React from "react";
import { connect } from "react-redux";
import LoadingView from "~root/Components/LoadingView";
import { RootState } from "~root/Reducers";
import SectionRenderList from "./SectionRenderList";

interface StateProps {
  cartLoading: boolean;
}

interface OwnProps {
  onSelect: (jobs: any[]) => void;
}

export type Props = StateProps & OwnProps;

export const TradeAccountContext = React.createContext<OwnProps | undefined>(undefined);

const TradeAccount: React.SFC<Props> = ({ cartLoading, onSelect }: Props) => {
  return (
    <TradeAccountContext.Provider value={{ onSelect }}>
      <LoadingView isLoading={cartLoading} style={{ flex: 1 }}>
        <SectionRenderList />
      </LoadingView>
    </TradeAccountContext.Provider>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  cartLoading: state?.cart?.fetching,
});

export default connect(mapStateToProps)(TradeAccount);
