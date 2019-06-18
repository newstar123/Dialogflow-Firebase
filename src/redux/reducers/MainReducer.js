import moment from "moment";
import { SET_DEFAULT_TIME, SET_PROP } from "../actions/ActionsTypes";

const initialState = { timeToday: moment(), timeWeek: null, timeMongth: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROP: {
      return { ...state, [payload.prop]: payload.value };
    }
    default:
      return state;
  }
};
