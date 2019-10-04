import {
  CHANGE_INPUT_USERNAME,
  DISCONNECT_SOCKET,
  WAIT_FOR_MATCHING,
  JOIN_CHAT_ROOM,
  MATCHED_PARTNER,
  LEAVE_CHAT_ROOM
} from '../constants/actionType';
import {
  BEFORE_JOIN,
  AFTER_JOIN,
  WAITING,
  MATCHED
} from '../constants/status';

const initialState = {
  name: '',
  status: BEFORE_JOIN
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT_USERNAME:
      return Object.assign({...state}, {
        name: action.name
      });

    case WAIT_FOR_MATCHING:
      return Object.assign({...state}, {
        status: WAITING
      });

    case JOIN_CHAT_ROOM:
      return Object.assign({...state}, {
        status: AFTER_JOIN
      });

    case MATCHED_PARTNER:
      return Object.assign({...state}, {
        status: MATCHED
      });

    case DISCONNECT_SOCKET:
    case LEAVE_CHAT_ROOM:
      return Object.assign({...state}, {
        status: BEFORE_JOIN
      });

    default:
      return state;
  }
};

export default user;
