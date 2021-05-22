import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import addressReducer from './address';
import certificateReducer from './certificate';
import loginReducer from './login';
import signupReducer from './signup';
import matchReducer from './match';
import profileReducer from './profile';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  adr: addressReducer,
  cer: certificateReducer,
  log: loginReducer,
  sig: signupReducer,
  mat: matchReducer,
  pro: profileReducer,
  router: connectRouter(history),
});

export default rootReducer;
