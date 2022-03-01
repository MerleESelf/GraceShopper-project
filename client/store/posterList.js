import axios from 'axios'

/**
 * ACTION TYPES
 */
 const GET_ALL_POSTERS = 'GET_ALL_POSTERS'

/**
 * ACTION CREATORS
 */
const setPosterList = (posters) => ({type: GET_ALL_POSTERS, posters})

/**
 * THUNK CREATORS
 */
// export const fetchPosterList = () => async dispatch => {
//   const token = window.localStorage.getItem(TOKEN)
//   if (token) {
//     const res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token
//       }
//     })
//     return dispatch(setAuth(res.data))
//   }
// }

export const fetchPosterList = () => async dispatch => {
  try {
    const data = await axios.get(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
