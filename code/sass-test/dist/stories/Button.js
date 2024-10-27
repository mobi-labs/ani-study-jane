'use strict';

var tslib_es6_js = require('C:\\data\\ani-study-jane\\code\\sass-test\\node_modules\\.pnpm\\node_modules\\tslib\\tslib.es6.js');
var React = require('react');

var Button = function (_a) {
  var _b = _a.primary,
    primary = _b === void 0 ? false : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c,
    backgroundColor = _a.backgroundColor,
    label = _a.label,
    props = tslib_es6_js.__rest(_a, ["primary", "size", "backgroundColor", "label"]);
  var mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  return React.createElement("button", tslib_es6_js.__assign({
    type: 'button',
    className: ["storybook-button", "storybook-button--".concat(size), mode].join(" "),
    style: {
      backgroundColor: backgroundColor
    }
  }, props), label);
};

exports.Button = Button;
