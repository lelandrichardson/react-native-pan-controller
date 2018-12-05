/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import CoverFlowExample from './examples/CoverFlowExample';
import PageScrollerExample from './examples/PageScrollerExample';
import ScrollViewExample from './examples/ScrollViewExample';

function Example() {
  // return <ScrollViewExample />;
  return <CoverFlowExample />;
  // return <PageScrollerExample />;
}

AppRegistry.registerComponent('example', () => Example);
