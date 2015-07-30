# react-native-pan-controller

## Motivation

The `PanResponder` class in React Native is incredibly useful, and can handle a
broad range of interactions/animatinos. Unfortunately, there are a lot of very
common interactions/animations that require a lot of the same boilerplate
in order to get them working properly, and that code is not necessarily straight
forward.

The `<PanController />` component is intended to much more easily handle a lot of
these common scenarios.  See below for usage.


## Installation

```bash
$ npm install --save react-native-pan-controller
```




## API (props)

### Behavior Config

| Prop | Default | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| panX | `new Animated.Value(0)` | `Animated` | ... |
| panY | `new Animated.Value(0)` | `Animated` | ... |
| horizontal | `false` | `Boolean` | ... |
| vertical | `false` | `Boolean` | ... |
| lockDirection | `true` | `Boolean` | ... |
| overshootX | `"spring"` | `"spring"|"clamp"` | ... |
| overshootY | `"spring"` | `"spring"|"clamp"` | ... |
| xMode | `"decay"` | `"decay"|"snap"|"spring-origin"` | ... |
| yMode | `"decay"` | `"decay"|"snap"|"spring-origin"` | ... |
| xBounds | `[-Infinity, Infinity]` | `Array<Number>` | ... |
| yBounds | `[-Infinity, Infinity]` | `Array<Number>` | ... |
| snapSpacingX | `null` | `Number` | ... |
| snapSpacingY | `null` | `Number` | ... |

### Animation Config

| Prop | Default | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| overshootSpringConfig | `{ friction: 7, tension: 40 }` | `Object` | ... |
| momentumDecayConfig | `{ deceleration: 0.993 }` | `Object` | ... |
| overshootSpringConfig | `{ friction: 7, tension: 40 }` | `Object` | ... |
| directionLockDistance | `10` | `Number` | ... |
| overshootReductionFactor | `3` | `Number` | ... |

### Events

| Prop | Parameters | Description |
| :------------ | :---------------:| :-----|
| onOvershoot | NO | ... |
| onDirectionChange | NO | ... |
| onReleaseX | NO | ... |
| onReleaseY | NO | ... |
| onRelease | NO | ... |





## Examples

There is an example project where you can run and inspect all of the below
examples if you want.  In order to do so, you must first do the following:

```bash
$ cd examples
$ npm install
```

### ScrollView

### CoverFlow

![](http://i.giphy.com/xTiTnh9zUTwf3oiHRK.gif)

### PageScroller

### PullToRefresh

![](http://i.giphy.com/xTiTnduykRpC513w4M.gif)

### Chat Heads

### Window Shade




## Contributing

PR's welcome.  Additionally, if you have an interaction that you think might be
able to be handled by the `PanController`, but you're not quite sure how to
implement it, give me an example of the interaction and I'll try to get it working
and add an example.

If it is not easily implemented using the `PanController`, but seems like a
strong use-case, I may extend the implementation to handle it more easily.





## License

MIT License.
