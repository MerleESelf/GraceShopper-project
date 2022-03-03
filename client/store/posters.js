import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_POSTERS = "GET_ALL_POSTERS";

/**
 * ACTION CREATORS
 */
const setPosters = (posters) => ({ type: GET_ALL_POSTERS, posters });

/**
 * THUNK CREATORS
 */
export const getAllPosters = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/posters");
    const posters = data;
    dispatch(setPosters(posters));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_POSTERS:
      return action.posters;
    default:
      return state;
  }
}