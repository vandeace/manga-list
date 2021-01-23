import { LOGIN } from "components/_redux/store/types";

const initialState = {
  data: [],
  isAuth: false,
  loading: false,
  error: false,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        isAuth: true,
        data: action.payload.data,
        loading: false,
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        isAuth: false,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducerUser;
