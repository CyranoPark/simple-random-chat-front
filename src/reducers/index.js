import { combineReducers } from 'redux';
import user from './user';
import messages from './messages';
import connection from './connection';

export default combineReducers({
  user,
  connection,
  messages
});
