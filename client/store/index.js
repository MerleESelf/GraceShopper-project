import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import allPosters from './posters'
import singlePoster from './singlePoster'
import cart from './cart'
import users from './users'
import order from './order'

const reducer = combineReducers({ auth, allPosters, singlePoster,cart, users, order})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
