import user from './user';
import messages from './messages';
import connection from './connection';
import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  CHANGE_INPUT_USERNAME,
  WAIT_FOR_MATCHING,
  JOIN_CHAT_ROOM,
  MATCHED_PARTNER,
  LEAVE_CHAT_ROOM,
  CHANGE_INPUT_MESSAGE,
  INIT_INPUT_MESSAGE,
  RECIEVE_START_MESSAGE,
  RECIEVE_END_MESSAGE,
  ADD_NEW_MESSAGE,
  START_PARTNER_WRITING,
  COMPLETE_PARTNER_WRITING,
  INIT_MESSAGES
} from '../constants/actionType';
import {
  DISCONNECTED,
  CONNECTED,
  BEFORE_JOIN,
  AFTER_JOIN,
  WAITING,
  MATCHED
} from '../constants/status';

const userInitialState = {
  name: '',
  status: 'BEFORE_JOIN'
};

const connectionInitialState = {
  status: 'DISCONNECTED'
};

const messagesInitialState = {
  history: [],
  currentMessage: '',
  startMessage: '',
  endMessage: '',
  partnerWritingMessage: ''
};

describe('reducer test', () => {
  describe('user reducer', () => {
    it('returns the initial state', () => {
      expect(user(undefined, {})).toEqual(userInitialState);
    });

    it('should handle change user name', () => {
      const action = {
        type: CHANGE_INPUT_USERNAME,
        name: 'hanjun'
      };
      expect(user(userInitialState, action).name).toEqual('hanjun');
      expect(user(userInitialState, action).status).toEqual(BEFORE_JOIN);

      action.name = 'park';
      expect(user(userInitialState, action).name).toEqual('park');
      expect(user(userInitialState, action).status).toEqual(BEFORE_JOIN);
    });

    it('shoud handle change user status by action', () => {
      const action = {
        type: WAIT_FOR_MATCHING
      };
      expect(user(userInitialState, action).status).toEqual(WAITING);

      action.type = JOIN_CHAT_ROOM;
      expect(user(userInitialState, action).status).toEqual(AFTER_JOIN);

      action.type = MATCHED_PARTNER;
      expect(user(userInitialState, action).status).toEqual(MATCHED);

      action.type = LEAVE_CHAT_ROOM;
      expect(user(userInitialState, action).status).toEqual(BEFORE_JOIN);

      action.type = DISCONNECT_SOCKET;
      expect(user(userInitialState, action).status).toEqual(BEFORE_JOIN);
    });

    it('state should be required immutability', () => {
      const action = {
        type: WAIT_FOR_MATCHING
      };
      let prevState = user(undefined, {});
      let nextState = user(prevState, action);

      expect(prevState === nextState).toEqual(false);

      action.type = LEAVE_CHAT_ROOM;
      prevState = nextState;
      nextState = user(prevState, action);

      expect(prevState === nextState).toEqual(false);
    });
  });

  describe('connection reducer', () => {
    it('returns the initial state', () => {
      expect(connection(undefined, {})).toEqual(connectionInitialState);
    });

    it('shoud handle change connection status by action', () => {
      const action = {
        type: DISCONNECT_SOCKET
      };
      expect(connection(connectionInitialState, action).status).toEqual(DISCONNECTED);

      action.type = CONNECT_SOCKET;
      expect(connection(connectionInitialState, action).status).toEqual(CONNECTED);
    });

    it('state should be required immutability', () => {
      const action = {
        type: DISCONNECT_SOCKET
      };
      let prevState = connection(undefined, {});
      let nextState = connection(prevState, action);

      expect(prevState === nextState).toEqual(false);

      action.type = CONNECT_SOCKET;
      prevState = nextState;
      nextState = connection(prevState, action);

      expect(prevState === nextState).toEqual(false);
    });
  });

  describe('messages reducer', () => {
    it('returns the initial state', () => {
      expect(messages(undefined, {})).toEqual(messagesInitialState);
    });

    describe('should handle change input message', () => {
      const action = {
        type: CHANGE_INPUT_MESSAGE,
        message: 'test1'
      };
      let result, result2, result3;

      it('Current message should be changed according to input message.', () => {
        result = messages(messagesInitialState, action);
        expect(result.currentMessage).toEqual('test1');
        expect(messagesInitialState === result).toEqual(false);

        action.message = 'test2';
        result2 = messages(result, action);
        expect(result2.currentMessage).toEqual('test2');
        expect(result2 === result).toEqual(false);
      });

      it('Current message should be initialized.', () => {
        delete action.message;
        action.type = INIT_INPUT_MESSAGE;
        result3 = messages(result, action);
        expect(result3.currentMessage).toEqual('');
        expect(result3 === result2).toEqual(false);
      });
    });

    describe('should be added messages in history', () => {
      const action = {
        type: ADD_NEW_MESSAGE,
        message: 'test1'
      };
      let result, result2, result3;

      it('New messages should be added to the message history.', () => {
        result = messages(messagesInitialState, action);
        expect(result.history).toEqual(['test1']);
        expect(messagesInitialState.history === result.history).toEqual(false);

        action.message = 'test2';
        result2 = messages(result, action);
        expect(result2.history).toEqual(['test1', 'test2']);
        expect(result2.history === result.history).toEqual(false);
      });

      it('Message history should be initialized.', () => {
        delete action.message;
        action.type = INIT_MESSAGES;
        result3 = messages(result, action);
        expect(result3.history).toEqual([]);
        expect(result3.history === result2.history).toEqual(false);
      });
    });

    describe('Make sure that the partner is writing.', () => {
      const action = {
        type: START_PARTNER_WRITING,
        message: 'writing'
      };
      let result, result2

      it('If partner is writing, should receive a message.', () => {
        result = messages(messagesInitialState, action);

        expect(result.partnerWritingMessage).toEqual('writing');
        expect(messagesInitialState.partnerWritingMessage === result.partnerWritingMessage).toEqual(false);
      });

      it('If partner stop writing, message should be initialized.', () => {
        delete action.message;
        action.type = COMPLETE_PARTNER_WRITING;
        result2 = messages(result, action);
        expect(result2.partnerWritingMessage).toEqual('');
        expect(result2.partnerWritingMessage === result.partnerWritingMessage).toEqual(false);
      });
    });

    describe('should receive a message at the start and end of the chat.', () => {
      let result

      it('If chat is started, should receive start message.', () => {
        const action = {
          type: RECIEVE_START_MESSAGE,
          message: 'start'
        };
        result = messages(messagesInitialState, action);

        expect(result.startMessage).toEqual('start');
        expect(messagesInitialState.startMessage === result.startMessage).toEqual(false);
      });

      it('If chat is started, should receive start message.', () => {
        const action = {
          type: RECIEVE_END_MESSAGE,
          message: 'end'
        };
        result = messages(messagesInitialState, action);

        expect(result.endMessage).toEqual('end');
        expect(messagesInitialState.endMessage === result.endMessage).toEqual(false);
      });
    });
  });
});
