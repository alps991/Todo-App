export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        loggedIn: true
      };
    case 'LOGOUT':
      return {
        loggedIn: false
      }
    default:
      return state;
  }
};
