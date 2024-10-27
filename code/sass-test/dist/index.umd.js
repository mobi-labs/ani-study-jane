(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('C:\\data\\ani-study-jane\\code\\sass-test\\node_modules\\.pnpm\\node_modules\\tslib\\tslib.es6.js'), require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'C:\\data\\ani-study-jane\\code\\sass-test\\node_modules\\.pnpm\\node_modules\\tslib\\tslib.es6.js', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["sass-npm-library-test"] = {}, global.tslib_es6_js, global.React));
})(this, (function (exports, tslib_es6_js, React) { 'use strict';

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

}));
