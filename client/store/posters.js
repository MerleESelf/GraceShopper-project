import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_POSTERS = "GET_ALL_POSTERS";
const SET_POSTER = "SET_POSTER";
const REMOVE_POSTER = "REMOVE_POSTER";

/**
 * ACTION CREATORS
 */
const setPosters = (posters) => ({ type: GET_ALL_POSTERS, posters });


const createAPoster = (poster) => ({
  type: SET_POSTER,
  poster
})

const removeAPoster = (poster) => ({
  type: REMOVE_POSTER,
  poster
})
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

export const createPosterThunk = () => {
  return async (dispatch) => {
    try{
      const { data } = await axios.post('/api/posters');
      dispatch(createAPoster(data))
    } catch (err) {
      console.log(err);
    }
  }
}

export const removePosterThunk = (id, token) => {
  return async (dispatch) => {
    try{
      console.log("before axios call id, isAdmin", token)
      const { data } = await axios.delete(`/api/posters/${id}`, { params: {
        boo: token
      }})
      .then(response => response.status)
      .catch(err => console.warn(err));
      console.log("removethunk")
      dispatch(removeAPoster(data))
    } catch (err) {
      console.log(err);
    }
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_POSTERS:
      return action.posters;
    case REMOVE_POSTER:
      return state.filter((poster) => poster.id !== action.poster.id)
    case SET_POSTER:
      return [...state, action.poster]
    default:
      return state;
  }
}