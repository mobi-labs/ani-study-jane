import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return React.createElement("div", {
    className: 'App'
  }, React.createElement("header", {
    className: 'App-header'
  }, React.createElement("p", null, "Edit ", React.createElement("code", null, "src/App.js"), " and save to reload."), React.createElement("a", {
    className: 'App-link',
    href: 'https://reactjs.org',
    target: '_blank',
    rel: 'noopener noreferrer'
  }, "Learn React")));
}

var container = document.getElementById("root");
var root = ReactDOM.createRoot(container);
root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
