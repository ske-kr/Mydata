import React, { Component } from 'react';
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

  export default MainPage;