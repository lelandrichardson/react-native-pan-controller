// ----------------------------------------------------------------------------
// Libraries
// ----------------------------------------------------------------------------
import React, { Component } from 'react';
import {
  Image,
} from 'react-native';

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
import { CoverFlow } from 'react-native-pan-controller';

class CoverFlowExample extends Component {
  constructor(props) {
    super(props);

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
      ],
    };
  }

  render() {
    return (
      <CoverFlow>
        {this.state.images.map((src, i) => <Image key={i} source={src} />)}
      </CoverFlow>
    );
  }
}

export default CoverFlowExample;
