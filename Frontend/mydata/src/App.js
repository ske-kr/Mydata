import React, { Component } from 'react';
import './App.css';
import {Route} from "react-router-dom";

class SignIn extends Component {
  render() {
    return (
      <div>
        <form className='signUp'>
          <input placeholder='Email' type='email'/>
          <input placeholder='Password' type='password'/>
          <button type='submit'>Submit</button>
        </form>
        <a href="/SignUp">Sign Up</a>
      </div>
    )
  }
}

class SignUp extends Component {
  render() {
    return (
      <form className='signUp'>
        <input placeholder='First Name' type='fName'/>
        <input placeholder='Last Name' type='LName'/>
        <input placeholder='Email' type='email'/>
        <input placeholder='Password' type='password'/>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

class MainPage extends Component {
  render() {
    return (
      <div>
        <div>
          <div>Profile Picture</div>
          <a href='/edit'>Edit Profile</a>
          <a href='#'>Data 불러오기</a>
          <a href='/'>Logout</a>
        </div>

        <form className='dataUpload'>
          <input type="file" id="myFile" name="filename"/>
          <input type="submit"/>
        </form>
        
      </div>
    )
  }
}

class Edit extends Component {
  render() {
    return (
      <div>
        <a href='/MainPage'>Main Page</a>
        <div>
          <div>Change Name</div>
          <div>Delete Account</div>
        </div>

        <form className='dataUpload'>
          <input type="file" id="myFile" name="filename"/>
          <input type="submit"/>
        </form>
        
      </div>
    )
  }
}

class Result extends Component {
  render() {
    return (
      <div>
        <a href='/MainPage'>Main Page</a>
        <div>
          Show Data
        </div>

        <div>
          Save Data
        </div>
        
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/'><SignIn></SignIn></Route>
        <Route exact path='/Signup'><SignUp></SignUp></Route>
        <Route exact path='/MainPage'><MainPage></MainPage></Route>
        <Route exact path='/Edit'><Edit></Edit></Route>
        <Route exact path='/Result'><Result></Result></Route>
      </div>
    )
  }
}

export default App;