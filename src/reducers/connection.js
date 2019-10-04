import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
} from '../constants/actionType';
import {
  DISCONNECTED,
  CONNECTED
} from '../constants/status';

const connection = (state = { status: DISCONNECTED }, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return Object.assign({...state}, {
        status: CONNECTED
      });
    case DISCONNECT_SOCKET:
      return Object.assign({...state}, {
        status: DISCONNECTED
      });
    default:
      return state;
  }
};

export default connection;
