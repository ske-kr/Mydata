


import React, { Component } from 'react';
class Edit extends Component {
    render() {
      return (
        <div>
          <a href='/mainpage'>Main Page</a>
  
          <div>
            <div>Change Name</div>
            <div>Delete Account</div>
          </div>
  
          <form action="http:://localhost:8000/user/dataupload/" method="POST" className='dataUpload'>
            <input type="file" id="myFile" name="filename"/>
            <input type="submit"/>
          </form>
          
        </div>
      )
    }
  }

export default Edit;