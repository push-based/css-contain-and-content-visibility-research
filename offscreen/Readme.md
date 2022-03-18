window.innerWidth = 1140px
window.innerHeight = 975px
 
# Comparison of none, `contain` and `content-visibility` - Cards Bootstrap 

## URL

`https://typescript-nprm3z.stackblitz.io/`
![contain-comparison--onscreen-cards](https://user-images.githubusercontent.com/95690470/159060917-7214baae-7447-4b0a-b705-883c23ff44d2.PNG)



## Description

This measure tests the offscreen benefits of `contain:content` and `content-visibility:auto`. 

![contain-comparison-cards-offscreen-diagram](https://user-images.githubusercontent.com/95690470/159065333-5c53d26a-3222-49bc-88fa-50451f0b2984.PNG)

### Case setup

As the page can be set up in different way lets quickly clarify the setup.

To test onscreen offscreen render performance we specify 2 screen states "default" and "offscreen". default displays all 1tems on screen, the other state display all items offscreen with a `margin-top: 9000px`. By adding items in those 2 states we can measure the offscreen node benefits more accurate.

The second test besides adding and removing DOM nodes is trigger recalculation with a animation. In our case it is just a color fade from purple to black.

![contain-comparison--offscreen-cards-setup](https://user-images.githubusercontent.com/95690470/159068427-e5ea1364-407d-4bd7-a174-1a793af6d3a6.PNG)


### `contain:content`

If we apply **`contain:content`** to all **`.card`** elements and **initially render the cards** we should not be able to land improvements.

![img-browser-render-pipeline](https://user-images.githubusercontent.com/95690470/159059677-06c6f6ee-0678-417b-b1cb-8c3a4053ff62.PNG)

Expected impact at bootstrap is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in painting as we render the first time
- ❌ no improvement in for offscreen nodes as we render the first time

**Measurement**

Running a measure gives the following flames:

![img-comparison-bootstrap-contain](https://user-images.githubusercontent.com/95690470/159004813-c593ccd5-039c-43be-9a79-5d468d84a2ed.PNG)

The measure showed the following outcome:
- ❌ no improvement in recalculate styles as we paint the first time 
- 🤷‍👎 somehow layouting is not the biggest improvement [1]
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
- ✔ slight improvement in painting items onscreen as we paint the first time 
- ✔ drastic improvement in painting items offscreen as we skip them completely.

**Measurement**

Running a measure gives the following flames:

![img-comparison-bootstrap-content-visibility](https://user-images.githubusercontent.com/95690470/159007219-676a1c18-bf12-4343-bd84-e1e51e7c21aa.PNG)

The measure showed the following outcome:
- ✔ drastic improvement in recalculate styles clearly visible (22 times faster)
- ✔ drastic improvement in layouting clearly visible (120 times faster)
- 🤷‍👍 drastic improvement in composit and small in paint is measurably faster [3]
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
