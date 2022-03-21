# `contain` and `content-visibility` - performance audit

![css-performance_contain--content-visibility_michael-hladky](https://user-images.githubusercontent.com/95690470/159100625-1e330d1b-0ce5-4bd2-a280-bb145ee2c8c7.png)


## Measures

- [[1.] Lab - Correct usage and debugging](https://github.com/push-based/css-contain-research/blob/master/usage-and-debugging)
- [[2.] Lab - Bootstrap -- none vs contain vs content-visibility v1](https://github.com/push-based/css-contain-research/tree/master/bootstrap-v1) (partialli invalidated by [3.])
- [[3.] Lab - Offscreen vs onscreen -- none vs contain vs content-visibility](https://github.com/push-based/css-contain-research/tree/master/offscreen)

## Comparison

| Value   | Impact | Usage  | Layout Root | Overflow | Dimensions  | Description                                                       |
| ------- | ------ | ------ | ----------- | -------- | ----------- | ------------------------------------------------------------------------------- | 
| none    | n/a    | n/a    | document    | visible  | optional    | Default value with no effect                                                    |
| size    | ~      | --     | document    | visible  | required    | Geometry calcualtions are done without children. Without h/w the box collapses. |
| layout  | +      | ++     | node        | visible  | optional    | Protect area against layout and vice versa, offscreen paint protection [1]      |
| paint   | +      | +      | node        | hidden   | optional    | Same as layout, offscreen paint protection [1]                                  |
|         |        |        |             |          |             |                                                                                 |
| content | ++     | +      | node        | hidden   | optional    | Shorthand for `layout` `paint`                                                  |
| strict  | +++    | --     | node        | hidden   | required    | Shorthand for `layout` `paint` `size`                                           |

[1 offscreen improvements](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment#paint_containment)

## Can I Use

![caniuse-contain](https://user-images.githubusercontent.com/95690470/159102200-d3232902-b71f-413d-a473-36994e26f4e9.PNG)

![caniuse-content-visibility](https://user-images.githubusercontent.com/95690470/159102242-d328c5c5-d0ba-44ad-a969-02d58a938a5e.PNG)

## Documentation

**Contain**
- [CSS Containment Module Level 1](https://www.w3.org/TR/css-contain-1/) - official spec  
- [CSS Containment Module Level 2](https://www.w3.org/TR/css-contain-2/)
- [CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/)
- [caniuse](https://caniuse.com/mdn-css_properties_contain) - `contain` browser support   
- [css-tricks - almanac - contain](https://css-tricks.com/almanac/properties/c/contain/) - by far best demos and visuall eplaination
- [smashingmagazine - browsers-containment-css-contain-property](https://www.smashingmagazine.com/2019/12/browsers-containment-css-contain-property/) - good demo o visual limitations

**Content Visibility**
- [caniuse](https://caniuse.com/css-content-visibility) - `content-visibility` browser support  
- [web.dev - content-visibility](https://web.dev/content-visibility/)
- [chromestatus - `contain-intrinsic-size:auto`](https://chromestatus.com/feature/6740477866934272#:~:text=Feature%3A%20auto%20keyword%20for%20contain,through%20content%2Dvisibility%3A%20auto.)

**General**
- [Paul Irish - What forces layout / reflow?](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
- [Paul Lewis & Surma - CSS trigger](https://csstriggers.com/)
- chrome graphics feature set `chrome://gpu/`
- chrome flags `chrome://flags/`
