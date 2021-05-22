import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';

import Login from '../Login/Login';
import SignUpTutor from '../SignUp/SignUpTutor';
import SignUpTutee from '../SignUp/SignUpTutee';
import Match from '../Match/Match';
import ProfileTutee from '../Profile/Tutee/ProfileTutee';
import ProfileTutor from '../Profile/Tutor/ProfileTutor';
import RequestFromTutee from '../Profile/Tutor/RequestFromTutee';
import Certificate from '../Certificate/Certificate';
import * as actionCreators from '../../redux/login'
import { connect } from 'react-redux';

function App(props) {
  props.isLoggedIn();
  console.log(props.auth)
  if (props.auth != null) {
    return (
      <ConnectedRouter history={props.history}>
        <div className="app">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup/tutor" exact component={SignUpTutor} />
            <Route path="/signup/tutee" exact component={SignUpTutee} />
            <Route path="/tutee/match" exact component={Match} />
            <Route path="/profile/tutor/request" exact component={RequestFromTutee} />
            <Route path="/profile/tutor" exact component={ProfileTutor} />
            <Route path="/profile/tutee" exact component={ProfileTutee} />
            <Route path="/cert" exact component={Certificate} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.log.authenticated
});

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: () => dispatch(actionCreators.isLoggedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
