// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';

// ----------------------------------------------------------------------------
// Misc
// ----------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import { PageScroller } from 'react-native-pan-controller';

class PageScrollerExample extends Component {
  constructor(props) {
    super(props);

    // Bindings
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      images: [
        require('image!0-cnn1'),
        require('image!1-facebook1'),
        require('image!2-facebook2'),
        require('image!3-flipboard1'),
        require('image!4-flipboard2'),
        require('image!5-messenger1'),
        require('image!6-nyt1'),
        require('image!7-pages1'),
        require('image!8-vine1'),
      ]
    };
  }

  onRemove(i) {
    this.setState({
      images: this.state.images.slice(i, 1)
    });
  }

  render() {
    return (
      <PageScroller onRemove={this.onRemove}>
        {this.state.images.map((src, i) => <Image key={i} style={styles.image} source={src} />)}
      </PageScroller>
    );
  }
}

// ----------------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------------
const styles = StyleSheet.create({
  image: {
    // position: 'absolute',
    // top: (width - 200) / 2,
    // left: (height - 200) / 2,
    width: 240,
    height: 400,
    resizeMode: 'cover'
  }
});

export default PageScrollerExample;
