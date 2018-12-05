// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React, { Component, PropTypes } from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';

// ----------------------------------------------------------------------------
// propTypes + defaultProps
// ----------------------------------------------------------------------------
const propTypes = {
  // scroll: PropTypes.instanceOf(Animated.Value)
};

const defaultProps = {
  scroll: new Animated.Value(0),
};

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import PanController from './PanController';

class ScrollView extends Component {
  render() {
    const { scroll, children } = this.props;
    return (
      <PanController
        style={styles.container}
        vertical
        yBounds={[0, 100]}
        panY={scroll}
      >
        <Animated.View
          style={{
            transform: [
              { translateY: scroll }
            ]
          }}
        >
          {children}
        </Animated.View>
      </PanController>
    );
  }
}

ScrollView.propTypes = propTypes;
ScrollView.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScrollView;
