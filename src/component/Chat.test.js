import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('<Chat />', () => {
  let userName = 'hanjun';
  let userStatus = 'AFTER_JOIN';
  let startMessage = '';
  let currentMessage = '';
  let endMessage = '';
  let messageHistory = [];
  let partnerWritingMessage = '';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Chat
        userStatus={userStatus}
        userName={userName}
        currentMessage={currentMessage}
        startMessage={startMessage}
        endMessage={endMessage}
        messageHistory={messageHistory}
        partnerWritingMessage={partnerWritingMessage}
      />
    );
  });

  describe('Chat component test', () => {
    it('should render chat-window class', () => {
      expect(wrapper.find('.chat-window').length).toBe(1);
    });

    describe('Chat window default rendering', () => {
      it('should have the Exit button and the Next Chat button.', () => {
        expect(wrapper.find('.leave-button').length).toBe(1);
        expect(wrapper.find('.next-button').length).toBe(1);
      });

      it('should have h2 tag which text content is "RANDOM CHAT"', () => {
        expect(wrapper.find('h2').length).toBe(1);
        expect(wrapper.find('h2').text()).toBe('RANDOM CHAT');
      });

      it('should have message history class and this is rendered by messageHistory.length', () => {
        expect(wrapper.find('.message-history').length).toBe(1);

        wrapper.setProps({
          messageHistory : [{
            text: 'test',
            isMine: true
          }, {
            text: 'test1',
            isMine: false
          }]
        });

        expect(wrapper.find('.message').length).toBe(2);
        expect(wrapper.find('.from-me').length).toBe(1);
        expect(wrapper.find('.from-me').text()).toBe('test');
        expect(wrapper.find('.from-partner').length).toBe(1);
        expect(wrapper.find('.from-partner').text()).toBe('test1');
      });

      it('form text should be rendered allowed when userStatus is MATCHED', () => {
        expect(wrapper.find('form .message-input-text').length).toBe(1);
        wrapper.setProps({
          userStatus : 'MATCHED'
        });

        expect(wrapper.find('form .message-input-text[disabled="disabled"]').length).toBe(0);

        wrapper.setProps({
          userStatus : 'WAITING'
        });

        expect(wrapper.find('form .message-input-text[disabled="disabled"]').length).toBe(1);
      });

      it('form submit button should be rendered allowed when userStatus is MATCHED and currentMessage is not empty', () => {
        expect(wrapper.find('form .message-input-submit').length).toBe(1);
        wrapper.setProps({
          userStatus : 'MATCHED',
          currentMessage: 'test'
        });

        expect(wrapper.find('form .message-input-submit[disabled="disabled"]').length).toBe(0);

        wrapper.setProps({
          userStatus : 'MATCHED',
          currentMessage: ''
        });

        expect(wrapper.find('form .message-input-submit[disabled="disabled"]').length).toBe(1);
      });
    });
    describe('Chat window rendering by user status', () => {
      it('start message, message history, end message should be rendered if user state is AFTER_JOIN', () => {
        wrapper.setProps({
          userStatus : 'AFTER_JOIN',
          startMessage: 'start!',
          endMessage: 'bye',
          messageHistory : [{
            text: 'test',
            isMine: true
          }, {
            text: 'test1',
            isMine: false
          }]
        });

        expect(wrapper.find('.start-message').length).toBe(1);
        expect(wrapper.find('.end-message').length).toBe(1);
        expect(wrapper.find('.message').length).toBe(2);
        expect(wrapper.find('.start-message').text()).toBe('start!');
        expect(wrapper.find('.end-message').text()).toBe('bye');
        expect(wrapper.find('.from-me').text()).toBe('test');
        expect(wrapper.find('.from-partner').text()).toBe('test1');
      });

      it('waiting message should be rendered if user state is WAITING', () => {
        wrapper.setProps({
          userStatus : 'WAITING'
        });

        expect(wrapper.find('.waiting-message').length).toBe(1);
        expect(wrapper.find('.start-message').length).toBe(0);
        expect(wrapper.find('.end-message').length).toBe(0);
        expect(wrapper.find('.message').length).toBe(0);
        expect(wrapper.find('.waiting-message').text()).toBe('대화상대를 찾고 있습니다.');
      });

      it('start message, message history, partner-writing-message should be rendered if user state is MATCHED', () => {
        wrapper.setProps({
          userStatus : 'MATCHED',
          startMessage: 'start!',
          partnerWritingMessage: 'writing',
          messageHistory : [{
            text: 'test',
            isMine: true
          }, {
            text: 'test1',
            isMine: false
          }]
        });

        expect(wrapper.find('.start-message').length).toBe(1);
        expect(wrapper.find('.end-message').length).toBe(0);
        expect(wrapper.find('.partner-writing-message').length).toBe(1);
        expect(wrapper.find('.message').length).toBe(2);
        expect(wrapper.find('.start-message').text()).toBe('start!');
        expect(wrapper.find('.partner-writing-message').text()).toBe('writing');
        expect(wrapper.find('.from-me').text()).toBe('test');
        expect(wrapper.find('.from-partner').text()).toBe('test1');
      });
    });

    describe('Chat simulating test', () => {
      it('should called leaveChat when click form leave button.', () => {
        let leaveChat = jest.fn();

        wrapper.setProps({
          leaveChat : leaveChat
        });

        expect(leaveChat).not.toHaveBeenCalled();
        expect(wrapper.find('.leave-button').length).toBe(1);
        wrapper.find('.leave-button').simulate('click');
        expect(leaveChat).toHaveBeenCalled();
      });

      it('should called restartChat when click form next button.', () => {
        let restartChat = jest.fn();

        wrapper.setProps({
          restartChat : restartChat
        });

        expect(restartChat).not.toHaveBeenCalled();
        expect(wrapper.find('.next-button').length).toBe(1);
        wrapper.find('.next-button').simulate('click');
        expect(restartChat).toHaveBeenCalled();
      });

      it('should called sendMessage when click form submit button.', () => {
        let sendMessage = jest.fn();
        let event = {};
        event.preventDefault = jest.fn();

        wrapper.setProps({
          sendMessage : sendMessage
        });

        expect(sendMessage).not.toHaveBeenCalled();
        expect(wrapper.find('.message-input > form').length).toBe(1);
        wrapper.find('.message-input > form').simulate('submit', event);
        expect(sendMessage).toHaveBeenCalled();
      });

      it('should called changeUserName when change form input text.', () => {
        let changeMessage = jest.fn();
        let event = {
          target: {
            value: 'hj'
          }
        };

        wrapper.setProps({
          changeMessage : changeMessage
        });

        expect(changeMessage).not.toHaveBeenCalled();
        expect(wrapper.find('.message-input input[type="text"]').length).toBe(1);
        wrapper.find('.message-input input[type="text"]').simulate('change', event);
        expect(changeMessage).toHaveBeenCalled();
      });
    });
  });
});
