import React, {useState} from 'react';
import Header from './Components/Header';
import MainContent from './Components/MainContent';
import './App.css';

function UserNameInput({onSubmit}){
  const [userName, setUserName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(userName);
  }

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return(
    <form onSubmit={handleSubmit} className="center">
      <label>
        <input type="text" value={userName} onChange={handleUserNameChange} placeholder="Please enter your username" className='inputUser'/>
      </label>
      <button type="submit" className='submitBtn'>Submit</button>
    </form>
  )
}

function App() {

  const [userName, setUserName] = useState('');

  const handleUserNameSubmit = (userName) => {
    setUserName(userName);
  }

  return (
    <div className="App">
      {
        userName ? (
          <>
            <Header userName={userName}/>
            <MainContent userName={userName}/>
          </>
        ):(
          <UserNameInput onSubmit={handleUserNameSubmit}/>
        )
      }
    </div>
  )
}

export default App
