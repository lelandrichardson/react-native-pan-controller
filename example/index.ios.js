/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var CoverFlowExample = require('./examples/CoverFlowExample');
var PageScrollerExample = require('./examples/PageScrollerExample');
var ScrollViewExample = require('./examples/ScrollViewExample');

var example = React.createClass({
  render: function() {
    return <ScrollViewExample />
    // return <CoverFlowExample />
    // return <PageScrollerExample />
  }
});

AppRegistry.registerComponent('example', () => example);
