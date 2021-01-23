import { GET_COLLECTION } from "components/_redux/store/types";

const initialState = {
  data: [],
  loadingCollection: false,
  errorCollection: false,
};

const reducerCollection = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_COLLECTION}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_COLLECTION}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case `${GET_COLLECTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducerCollection;
