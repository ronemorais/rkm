const INITIAL_STATE = {
  isLogged: false,
  userLogged: {}
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOGGED':
      return {...state, isLogged: action.isLogged};
    case 'SET_USER_LOGGED':
      return {...state, userLogged: action.value};
    default:
      return state;
  }
}

export default loginReducer;
