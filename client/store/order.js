import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_COMPLETE_ORDER = "GET_COMPLETE_ORDER";
const GET_OPEN_ORDER = "GET_OPEN_ORDER";
const ORDER_COMPLETE = "ORDER_COMPLETE"
/**
 * ACTION CREATORS
 */
const getCompleteOrder = (order) => ({ type: GET_COMPLETE_ORDER, order });

const getOpenOrder = (order) => ({ type: GET_OPEN_ORDER, order });

const orderComplete = (order) => ({
  type: ORDER_COMPLETE,
  order,
});

// const changeStorage = (order) => ({
//     type: ORDER_COMPLETE,
//     order,
//   });
/**
 * THUNK CREATORS
 */
export const fetchCompleteOrder = (orderId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/order/${orderId}`);
    const order = data;
    dispatch(getCompleteOrder(order));
  };
};

export const fetchOpenOrder = (userId) => {
    console.log('in the thunk')
    return async (dispatch) => {
      const { data } = await axios.get(`/api/order/${userId}`);
      const order = data;
      dispatch(getOpenOrder(order));
    };
  };

export const checkOutThunk = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/admin/posters/${id}`);
      dispatch(orderComplete(data));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COMPLETE_ORDER:
      return action.order;
    case GET_OPEN_ORDER:
      return action.order;
    case ORDER_COMPLETE:
      return action.order
    default:
      return state;
  }
}