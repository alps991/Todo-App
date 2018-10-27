import axios from 'axios';
import { clearTodos } from './todos';

export const login = (token) => ({
  type: 'LOGIN',
  token
});

export const startLogin = (email, password) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'https://todos-alps.herokuapp.com/users/login',
      data: {
        email,
        password
      }
    }).then((res) => {
      dispatch(login(res.data['x-auth']));
      console.log('this is the res');
      console.log(res);
    }).catch((err) => {
      console.log('this the error');
      console.log(err);
    });
  }
}

export const startRegister = (email, password) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'https://todos-alps.herokuapp.com/users/',
      data: {
        email,
        password
      }
    }).then((res) => {
      dispatch(login(res.data['x-auth']));
      console.log('this is the res');
      console.log(res);
    }).catch((err) => {
      console.log('this the error');
      console.log(err);
    });
  }
}

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = (token) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: 'https://todos-alps.herokuapp.com/users/me/token',
      headers: {
        'x-auth': token
      }
    }).then((res) => {
      dispatch(logout());
      dispatch(clearTodos());
      console.log('successfully logged out');
    }).catch((err) => {
      console.log('this the error');
      console.log(err);
    });
  }
}