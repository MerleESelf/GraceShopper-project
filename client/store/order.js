import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_COMPLETE_ORDER = "GET_COMPLETE_ORDER";
const GET_OPEN_ORDER = "GET_OPEN_ORDER";
const ORDER_COMPLETE = "ORDER_COMPLETE"
const EDIT_ORDER = "EDIT_ORDER"; 
const REMOVED_POSTER = 'REMOVED_POSTER';

/**
 * ACTION CREATORS
 */
const getCompleteOrder = (order) => ({ type: GET_COMPLETE_ORDER, order });

const getOpenOrder = (order) => ({ type: GET_OPEN_ORDER, order });

const orderComplete = (order) => ({
	type: ORDER_COMPLETE,
	order,
});


export const removedPoster = (order) => ({
	type: REMOVED_POSTER,
	order,
});

///:orderId/:posterId
export const removedPosterThunk = (userId, orderId, posterId) => async (dispatch) => {
	try {
		const { data: order } = await axios.delete(
			`/api/order/${userId}/${orderId}/${posterId}`
		);
		dispatch(removedPoster(order));
	} catch (error) {
		console.error(error);
	}
};

// const changeStorage = (order) => ({
//     type: ORDER_COMPLETE,
//     order,
//   });

const editOrder = (order) => ({type: EDIT_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchCompleteOrder = (userId, orderId) => {
	return async (dispatch) => {
		const { data } = await axios.get(`/api/order/${userId}/${orderId}`);
		const order = data;
		dispatch(getCompleteOrder(order));
	};
};

export const fetchOpenOrder = (userId) => {
	console.log('in the thunk');
	return async (dispatch) => {
		const { data } = await axios.get(`/api/order/${userId}`);
		const order = data;
		dispatch(getOpenOrder(order));
	};
};

export const checkOutThunk = (userId, orderId, history) => {
	return async (dispatch) => {
		try {
			//order complete
			console.log('in checkOutThunk');
			const { data } = await axios.put(`/api/order/${userId}/${orderId}`);
			// dispatch(orderComplete(data));
			//subtract quantity
			history.push('/thankyou');
		} catch (err) {
			console.log(err);
		}
	};
}

export const editOrderThunk = (orderId, posterId, poster) => {
  return async (dispatch) =>  {
    const { data: updated } = await axios.put(`/api/order/${orderId}/${posterId}`, poster); 
    dispatch(editOrder(updated)); 
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
			return action.order;
    	case EDIT_ORDER: 
      		return action.order
		case REMOVED_POSTER: 
      		return action.order

		default:
			return state;
	}
}

