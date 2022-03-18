window.innerWidth = 1140px
window.innerHeight = 975px
 
# Comparison of none, `contain` and `content-visibility` - Cards Bootstrap 

## URL

`https://typescript-nprm3z.stackblitz.io/`

![contain-comparison-cards](https://user-images.githubusercontent.com/95690470/158879336-539df79a-4f4e-40d2-ad7c-147dc03f785e.PNG)


## Description

This measure tests the different 3 different settings on the same page. 
The outcome helps to compare the expected impact in the bootstrap phase.

The target node under test are the card elements.

![contain-comparison-cards-diagram](https://user-images.githubusercontent.com/95690470/158891348-220e5a77-0cc2-43f6-9cba-734c565e06fd.PNG)


### Case setup

As the page can be set up in different way lets quickly clarify the setup.

As we focus on rendering and paint, it makes a difference if we load the images lazy of not.
The following diagram shows how the artefacts at the end of the flames chage, depending on `loading` attributes value. (`lazy` or nothing)

![img-comparison-bootstrap-doading-lazy](https://user-images.githubusercontent.com/95690470/159002129-d9571db9-13f7-4403-afb6-dadf16514522.PNG)

```html
  <img loading="lazy" ... />
```

We take the version with lazy loaded images as atrefacts at the end, caosed by the the offscreen images provide a nice case to test the improvements in offscreen areas. 

### Bootstrap process

On bootstrap without any optimizations the following is happening.

![img-comparison-bootstrap-none](https://user-images.githubusercontent.com/95690470/158997509-33569ee5-ad73-4c41-8686-a9c60836847e.PNG)

On click we add a set of cards programmatically:

```typescript
  const cardTmpl = document.createElement('DIV');
  cardTmpl.classList.add('card');
  cardTmpl.innerHTML = `<p>...</p>`;
  document.body.appendChild(_cardTmpl);
```

After that we have styles recalculation, layout, hit test, paint and composite of the added nodes.
We can see that recalculation and layout take the longest.

After some time we have another badge of tasks caused by the images with `loading="lazy"` as the HTTP request is pushed to the end of the renderpipeline.

Now lets test `contain:content` and `content-visibility`


### `contain:content`

If we apply **`contain:content`** to all **`.card`** elements and **initially render the cards** we should be able to improve layouting and styles.

![img-comparison-bootstrap-contain-diagram](https://user-images.githubusercontent.com/95690470/159004803-d4881771-f3c7-4d08-b2cf-7c3d528dc1cf.PNG)

Expected impact at bootstrap is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in painting items onscreen as we paint the first time 
- ✔ improvement in painting items offscreen as we skip the paint and composite step for offscreen nodes due to `paint` and `layout` containment. (`content` is shorthand for `paint layout`). 

**Measurement**

Running a measure gives the following flames:

![img-comparison-bootstrap-contain](https://user-images.githubusercontent.com/95690470/159004813-c593ccd5-039c-43be-9a79-5d468d84a2ed.PNG)

The measure showed the following outcome:
- ❌ no improvement in recalculate styles as we paint the first time 
- 🤷‍👎 somehow longer layouting [1]
- 🤷‍👍 clear improvement in painting items onscreen (33 times faster)
- 🤷‍👍 clear improvement in composite items onscreen (30% faster) 
- ✔ improvement in painting items offscreen are clearly measurable

_[1] contain-vs-none--alternating_  
![img-comparison-bootstrap-none-vs-contain-pattern](https://user-images.githubusercontent.com/95690470/159005929-effa8c33-e77b-47fe-8088-36cbcca1aa4d.PNG)

As there where clear signs for a difference in the assuptions i took another measure with a 25 times higher load [2]. This showed clear differences.
The miss assumptions with painting of on vs offscreen elements is clear as the initial load will also receive the offscreen benefits of `contain:content`.

_[2] unoptimized vs contain_  
| Run | Styles           | Recalculate Styles | Layout | Update Layertree | Paint     | Composite |
| --- | ---------------- | ------------------ | ------ | ---------------- | --------- | --------- |
| 1.  | contain: none    | 610ms              | 1370ms | 320ms            | 350ms     | 130ms     |
| 2.  | contain: none    | 550ms              | 1410ms | 300ms            | 330ms     | 130ms     |
| 3.  | contain: content | 550ms              | 950ms  | 260ms            | 9ms       | 100ms     |
| 4.  | contain: content | 620ms              | 1000ms | 450ms            | 9ms       | 100ms     |

### `content-visibility:auto`

If we apply **`content-visibility:auto`** to all **`.card`** elements and **initially render the cards** we should be able to improve the full render pipeling as we can literally ignore those nodes from the whole process.

![img-comparison-bootstrap-content-visibility-diagram](https://user-images.githubusercontent.com/95690470/159006915-695bb687-7edc-45b0-ae2e-8d9261c72047.PNG)

Expected impact at bootstrap is:
- ✔ drastic improvement in recalculate styles as we skip 90% of the nodes (offscreen)
- ✔ drastic improvement in layouting as we skip 90% of the nodes (offscreen)
- ❌ no improvement in painting items onscreen as we paint the first time 
- ✔ drastic improvement in painting items offscreen as we skip them completely.

**Measurement**

Running a measure gives the following flames:

![img-comparison-bootstrap-content-visibility](https://user-images.githubusercontent.com/95690470/159007219-676a1c18-bf12-4343-bd84-e1e51e7c21aa.PNG)

The measure showed the following outcome:
- ✔ drastic improvement in recalculate styles clearly visible (22 times faster)
- ✔ drastic improvement in layouting clearly visible (120 times faster)
- 🤷‍👍 improvement in painting as well as composit is measurably faster [3]
- ✔ drastic improvement in painting items offscreen clearly visible (22 times faster)

_[3] contain:content vs content-visibility_  
  ![img-comparison-bootstrap-contain-vs-content-visibility-pattern](https://user-images.githubusercontent.com/95690470/159022681-04605595-431a-42b6-b57b-7e6ff452f0b0.PNG)

### Measurement Result

- [Timeline - none](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-none.json)
- [Timeline - contain:content](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-contain.json)
- [Timeline - content-visibility:auto](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-content-visibility.json)


### Attachments with raw measurements

> Raw files and screenshots of measurements can be found in the `/raw` directory.

- [Profile-comparison--bootstrap-none.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-none.json)
- [Profile-comparison--bootstrap-contain.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-contain.json)
- [Profile-comparison--bootstrap-content-visibility.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-comparison--bootstrap-content-visibility.json)

### Runtime Settings 

default
