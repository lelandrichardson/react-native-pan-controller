var React = require('react-native');
var {
  View,
  StyleSheet,
  Animated,
  Text,
} = React;
var { ScrollView } = require('react-native-pan-controller');
var views = Array(200).join(".").split("");

var ScrollViewExample = React.createClass({
  getInitialState() {
    return {
      scroll: new Animated.Value(0),
      text: "0",
    };
  },
  componentDidMount() {
    this.state.scroll.addListener(({ value}) => {
      this.setState({ text: value });
    });
  },
  render() {
    return (
      <ScrollView scroll={this.state.scroll}>
        {views.map((src, i) => (
          <View key={i} style={styles.view}>
            <Text>{this.state.text}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  view: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  }
})

module.exports = ScrollViewExample;
