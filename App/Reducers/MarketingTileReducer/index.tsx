import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { mapReducers, ReducerMap } from "~root/Lib/ReduxHelpers";
import { FailureRequestParam } from "~root/Types/CommonTypes";
const { createAction, createStandardAction } = deprecated;
const actionCreators = {
  requestMarketingTiles: createAction("REQUEST_MARKETING_TILES"),
  successMarketingTiles: createStandardAction("MARKETING_TILES_SUCCESS")<any>(),
  failure: createStandardAction("MARKETING_TILES_FAILURE")<FailureRequestParam>(),
};
export const MarketingTileActions = actionCreators;

export interface MarketingTileState {
  data: [] | any;
  fetching: boolean;
}

export type ImmutableMarketingTileState = SI.ImmutableObject<MarketingTileState>;

export const INITIAL_STATE: ImmutableMarketingTileState = SI.from({
  data: [],
  fetching: false,
});

export const requestMarketingTiles: Reducer<ImmutableMarketingTileState> = (state, action) =>
  state.merge({
    fetching: true,
  });

export const failure: Reducer<ImmutableMarketingTileState> = (state, action) =>
  state.merge({
    fetching: false,
  });

export const successMarketingTiles: Reducer<ImmutableMarketingTileState> = (state, action) =>
  state.merge({
    data: action.payload,
    fetching: false,
  });

const reducerMap: ReducerMap<typeof actionCreators, ImmutableMarketingTileState> = {
  requestMarketingTiles,
  successMarketingTiles,
  failure,
};

export const MarketingTileReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default MarketingTileReducer;
