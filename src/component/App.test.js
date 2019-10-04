import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let connectionStatus = 'CONNECTED';
  let userName = 'hanjun';
  let userStatus = 'BEFORE_JOIN';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App
        connectionStatus={connectionStatus}
        userName={userName}
        userStatus={userStatus}
      />
    );
  });

  describe('App component test', () => {
    it('should render app-body class', () => {
      expect(wrapper.find('.app-body').length).toBe(1);
    });
    describe('main rendering test', () => {
      it('should render main if user status is BEFORE_JOIN.', () => {
        wrapper.setProps({
          userStatus : 'BEFORE_JOIN'
        });
        expect(wrapper.find('.main').length).toBe(1);
        expect(wrapper.find('.disconnect').length).toBe(0);
      });

      it('should render one form which can write name', () => {
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('.main-name').length).toBe(1);
        expect(wrapper.find('.main-start').length).toBe(1);
      });

      it('should not render if user status is not BEFORE_JOIN.', () => {
        wrapper.setProps({
          userStatus : 'WAITING'
        });
        expect(wrapper.find('form').length).toBe(0);
        expect(wrapper.find('.main-name').length).toBe(0);
        expect(wrapper.find('.main-start').length).toBe(0);

        wrapper.setProps({
          userStatus : 'MATCHED'
        });
        expect(wrapper.find('form').length).toBe(0);
        expect(wrapper.find('.main-name').length).toBe(0);
        expect(wrapper.find('.main-start').length).toBe(0);
      });

      it('submit button should be rendered disable status when username is none.', () => {
        wrapper.setProps({
          userName : 'hanjun'
        });

        expect(wrapper.find('form input[type="submit"]').length).toBe(1);
        expect(wrapper.find('form input[disabled="disabled"]').length).toBe(0);

        wrapper.setProps({
          userName : ''
        });

        expect(wrapper.find('form input[disabled="disabled"]').length).toBe(1);
      });
    });

    describe('disconnected rendering test', () => {
      it('should render disconnect if user status is DISCONNECTED.', () => {
        wrapper.setProps({
          connectionStatus : 'DISCONNECTED'
        });
        expect(wrapper.find('.disconnect').length).toBe(1);
        expect(wrapper.find('.main').length).toBe(0);
      });

      it('should not render disconnect if user status is CONNECTED.', () => {
        wrapper.setProps({
          connectionStatus : 'CONNECTED'
        });
        expect(wrapper.find('.disconnect').length).toBe(0);
        expect(wrapper.find('.main').length).toBe(1);
      });
    });

    describe('main simulating test', () => {
      it('should called onChatStart when click form submit button.', () => {
        let onChatStart = jest.fn();
        let event = {};
        event.preventDefault = jest.fn();

        wrapper.setProps({
          onChatStart : onChatStart
        });

        expect(wrapper.find('.join > form').length).toBe(1);
        wrapper.find('.join > form').simulate('submit', event);
        expect(onChatStart).toHaveBeenCalled();
      });

      it('should called changeUserName when change form input text.', () => {
        let changeUserName = jest.fn();
        let event = {
          target: {
            value: 'hj'
          }
        };

        wrapper.setProps({
          changeUserName : changeUserName
        });

        expect(wrapper.find('form input[type="text"]').length).toBe(1);
        wrapper.find('form input[type="text"]').simulate('change', event);
        expect(changeUserName).toHaveBeenCalled();
      });
    });
  });
});
