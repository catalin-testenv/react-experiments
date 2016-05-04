'use strict'

// https://github.com/FormidableLabs/radium/blob/master/src/enhancer.js
var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];
module.exports.copyProperties = function copyProperties(source, target) {
    Object.getOwnPropertyNames(source).forEach(function (key) {
        if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
            var descriptor = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, descriptor);
        }
    });
}