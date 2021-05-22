import React from 'react';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { history } from '../../redux/reducer';
import SignUpTutee from './SignUpTutee';
import { ConnectedRouter } from 'connected-react-router';

import { mount } from 'enzyme';

import store from '../../redux/store';



describe ("SignUpTutee", () => {
    let signupComponent;
    //let stubMatchedTutors;

    beforeEach(() => {

        signupComponent = 
            <Provider store = {store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact render={() => <SignUpTutee/>}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>

    });
  
    afterEach(() => {
        jest.clearAllMocks();
        history.push('/');
    });

    it ('should have null', () => {
        const component = mount(signupComponent);

        const newInstance = component.find(SignUpTutee.WrappedComponent).instance();

        expect(newInstance.state.id).toEqual("");
    });

});