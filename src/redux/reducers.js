import { combineReducers } from 'redux';

import loginReducer from 'pages/Login/reducer';

const reducers = combineReducers({
    loginState: loginReducer
})

export default reducers;