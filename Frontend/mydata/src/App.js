import React, { Component } from 'react';
import './App.css';
import {Route} from "react-router-dom";
import axios from 'axios'

class SignIn extends Component {
  render() {
    return (
      <div>
        <form action="http://localhost:8000/user/signin/" method="POST" className='signUp'>
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
  
  state = { selectedFiles: null,
    username:"",
    firstname:"",
    lastname:"",
    password:"",
   };
  
  onClickHandler = event => {
    const formData = new FormData();
    formData.append(
      "login info",
      this.state.username,
      this.state.firstname,
      this.state.lastname,
      this.state.password,
    );
    const config = {
      method:'POST',
      url:"http:://localhost:8000/user/signup/",
      data:{
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        username:this.state.username,
        password:this.state.password,

      }
    }
    axios(config);
  };


  fileChangedHandler = event => {
    const files = event.target.files;
    this.setState({
      selectedFiles: files
    });
  };
  
  render() {
    return (
      <div>
        <form className='signUp'>
          <input placeholder='First Name' name='firstname' value={this.state.firstname} onChange={(event) => { this.setState({ firstname: event.target.value }) }}/>
          <input placeholder='Last Name' name='lastname' value={this.state.lastname} onChange={(event) => { this.setState({ lastname: event.target.value }) }}/>
          <input placeholder='Email' name='username' value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value }) }}/>
          <input placeholder='Password' name='password' value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }}/>
          <button onClick={this.onClickHandler} type='submit'>Submit</button>
        </form>
        <a href="/">Sign In</a>

      </div>
      
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

        <form action="http:://localhost:8000/user/mainpage/" method="POST" className='dataUpload'>
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
        <a href='/mainpage'>Main Page</a>

        <div>
          <div>Change Name</div>
          <div>Delete Account</div>
        </div>

        <form action="http://localhost:8000/user/dataupload/" method="POST" className='dataUpload'>
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
        <a href='/mainpage'>Main Page</a>

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
        <Route exact path='/signup'><SignUp></SignUp></Route>
        <Route exact path='/mainpage'><MainPage></MainPage></Route>
        <Route exact path='/edit'><Edit></Edit></Route>
        <Route exact path='/result'><Result></Result></Route>
      </div>
    )
  }
}

export default App;
