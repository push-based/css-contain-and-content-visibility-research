# `contain` and `content-visibility` - Research
![CSS-Contain-Content-Visibility-concepts - _michael-hladky](https://user-images.githubusercontent.com/10064416/159817327-bb2a7e22-99e9-4f71-be77-84f2dfadf435.png)


## Audits
A set of performance audits applying these properties.

- 🔥 [Angular Movies App](https://github.com/push-based/angular-movies-audits/blob/main/Readme.md)
- 🔥🔥 [Observable HQ - HTML/CSS only Performance Audit ](https://github.com/push-based/observable-hq--audit)


## Measures
Different Lab measures to understand the impact.

- [[1.] Lab - Correct usage and debugging](https://github.com/push-based/css-contain-research/blob/master/usage-and-debugging)
- **[[2.] Lab - Bootstrap -- none vs contain vs content-visibility v1](https://github.com/push-based/css-contain-research/tree/master/bootstrap-v1) (partially invalidated by [3.])** 👍
- **[[3.] Lab - Offscreen vs onscreen -- none vs contain vs content-visibility](https://github.com/push-based/css-contain-research/tree/master/offscreen)** 👍
- [[4.] Work Specific - pain, layout](https://github.com/push-based/css-contain-research/tree/master/contain-impact-properties)
- [[5.] content-visibility](https://github.com/push-based/css-contain-research/tree/master/content-visibility-impact-properties)

## Overview of the properties

![CSS-contain--comparison](https://user-images.githubusercontent.com/10064416/159817372-ea9178ed-c466-454b-8e6f-83a02ef5ad6e.png)
![CSS-content-visibility--comparison](https://user-images.githubusercontent.com/95690470/159824234-5ce4dc89-45a2-4a15-81e2-4e33dace104c.png)

## Can I Use

![caniuse-contain](https://user-images.githubusercontent.com/95690470/159102200-d3232902-b71f-413d-a473-36994e26f4e9.PNG)

![caniuse-content-visibility](https://user-images.githubusercontent.com/95690470/159102242-d328c5c5-d0ba-44ad-a969-02d58a938a5e.PNG)

## Documentation

**Code samples**
- 🔥🔥🔥 [css-containment-debug](https://stackblitz.com/edit/css-containment-debug)
- [css-containment-demo](https://stackblitz.com/edit/css-containment-demo)
- [movies app](https://github.com/tastejs/angular-movies)

**Talks**
- [Next generation CSS performance](https://youtu.be/adRawKeHi90?si=qv64I7DE0Vu3I46J)


**Slides**
- [Lab Measure Slides](https://docs.google.com/presentation/d/1lgPbQqK2TgrP0rt3CCVpwA-LwBj3GERxjNUGF0193aM/edit?usp=sharing)
- 🔥🔥 [CSS Contain & Content Visibility - Talk](https://docs.google.com/presentation/d/1PWzVz1eqo78WpTgXuihBfnA8Fb4qDbZHVjSzk-m82qY/edit?usp=sharing)

**Contain**
- [CSS Containment Module Level 1](https://www.w3.org/TR/css-contain-1/) - official spec  
- [CSS Containment Module Level 2](https://www.w3.org/TR/css-contain-2/)
- [CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/)
- [The stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
- [caniuse](https://caniuse.com/mdn-css_properties_contain) - `contain` browser support   
- [css-tricks - almanac - contain](https://css-tricks.com/almanac/properties/c/contain/) - by far best demos and visuall eplaination
- [smashingmagazine - browsers-containment-css-contain-property](https://www.smashingmagazine.com/2019/12/browsers-containment-css-contain-property/) - good demo o visual limitations
- [offscreen improvements](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment#paint_containment)

**Content Visibility**
- [caniuse](https://caniuse.com/css-content-visibility) - `content-visibility` browser support  
- [web.dev - content-visibility](https://web.dev/content-visibility/)
- [chromestatus - `contain-intrinsic-size:auto`](https://chromestatus.com/feature/6740477866934272#:~:text=Feature%3A%20auto%20keyword%20for%20contain,through%20content%2Dvisibility%3A%20auto.)

**General**
- 🔥 [Paul Irish - What forces layout / reflow?](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
- [Paul Lewis & Surma - CSS trigger](https://csstriggers.com/)
- [web page geometry](https://docs.google.com/document/d/1WZKlOSUK4XI0Le0fgCsyUTVw0dTwutZXGWwzlHXewiU)
- chrome graphics feature set `chrome://gpu/`
- chrome flags `chrome://flags/`

---

made with ❤ by [push-based.io](https://www.push-based.io)
