import { connect } from 'react-redux';
import App from '../component/App';
import io from 'socket.io-client';
import {
  JOIN_CHAT,
  MATCHED_PARTNER,
  WRITING_MESSAGE,
  SEND_MESSAGE,
  START_CHAT,
  START_PARTNER_WRITING,
  COMPLETE_PARTNER_WRITING,
  RECIEVE_MESSAGE,
  LEAVE_ROOM,
  END_CHAT
} from '../constants/events';
import {
  connectSocket,
  disconnectSocket,
  joinChatRoom,
  waitForMatching,
  matchedWithPartner,
  leaveChatRoom,
  changeInputUsername,
  changeInputMessage,
  initializeInputMessage,
  recieveStartMessage,
  addNewMessage,
  startPartnerWriting,
  completePartnerWriting,
  recieveEndMessage,
  initializeMessages
} from '../actions';
import { SOCKET_API } from '../api/socket';

const socket = io(SOCKET_API);

const socketConfig = dispatch => {
  socket.on('connect', () => {
    dispatch(connectSocket());
  });

  socket.on('disconnect', () => {
    dispatch(initializeMessages());
    dispatch(disconnectSocket());
  });

  socket.on(MATCHED_PARTNER, () => {
    dispatch(matchedWithPartner());
  });

  socket.on(START_CHAT, message => {
    dispatch(recieveStartMessage(message.text));
  });

  socket.on(RECIEVE_MESSAGE, message => {
    if (socket.id === message.from) {
      message.isMine = true;
    } else {
      message.isMine = false;
    }
    dispatch(addNewMessage(message));
  });

  socket.on(START_PARTNER_WRITING, message => {
    dispatch(startPartnerWriting(message.text));
  });

  socket.on(COMPLETE_PARTNER_WRITING, () => {
    dispatch(completePartnerWriting());
  });

  socket.on(END_CHAT, message => {
    dispatch(recieveEndMessage(message.text));
    dispatch(joinChatRoom());
    socket.emit(LEAVE_ROOM);
  });
};

const mapStateToProps = state => {
  const { name: userName, status: userStatus } = state.user;
  const {
    currentMessage,
    startMessage,
    endMessage,
    history: messageHistory,
    partnerWritingMessage
  } = state.messages;

  return {
    connectionStatus: state.connection.status,
    userName,
    userStatus,
    startMessage,
    currentMessage,
    endMessage,
    messageHistory,
    partnerWritingMessage
  };
};

const mapDispatchToProps = dispatch => {
  socketConfig(dispatch);

  return{
    reconnectSocket: () => {
      socket.connect();
      dispatch(connectSocket())
    },
    changeUserName: name => {
      dispatch(changeInputUsername(name));
    },
    onChatStart: userName => {
      socket.emit(JOIN_CHAT, userName);
      dispatch(waitForMatching());
    },
    restartChat: userName => {
      socket.emit(LEAVE_ROOM);
      socket.emit(JOIN_CHAT, userName);
      dispatch(initializeMessages());
      dispatch(waitForMatching());
    },
    leaveChat: () => {
      socket.emit(LEAVE_ROOM);
      dispatch(leaveChatRoom());
      dispatch(initializeMessages());
    },
    sendMessage: message => {
      socket.emit(SEND_MESSAGE, message);
      dispatch(initializeInputMessage());
    },
    changeMessage: message => {
      socket.emit(WRITING_MESSAGE);
      dispatch(changeInputMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
