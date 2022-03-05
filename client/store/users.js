import axios from "axios";

const GET_USERS = "GET_USERS";


const gotUsers = (users) => ({
  type: GET_USERS,
  users,
});

export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/admin/users',{ params: {
        boo: token
      }});
      dispatch(gotUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};
