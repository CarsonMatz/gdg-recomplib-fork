import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from './components';
//import './CSS/specs.css';
import { } from './components/input/unary/Button';

function App() {
  return (
    <div className="App">
      <Button      //button that goes to gdg website when clicked
        onClick = {async () =>fetch("https://httpbin.org/get")}
        variant =  'do'
        text = "Testing Button"
      />
      <Button      //button that goes to gdg website when clicked
        onClick = {async () =>fetch("https://httpnonesence.org/nonesense")}
        variant =  'do'
        text = "Testing Button"
      />
    </div>
  );
}

export default App;

//window.open('https://gamedayguru.com/', '_self')