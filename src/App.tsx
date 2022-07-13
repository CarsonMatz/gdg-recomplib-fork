import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from './components';
import './CSS/specs.css';
import { } from './components/Button';

function App() {
  return (
    <div className="App">
      <Button      //button that goes to gdg website when clicked
        onClick = {async () =>fetch("https://httpbin.org/get")}
        variant =  'default'
        size = 'md'
        text = "Testing Button"
      />
      <Button      //button that goes to gdg website when clicked
        onClick = {async () =>fetch("https://httpnonesence.org/nonesense")}
        variant =  'default'
        size = 'md'
        text = "Testing Button"
      />
    </div>
  );
}

export default App;

//window.open('https://gamedayguru.com/', '_self')