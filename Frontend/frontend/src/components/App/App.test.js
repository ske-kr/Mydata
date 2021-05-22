import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from '../../redux/store';
import { history } from '../../redux/reducer';
import { Provider } from 'react-redux';

import { Route } from 'react-router-dom';

import { mount } from 'enzyme';

const div = document.createElement('div');

it('renders without crashing', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it ('renders as its null', () => {
  const props = {
    history: history,
    auth: null};

  const app = 
    <Provider store={store}>
      <App {...props} />
    </Provider>
    
  const appcomp = mount(app);

  appcomp.setProps({auth: null});

  expect(appcomp.contains(<Route/>)).toBe(false);

});