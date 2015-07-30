var React = require('react-native');
var {
    StyleSheet,
    Animated,
    PropTypes,
    } = React;
var PanController = require('../PanController');

var ScrollView = React.createClass({

  propTypes: {
    scroll: PropTypes.instanceOf(Animated.Value),
  },

  getDefaultProps() {
    return {
      scroll: new Animated.Value(0),
    };
  },

  render: function () {
    var { scroll, children } = this.props;
    return (
      <PanController
        style={styles.container}
        vertical
        yBounds={[0,100]}
        panY={scroll}
        >
        <Animated.View style={{
          transform: [
            { translateY: scroll }
          ]
        }}>
          {children}
        </Animated.View>
      </PanController>
    );
  }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = ScrollView;
