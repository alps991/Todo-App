import axios from 'axios';

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

export const logout = () => ({
  type: 'LOGOUT'
});