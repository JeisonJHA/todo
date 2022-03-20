import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authentication from './authentication'
import todo from './todo'

const reducer = combineReducers({
  todo,
  auth: authentication,
});

export const store = configureStore({
  reducer,
})
