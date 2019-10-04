import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  JOIN_CHAT_ROOM,
  WAIT_FOR_MATCHING,
  MATCHED_PARTNER,
  LEAVE_CHAT_ROOM,
  CHANGE_INPUT_USERNAME,
  CHANGE_INPUT_MESSAGE,
  INIT_INPUT_MESSAGE,
  RECIEVE_START_MESSAGE,
  RECIEVE_END_MESSAGE,
  ADD_NEW_MESSAGE,
  START_PARTNER_WRITING,
  COMPLETE_PARTNER_WRITING,
  INIT_MESSAGES
} from '../constants/actionType';

export const connectSocket = () => {
  return {
    type: CONNECT_SOCKET
  };
};

export const disconnectSocket = () => {
  return {
    type: DISCONNECT_SOCKET
  };
};

export const joinChatRoom = () => {
  return {
    type: JOIN_CHAT_ROOM
  };
};

export const waitForMatching = () => {
  return {
    type: WAIT_FOR_MATCHING
  };
};

export const matchedWithPartner = () => {
  return {
    type: MATCHED_PARTNER,
  };
};

export const leaveChatRoom = () => {
  return {
    type: LEAVE_CHAT_ROOM
  };
};

export const changeInputUsername = (name) => {
  return {
    type: CHANGE_INPUT_USERNAME,
    name
  };
};

export const changeInputMessage = (message) => {
  return {
    type: CHANGE_INPUT_MESSAGE,
    message
  };
};

export const initializeInputMessage = () => {
  return {
    type: INIT_INPUT_MESSAGE
  };
};

export const addNewMessage = (message) => {
  return {
    type: ADD_NEW_MESSAGE,
    message
  };
};

export const startPartnerWriting = (message) => {
  return {
    type: START_PARTNER_WRITING,
    message
  };
};

export const completePartnerWriting = () => {
  return {
    type: COMPLETE_PARTNER_WRITING
  };
};

export const initializeMessages = () => {
  return {
    type: INIT_MESSAGES
  };
};

export const recieveStartMessage = (message) => {
  return {
    type: RECIEVE_START_MESSAGE,
    message
  };
};

export const recieveEndMessage = (message) => {
  return {
    type: RECIEVE_END_MESSAGE,
    message
  };
};
