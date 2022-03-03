import axios from 'axios';

/**
 * ACTION TYPES
 */

const REMOVE_ITEM = 'REMOVE_ITEM';

/**
 * INITIAL STATE
 */
const defaultCart = {
	products: [],
};

/**
 * ACTION CREATORS
 */

const removeItem = (item) => ({ type: REMOVE_ITEM, item });

/**
 * THUNK CREATORS
 */

export const removeItemThunk = (item) => {
	return async (dispatch) => {
		const res = await axios.delete(
			`/api/cart/${item.id}/${item.cartDetail.orderId}`
		);

		dispatch(removeItem(item));
	};
};

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
	switch (action.type) {
		case REMOVE_ITEM:
			const newProducts = state.products.filter(
				(product) => product.id !== action.item.id
			);
			return { ...state, products: newProducts };

		default:
			return state;
	}
}
