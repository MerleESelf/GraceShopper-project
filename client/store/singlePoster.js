import axios from 'axios';

const GET_SINGLE_POSTER = 'GET_SINGLE_POSTER';

const gotAPoster = (poster) => ({
	type: GET_SINGLE_POSTER,
	poster,
});

export const fetchSinglePoster = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/posters/${id}`);
			dispatch(gotAPoster(data));
		} catch (err) {
			console.log(err);
		}
	};
};
const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_SINGLE_POSTER:
			return action.poster;
		default:
			return state;
	}
};
