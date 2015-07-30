var React = require('react-native');
var {
  Image
} = React;
var PageScroller = require('../lib/PageScroller');

var PageScrollerExample = React.createClass({
  getInitialState() {
    return {
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
  },
  onRemove(i) {
    IMAGES.splice(i,1);
    this.forceUpdate();
  },
  render() {
    return (
      <PageScroller onRemove={this.onRemove}>
        {this.state.images.map((src, i) => <Image key={key} src={src} />)}
      </PageScroller>
    );
  }
});

module.exports = PageScrollerExample;
