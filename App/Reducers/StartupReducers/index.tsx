import { deprecated } from "typesafe-actions";
const { createAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actions = {
  startup: createAction("startup"),
};

export const StartupActions = actions;
