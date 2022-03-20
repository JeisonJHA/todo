import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

import api from '../services/api';
import { deleteToken, getToken, isAuthenticated, saveToken, userName } from '../services/auth';

const initialState = {
  logged: isAuthenticated() || false,
  token: getToken() || '',
  userName: userName() || ''
}

export const authentication = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.logged = action.payload;
    },
    logout: (state) => {
      state.logged = false;
      state.token = '';
      state.userName = '';
      deleteToken();
    },
    signup: (state, action) => {
      state.logged = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    getUser: (state, action) => {
      if (action.payload) {
        const decoded = jwt(action.payload);
        state.userName = decoded.userName;
      }
    }
  }
})

export const { signin, logout, signup, token, getUser } = authentication.actions

export default authentication.reducer;

export function asyncSignIn({ login, password, navigate }) {
  return async function (dispatch) {
    try {
      const response = await api.post("/login", {
        login, password
      });
      dispatch(token(response.data.token));
      saveToken(response.data.token);
      dispatch(getUser(response.data.token));
      dispatch(signin(true));
      navigate("/app", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  }
}

export function asyncSignUp({ login, userName, password, navigate }) {
  return async function (dispatch) {
    try {
      const response = await api.post("/signup", {
        login, userName, password
      });
      dispatch(token(response.data.token));
      saveToken(response.data.token);
      dispatch(getUser(response.data.token));
      dispatch(signup(true));
      navigate("/app", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  }
}
