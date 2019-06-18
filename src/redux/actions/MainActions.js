import { SET_DEFAULT_TIME, SET_PROP } from "./ActionsTypes";

export const setStartTime = () => {
  return {
    type: SET_DEFAULT_TIME
  };
};

export const setProp = (prop, value) => ({
  type: SET_PROP,
  payload: { prop, value }
});
