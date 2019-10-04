import {
  CHANGE_INPUT_MESSAGE,
  INIT_INPUT_MESSAGE,
  RECIEVE_START_MESSAGE,
  RECIEVE_END_MESSAGE,
  ADD_NEW_MESSAGE,
  START_PARTNER_WRITING,
  COMPLETE_PARTNER_WRITING,
  INIT_MESSAGES
} from '../constants/actionType';

const initialState = {
  history: [],
  currentMessage: '',
  startMessage: '',
  endMessage: '',
  partnerWritingMessage: ''
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT_MESSAGE:
      return Object.assign({...state}, {
        currentMessage: action.message
      });

    case INIT_INPUT_MESSAGE:
      return Object.assign({...state}, {
        currentMessage: ''
      });

    case ADD_NEW_MESSAGE:
      return Object.assign({...state}, {
        history: [...state.history, action.message]
      });

    case START_PARTNER_WRITING:
      return Object.assign({...state}, {
        partnerWritingMessage: action.message
      });

    case COMPLETE_PARTNER_WRITING:
      return Object.assign({...state}, {
        partnerWritingMessage: ''
      });

    case INIT_MESSAGES:
      return Object.assign({...state}, initialState);

    case RECIEVE_START_MESSAGE:
      return Object.assign({...state}, {
        startMessage: action.message
      });

    case RECIEVE_END_MESSAGE:
      return Object.assign({...state}, {
        endMessage: action.message
      });

    default:
      return state;
  }
};

export default messages;
