// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Interpolation,
  StyleSheet,
  View,
} from 'react-native';

// ----------------------------------------------------------------------------
// Misc
// ----------------------------------------------------------------------------
const { width, height } = Dimensions.get('window'); //TODO: monitor for orientation change
const easing = Easing.bezier(.56,.17,.57,.85, (1000 / 60 / 4000) / 4);

// ----------------------------------------------------------------------------
// propTypes + defaultProps
// ----------------------------------------------------------------------------
const propTypes = {
  panY: PropTypes.instanceOf(Animated.Value),
  panX: PropTypes.instanceOf(Animated.Value),
  pageX: PropTypes.number,
  pageY: PropTypes.number,
  startY: PropTypes.number,
  onRemove: PropTypes.func,
};

const defaultProps = {
  panY: new Animated.Value(0),
  panX: new Animated.Value(0),
  pageX: 240,
  pageY: 400,
  startY: 50,
};

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import PanController from './PanController';

class PageScroller extends Component {
  constructor(props) {
    super(props);

    // Bindings
    this.onDirectionChange = this.onDirectionChange.bind(this);
    this.onReleaseX = this.onReleaseX.bind(this);

    this.state = {
      swipeIndex: null,
    };
  }

  onDirectionChange(dir, { dy, dx, y0 }) {
    this.setState({
      swipeIndex: dir === 'x' ? this.cardIndexFor(y0, this.props.panY._offset + dy, this.props.children.length) : null
    });
  }

  onReleaseX({ vx, vy, dx, dy }) {
    const { panX } = this.props;
    panX.flattenOffset();

    const x = panX._value;
    const i = this.state.swipeIndex;
    if (x > 30) {
      // to the right...
      Animated.spring(panX, {
        toValue: 400,
        velocity: vx
      }).start(() => {
        if (this.props.onRemove) {
          this.props.onRemove(i);
        }
      });
      return false;
    } else if (x < -30) {
      Animated.spring(panX, {
        toValue: -400,
        velocity: vx
      }).start(() => {
        if (this.props.onRemove) {
          this.props.onRemove(i);
        }
      });
      return false;
    }
    return true;
  }

  cardIndexFor(y0, panY, length) {
    let result = null;
    const h = this.props.pageY * 0.6;
    for (var i = 0; i < length; i++) {
      const hx = h * (length - i - 1);
      const hxm = Math.max(hx-h, 0);
      // y0 is the position they started the touch on the screen
      // panY is the current animated value
      const translateY = Interpolation.create({
        inputRange: [0, hxm, hx+1, height+hx],
        outputRange: [0, 0, 10, 30 + height],
        easing: easing
      })(panY);

      const scale = Interpolation.create({
        inputRange: [0, hx+1, 0.8*height+hx, height+hx, height + hx + 1],
        outputRange: [1, 1, 1.4, 1.3, 1.3]
      })(panY);

      const cardTop = this.props.startY + translateY - (scale - 1) / 2 * this.props.pageY;

      if (cardTop < y0) {
        result = i;
      }
    }
    return result;
  }

  render() {
    const { panY, panX, children, pageY, pageX, startY } = this.props;
    const { swipeIndex } = this.state;
    const h = pageY * 0.6;
    const MIN = 240;
    const MAX = 1900; //TODO: compute from pageY + children.length...

    return (
      <PanController
        style={styles.container}
        horizontal
        vertical
        xMode="spring-origin"
        onDirectionChange={this.onDirectionChange}
        yBounds={[MIN,MAX]}
        onReleaseX={this.onReleaseX}
        panX={panX}
        panY={panY}
      >
        {children.map((child, i) => {
          const x = children.length - i - 1;
          const hx = h * x;
          const hxm = Math.max(hx-h, 0);

          const translateX = i === swipeIndex ? panX : 0;

          const translateY = panY.interpolate({
            inputRange: [0, hxm, hx+1, height+hx],
            outputRange: [0, 0, 10, 30 + height],
            easing: easing
          });

          const scale = panY.interpolate({
            inputRange: [0, hx+1, 0.8*height+hx, height+hx, height + hx + 1],
            outputRange: [1, 1, 1.4, 1.3, 1.3]
          });

          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                top: startY,
                left: width / 2 - pageX / 2,
                width: pageX,
                height: pageY,
                transform: [
                  {translateX},
                  {translateY},
                  {scale},
                ]
              }}
            >
              {child}
            </Animated.View>
          );
        })}
      </PanController>
    );
  }
}

PageScroller.propTypes = propTypes;
PageScroller.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e2f31',
  },
});

export default PageScroller;
