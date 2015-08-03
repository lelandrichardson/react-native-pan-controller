var React = require('react-native');
var {
    StyleSheet,
    View,
    Animated,
    PropTypes,
    Dimensions,
    Easing,
    Interpolation,
    } = React;
var { width, height } = Dimensions.get('window'); //TODO: monitor for orientation change

var PanController = require('./PanController');

var easing = Easing.bezier(.56,.17,.57,.85, (1000 / 60 / 4000) / 4);

var PageScroller = React.createClass({

  propTypes: {
    panY: PropTypes.instanceOf(Animated.Value),
    panX: PropTypes.instanceOf(Animated.Value),
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    startY: PropTypes.number,
    onRemove: PropTypes.func,
  },

  getDefaultProps() {
    return {
      panY: new Animated.Value(0),
      panX: new Animated.Value(0),
      pageX: 240,
      pageY: 400,
      startY: 50,
    }
  },

  getInitialState() {
    return {
      swipeIndex: null,
    };
  },

  onDirectionChange(dir, { dy, dx, y0 }) {
    this.setState({
      swipeIndex: dir === 'x' ? this.cardIndexFor(y0, this.props.panY._offset + dy, this.props.children.length) : null
    });
  },

  onReleaseX({ vx, vy, dx, dy }) {
    var { panX } = this.props;
    panX.flattenOffset();

    var x = panX._value;
    var i = this.state.swipeIndex;
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
  },

  cardIndexFor(y0, panY, length) {
    var result = null;
    var h = this.props.pageY * 0.6;
    for (var i = 0; i < length; i++) {
      var hx = h * (length - i - 1);
      var hxm = Math.max(hx-h, 0);
      // y0 is the position they started the touch on the screen
      // panY is the current animated value
      var translateY = Interpolation.create({
        inputRange: [0, hxm, hx+1, height+hx],
        outputRange: [0, 0, 10, 30 + height],
        easing: easing
      })(panY);

      var scale = Interpolation.create({
        inputRange: [0, hx+1, 0.8*height+hx, height+hx, height + hx + 1],
        outputRange: [1, 1, 1.4, 1.3, 1.3]
      })(panY);

      var cardTop = this.props.startY + translateY - (scale - 1) / 2 * this.props.pageY;

      if (cardTop < y0) {
        result = i;
      }
    }
    return result;
  },

  render: function () {
    var { panY, panX, children, pageY, pageX, startY } = this.props;
    var { swipeIndex } = this.state;
    var h = pageY * 0.6;
    var MIN = 240;
    var MAX = 1900; //TODO: compute from pageY + children.length...
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
            var x = children.length - i - 1;
            var hx = h * x;
            var hxm = Math.max(hx-h, 0);

            var translateX = i === swipeIndex ? panX : 0;

            var translateY = panY.interpolate({
              inputRange: [0, hxm, hx+1, height+hx],
              outputRange: [0, 0, 10, 30 + height],
              easing: easing
            });

            var scale = panY.interpolate({
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
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e2f31',
    },
});

module.exports = PageScroller;
