import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "sass-npm-library-test";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button label={"성공~~~^__^"} primary />
      </header>
    </div>
  );
}

export default App;
