import axios from 'axios';

/**
 * ACTION TYPES
 */

const REMOVED_POSTER = 'REMOVED_POSTER';

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */

export const removedPoster = (posterId) => ({
	type: REMOVED_POSTER,
	posterId,
});

/**
 * THUNK CREATORS
 */

export const removePosterFromCart = (poster) => {
	// return async (dispatch) => {
	// 	// try {
	// 	// 	await axios.delete('/api/cart', { data: poster });
	// 	// 	const action = removedPoster(poster);
	// 	// 	dispatch(action);
	// 	// } catch (error) {
	// 	// 	console.error(error);
	// 	// }
	// };
};

/**
 *
 * REDUCER
 */
export default function (
	state = {
		cart: {
			posters: [
				{
					id: 1,
					name: 'groomingbymoonlight',
					creator: 'carol merle',
					price: 20,
					size: '18" x 12"',
					quantity: 100,
					description: "It's a cat, it's a moon, what more would you want",
					imageUrl: 'https://loremflickr.com/320/240',
				},
				{
					id: 2,
					name: 'groomingbymoonlight-2',
					creator: 'carol merle',
					price: 20,
					size: '18" x 12"',
					quantity: 100,
					description: "It's a cat, it's a moon, what more would you want",
					imageUrl: 'https://loremflickr.com/320/240',
				},
				{
					id: 3,
					name: 'groomingbymoonlight-3',
					creator: 'carol merle',
					price: 20,
					size: '18" x 12"',
					quantity: 100,
					description: "It's a cat, it's a moon, what more would you want",
					imageUrl: 'https://loremflickr.com/320/240',
				},
			],
		},
	},
	action
) {
	switch (action.type) {
		case REMOVED_POSTER: {
			let posters = state.cart.posters.filter(
				(poster) => poster.id !== action.posterId
			);
			let cart = { ...state.cart, posters };
			return {
				...state,
				cart,
			};
		}

		default:
			return state;
	}
}
