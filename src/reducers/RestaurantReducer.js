import {
  GET_REST_ATTEMPING,
  GET_REST_FAILED,
  GET_REST_SUCCESS,
} from "../actions/Types";

const INITIAL_STATE = {
  loading: false,
  restuarant: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REST_ATTEMPING:
      return { ...state, loading: true };

    case GET_REST_FAILED:
      return { loading: false, error: action.payload };

    case GET_REST_SUCCESS:
      return { restuarant: action.payload, loading: false };

    default:
      return state;
  }
};
