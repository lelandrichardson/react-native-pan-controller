var React = require('react-native');
var {
  Image
} = React;

var IMAGES = [
  require('image!0-cnn1'),
  require('image!1-facebook1'),
  require('image!2-facebook2'),
  require('image!3-flipboard1'),
  require('image!4-flipboard2'),
  require('image!5-messenger1'),
  require('image!6-nyt1'),
  require('image!7-pages1'),
  require('image!8-vine1'),
];

var CoverFlowExample = React.createClass({
  render() {
    return (
      <CoverFlow>
        {IMAGES.map((src, i) => {
          return <Image key={key} src={src} />
        })}
      </CoverFlow>
    );
  }
});

module.exports = CoverFlowExample;
