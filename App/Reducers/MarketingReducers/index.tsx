import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { mapReducers, ReducerMap } from "~root/Lib/ReduxHelpers";

const { createStandardAction } = deprecated;
const actionCreators = {
  toggleIntro: createStandardAction("INTRO_SCREEN_VALUE")<string>(),
};
export const MarketingActions = actionCreators;

export interface MarketingState {
  showIntro: string;
}

export type ImmutableMarketingState = SI.ImmutableObject<MarketingState>;

export const INITIAL_STATE: ImmutableMarketingState = SI.from({
  showIntro: "true",
});

export const toggleIntro: Reducer<ImmutableMarketingState> = (state, { payload }) => {
  return state.merge({
    showIntro: payload,
  });
};

const reducerMap: ReducerMap<typeof actionCreators, ImmutableMarketingState> = {
  toggleIntro,
};

export const MarketingReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default MarketingReducer;
