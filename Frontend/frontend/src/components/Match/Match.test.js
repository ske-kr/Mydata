import React from 'react';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { history } from '../../redux/reducer';
import Match from './Match';
import { ConnectedRouter } from 'connected-react-router';

import { shallow, mount } from 'enzyme';

import store from '../../redux/store';

import * as actionCreators from '../../redux/match';

describe ("Match", () => {
    let matchComponent;
    let stubMatchedTutors;
    let spygetTutor;

    const spyHistory = jest.spyOn(history, 'push')
    .mockImplementation(path => {});

    beforeEach(() => {

        matchComponent = 
            <Provider store = {store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact render={() => <Match/>}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>

        stubMatchedTutors = [{
            id: 0,
            name: "Test subject",
            profile: null,
            gender: "Male",
            subject: "Test"
        }];

        spygetTutor = jest.spyOn(actionCreators, 'getTutor')
            .mockImplementation(() => {return (dispatch) => ({tutors: stubMatchedTutors})});
    });
    
    afterEach(() => {
        jest.clearAllMocks();
        history.push('/');
    })

    it ('should call getTutors', () => {
        expect(spygetTutor).toHaveBeenCalledTimes(0);
    })

    it ('the list show none', () => {
        const component = mount(matchComponent);
        const listComponent = component.find(".tutor0");

        expect(listComponent.find(".tutor-subject").text()).toEqual("None");
    })

    it ('should change the value of male', () => {
        const component = mount(matchComponent);
        const wrapper = component.find(".Male");

        wrapper.simulate("click");

        const newInstance = component.find(Match.WrappedComponent).instance();

        expect(newInstance.state.gender).toEqual(2);

    });

    it ('should change the value of female', () => {
        const component = mount(matchComponent);
        const wrapper = component.find(".Female");

        wrapper.simulate("click");

        const newInstance = component.find(Match.WrappedComponent).instance();

        expect(newInstance.state.gender).toEqual(1);

    });

    it ('should change the value of Korean', () => {
        const component = mount(matchComponent);
        const wrapper = component.find(".Korean");

        wrapper.simulate("click");

        const newInstance = component.find(Match.WrappedComponent).instance();

        expect(newInstance.state.subject).toEqual(30);

    });
    it ('should change the value of English', () => {
        const component = mount(matchComponent);
        const wrapper = component.find(".English");

        wrapper.simulate("click");

        const newInstance = component.find(Match.WrappedComponent).instance();

        expect(newInstance.state.subject).toEqual(29);

    });
    it ('should change the value of Math', () => {
        const component = mount(matchComponent);
        const wrapper = component.find(".Math");

        wrapper.simulate("click");

        const newInstance = component.find(Match.WrappedComponent).instance();

        expect(newInstance.state.subject).toEqual(31);

    });

});