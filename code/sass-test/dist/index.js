'use strict';

var React = require('react');
var ReactDOM = require('react-dom/client');
var App = require('./App.js');

var container = document.getElementById("root");
var root = ReactDOM.createRoot(container);
root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
