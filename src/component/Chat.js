import React, { useEffect, useRef } from 'react';
import { MATCHED, WAITING, AFTER_JOIN } from '../constants/status';

const Chat = props => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [ props.messageHistory, props.userStatus ]);

  const isAllowedWriteMessage = props.userStatus === MATCHED;
  const isAllowedSendButton = isAllowedWriteMessage && props.currentMessage;

  const handleSendButtonClick = event => {
    event.preventDefault();
    props.sendMessage(props.currentMessage);
  };

  const handleMessageChange = event => {
    props.changeMessage(event.target.value);
  };

  const renderMessages = messages => {
    return messages.map((message, i) => {
      if (message.isMine) {
        return (
          <li key={i + Math.random()} className='message from-me'>
            <div>{message.text}</div>
          </li>
        );
      }
      return (
        <li key={i + Math.random()} className='message from-partner'>
          <div>{message.text}</div>
        </li>
      );
    });
  };

  const renderMessageListByStatus = () => {
    switch (props.userStatus) {
      case AFTER_JOIN:
        return (
          <div>
            <div className='start-message'>
              <span>{props.startMessage}</span>
              <i className='far fa-handshake' />
            </div>
            {renderMessages(props.messageHistory)}
            <li className='end-message'>
              <span>{props.endMessage}</span>
              <i className='fas fa-mitten' />
            </li>
          </div>
        );

      case WAITING:
        return (
          <div className='waiting-message'>
            <i className='fas fa-search' />
            <span>대화상대를 찾고 있습니다.</span>
          </div>
        );

      case MATCHED:
        return (
          <div>
            <div className='start-message'>
              <span>{props.startMessage}</span>
              <i className='far fa-handshake' />
            </div>
            {renderMessages(props.messageHistory)}
            <div className='partner-writing-message'>
              <span>
                {props.partnerWritingMessage}
              </span>
            </div>
          </div>
        );

      default:
        return;
    }
  };

  return (
    <div className='chat-window'>
      <header>
        <button
          className='leave-button'
          onClick={props.leaveChat}
        >
          <i className='fas fa-chevron-circle-left' />
          <span>EXIT</span>
        </button>
        <h2>RANDOM CHAT</h2>
        <button
          className='next-button'
          onClick={() => props.restartChat(props.userName)}
        >
          <span>NEXT</span>
          <i className='fas fa-chevron-circle-right' />
        </button>
      </header>
      <ul className='message-history'>
        {renderMessageListByStatus()}
        <li className='end-message-list' ref={messagesEndRef} />
      </ul>
      <div className='message-input'>
        <form
          onSubmit={(event) => handleSendButtonClick(event)}
        >
          <input
            type='text'
            className='message-input-text'
            placeholder={isAllowedWriteMessage ? 'Enter Your Message...' : ''}
            value={props.currentMessage}
            onChange={(event) => handleMessageChange(event)}
            disabled={isAllowedWriteMessage ? false : 'disabled'}
          />
          <input
            type='submit'
            className='message-input-submit'
            value='send'
            disabled={isAllowedSendButton ? false : 'disabled'}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
