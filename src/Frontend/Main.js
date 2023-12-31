import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.jpg'

//Main Page before login/signup
function Main(){
    
    return (
        <div className='MainPage'>
            
            <h1 className="MainPageh1">Welcome to Pixel World</h1>
            <h2 className="MainPageh3">A world where imagination and creativity gets applied onto images.</h2>
            <img src={logo} alt="Logo" className="App-logo" style={{maxWidth: '50%', maxHeight: '50%'}}></img>
            <h2 className="MainPageh2"><br></br>Let Begin!</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button class="feature-button"><Link to='/login'>Login</Link></button>
            <button class="feature-button"><Link to='/signup'>Signup</Link></button>
        </div>
    );
}

export default Main;