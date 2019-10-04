import React from 'react';
import Chat from './Chat';
import {
  DISCONNECTED,
  BEFORE_JOIN
} from '../constants/status';

const App = props => {
  const handleChatStartButtonClick = event => {
    event.preventDefault();
    if (props.userStatus === BEFORE_JOIN) {
      props.onChatStart(props.userName);
    }
  };

  const handleUserNameChange = event => {
    props.changeUserName(event.target.value);
  };

  const renderDisconnectMessage = () => {
    return (
      <div className='disconnect'>
        <div className='disconnect-message'>
          <div className='disconnect-message-title'>
            <span>DISCONNECTED!</span>
          </div>
          <div className='disconnect-message-content'>
            <span>Automatically try to reconnect.</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    if (props.connectionStatus === DISCONNECTED) {
      return renderDisconnectMessage();
    }

    return (
      <div className='main'>
        <div className='join'>
          <header>
            <h1>RANDOM CHAT</h1>
          </header>
          <form onSubmit={(event) => handleChatStartButtonClick(event)}>
            <div className="main-name">
              <div className="name-caption">이름을 입력해주세요.</div>
              <input
                type='text'
                value={props.userName}
                onChange={(event) => handleUserNameChange(event)}
              />
            </div>
            <div className='main-start'>
              <input
                type='submit'
                value='START'
                disabled={props.userName ? false : 'disabled'}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className='app-body'>
      {
        props.userStatus !== BEFORE_JOIN
        ? (
          <Chat
            userStatus={props.userStatus}
            userName={props.userName}
            currentMessage={props.currentMessage}
            startMessage={props.startMessage}
            endMessage={props.endMessage}
            messageHistory={props.messageHistory}
            partnerWritingMessage={props.partnerWritingMessage}
            changeMessage={props.changeMessage}
            sendMessage={props.sendMessage}
            restartChat={props.restartChat}
            leaveChat={props.leaveChat}
          />
        ) : renderMain()
      }
    </div>
  );
};

export default App;
