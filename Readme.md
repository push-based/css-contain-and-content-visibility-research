# `contain` and `content-visibility` - performance audit

![css-performance_contain--content-visibility_michael-hladky](https://user-images.githubusercontent.com/95690470/159100625-1e330d1b-0ce5-4bd2-a280-bb145ee2c8c7.png)


## Measures

- [[1.] Lab - Correct usage and debugging](https://github.com/push-based/css-contain-research/blob/master/usage-and-debugging)
- [[2.] Lab - Bootstrap -- none vs contain vs content-visibility v1](https://github.com/push-based/css-contain-research/tree/master/bootstrap-v1) (partialli invalidated by [3.])
- [[3.] Lab - Offscreen vs onscreen -- none vs contain vs content-visibility](https://github.com/push-based/css-contain-research/tree/master/offscreen)

## Comparison

| Value   | Impact | Usage  | Layout Root | Overflow | Description                                                                     |
| ------- | ------ | ------ | ----------- | -------- | ------------------------------------------------------------------------------- | 
| none    | n/a    | n/a    | document    | visible  | Default value with no effect                                                    |
| size    | ~      | --     | document    | visible  | Geometry calcualtions are done without children. Without h/w the box collapses. |
| layout  | +      | ++     | node        | visible  | Protect area against layout and vice versa, offscreen paint protection [1]      |
| paint   | +      | +      | node        | hidden   | Same as layout, offscreen paint protection [1]                                  |
|         |        |        |             |          |                                                                                 |
| content | ++     | +      | node        | hidden   | Shorthand for `layout` `paint`                                                  |
| strict  | +++    | --     | node        | hidden   | Shorthand for `layout` `paint` `size`                                           |

[1 offscreen improvements](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment#paint_containment)

## Documentation

- [w3 - CSS contain](https://www.w3.org/TR/css-contain-1/) - official spec  
- [caniuse](https://caniuse.com/mdn-css_properties_contain) - `contain` browser support   
- [caniuse](https://caniuse.com/css-content-visibility) - `content-visibility` browser support  
- [css-tricks - almanac](https://css-tricks.com/almanac/properties/c/contain/) - by far best demos and visuall eplaination
- [smashingmagazine - browsers-containment-css-contain-property](https://www.smashingmagazine.com/2019/12/browsers-containment-css-contain-property/) - good visula demos and explaination
