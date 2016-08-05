// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ----------------------------------------------------------------------------
// Misc
// ----------------------------------------------------------------------------
const views = Array(200).join(".").split("");

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import { ScrollView } from 'react-native-pan-controller';

class ScrollViewExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: new Animated.Value(0),
      text: "0",
    };
  }

  componentDidMount() {
    this.state.scroll.addListener(({ value}) => {
      this.setState({ text: value });
    });
  }

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
}

// ----------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  view: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  }
});

export default ScrollViewExample;
