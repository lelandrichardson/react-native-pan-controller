var React = require('react-native');
var {
    StyleSheet,
    Animated,
    PropTypes,
    } = React;
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

var PanController = require('./PanController');

var CoverFlow = React.createClass({

  propTypes: {
    scroll: PropTypes.any, // animated
    spacing: PropTypes.number,
    dCenter: PropTypes.number,
  },

  getDefaultProps() {
    return {
      scroll: new Animated.Value(0),
      spacing: 200,
      dCenter: 120,
    };
  },

  render() {
    var { children, spacing, scroll } = this.props;

    return (
      <PanController horizontal
        style={styles.container}
        overshootX="spring"
        xBounds={[0, (children.length-1) * spacing]}
        snapSpacingX={spacing}
        xMode="snap"
        panX={scroll}
        >
        {children.map((child, i) => {
          var dx = scroll.interpolate({
              inputRange:  [ spacing*i, spacing*(i+1)],
              outputRange: [         0,       spacing]
          });
          var translateX = dx;
          var perspective = dx.interpolate({
              inputRange: [-dCenter-1, -dCenter, 0, dCenter, dCenter+1],
              outputRange: [400, 400, 100, 400, 400]
          });
          var translateY = dx.interpolate({
              inputRange:  [-dCenter-1, -dCenter,   0, dCenter, dCenter+1],
              outputRange: [         0,        0, -10,       0,         0]
          });
          var scale = dx.interpolate({
              inputRange:  [-dCenter-1, -dCenter,   0, dCenter, dCenter+1],
              outputRange: [         1,        1, 1.6,       1,         1]
          });
          var rotateY = dx.interpolate({
              inputRange:  [-dCenter-1, -dCenter,      0,  dCenter, dCenter+1],
              outputRange: [   '35deg',  '35deg', '0deg', '-35deg',  '-35deg']
          });

          return (
            <Animated.View
              key={i}
              style={[styles.image, {
                  transform: [
                      {perspective},
                      {translateX},
                      {translateY},
                      {scale},
                      {rotateY},
                  ],
              }]}>
              {child}
            </Animated.View>
          );
        })}
      </PanController>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#2e2f31',
        padding: 30
    },
    image: {
        position: 'absolute',
        top: (width - 200) / 2,
        left: (height - 200) / 2,
        width: 200,
        height: 200,
        resizeMode: 'cover'
    }
});

module.exports = CoverFlow;
