window.innerWidth = 1140px
window.innerHeight = 975px
 
# Comparison of none, `contain` and `content-visibility` - Cards Bootstrap 

## URL

`https://typescript-nprm3z.stackblitz.io/`
![contain-comparison--onscreen-cards](https://user-images.githubusercontent.com/95690470/159073370-63f05b4f-d186-4b17-8891-79e985f1ad51.PNG)


## Description

This measure tests the offscreen benefits of `contain:content` and `content-visibility:auto`. 

![contain-comparison-cards-offscreen-diagram](https://user-images.githubusercontent.com/95690470/159065333-5c53d26a-3222-49bc-88fa-50451f0b2984.PNG)

### Case setup

As the page can be set up in different way lets quickly clarify the setup.

To test onscreen offscreen render performance we specify 2 screen states "default" and "offscreen". default displays all 1tems on screen, the other state display all items offscreen with a `margin-top: 9000px`. By adding items in those 2 states we can measure the offscreen node benefits more accurate.

The second test besides adding and removing DOM nodes is trigger recalculation with a animation. In our case it is just a color fade from purple to black.

![contain-comparison--offscreen-cards-setup](https://user-images.githubusercontent.com/95690470/159068427-e5ea1364-407d-4bd7-a174-1a793af6d3a6.PNG)

The measure consists out of 2 types of settings:
- onscreen only nodes (to prove no effect and create a reference to the offscreen case)
- offscreen only nodes (to prove the effect on offscreen nodes)

## Onscreen nodes only

### `contain: none`  

![img-comparison-onscreen-none](https://user-images.githubusercontent.com/95690470/159072468-37d060fc-d632-4f7d-8548-cf960f93c228.PNG)

This mesure is herre as a reference only.

### `contain:content` - onscreen nodes only  

If we apply **`contain:content`** to all **`.card`** elements and **initially render the cards** we should not be able to land improvements for animation slightly.

![img-browser-render-pipeline](https://user-images.githubusercontent.com/95690470/159059677-06c6f6ee-0678-417b-b1cb-8c3a4053ff62.PNG)

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in hittest as we render the first time
- ❌ no improvement in painting as we render the first time
- ❌ no improvement in composite as we render the first time
- ❌ no improvement for offscreen nodes as there are none

Expected impact at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout` (included in `contain:content`)
- ✔ improvement in composite as we shield painting with `contain:layout` (included in `contain:content`)
- ❌ no improvement for offscreen nodes as there are none

**Measurement**

Running a measure gives the following flames:

![img-comparison-onscreen-contain](https://user-images.githubusercontent.com/95690470/159072540-d55cccf4-668e-4680-82dd-01e07b9b264b.PNG)

Outcome at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in hittest as we render the first time
- ❌ no improvement in painting as we render the first time
- ❌ no improvement in composite as we render the first time
- ❌ no improvement for offscreen nodes as there are none

Outcome at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout`
- ✔ improvement in composite as we shield painting with `contain:layout`
- ❌ no improvement for offscreen nodes as there are none



### `content-visibility:auto` 

If we apply **`content-visibility:auto`** to all **`.card`** elements and **initially render the cards** we should not be able to land improvements for animation slightly.

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time and all nodes are onscreen
- ❌ no improvement in layouting as we render the first time and all nodes are onscreen
- ❌ no improvement in hittest as we render the first time and all nodes are onscreen
- ❌ no improvement in painting as we render the first time and all nodes are onscreen
- ❌ no improvement in composite as we render the first time and all nodes are onscreen
- ❌ no improvement for offscreen as we render the first time and all nodes are onscreen

Expected impact at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout` (included in `contain:content`)
- ✔ improvement in composite as we shield painting with `contain:layout` (included in `contain:content`)
- ❌ no improvement for offscreen nodes as there are none

**Measurement**

Running a measure gives the following flames:

![img-comparison-onscreen-content-visibility](https://user-images.githubusercontent.com/95690470/159073015-01e46a35-4ce4-48d4-9f08-09459784c411.PNG)

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles visible
- ❌ no improvement in layouting visible
- ❌ no improvement in hit test visible
- ❌ no improvement in painting visible
- ❌ no improvement for offscreen visible
- 
Expected impact at **animation** is:
- ✔  improvement in recalculate styles visible
- ✔  improvement in layouting visible
- ❌ no improvement in hit test visible
- ✔  improvement in painting visible
- ❌ no improvement for offscreen nodes as there are none

## Offscreen nodes only

### `contain: none`  

![img-comparison-offscreen-none](https://user-images.githubusercontent.com/95690470/159096345-abfbe1f0-8ffa-43dc-8895-72ea883a857e.PNG)

This mesure is herre as a reference only.

### `contain:content` - onscreen nodes only  

If we apply **`contain:content`** to all **`.card`** elements and **initially render the cards** we should not be able to land improvements for animation slightly.

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in hittest as we render the first time
- ❌ no improvement in painting as we render the first time
- ❌ no improvement in composite as we render the first time
- ❌ no improvement for offscreen nodes as there are none

Expected impact at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout` (included in `contain:content`)
- ✔ improvement in composite as we shield painting with `contain:layout` (included in `contain:content`)
- ❌ no improvement for offscreen nodes as there are none

**Measurement**

Running a measure gives the following flames:

![img-comparison-offscreen-contain](https://user-images.githubusercontent.com/95690470/159096356-6a9eb4a6-4a34-43a2-9d91-7ad225413361.PNG)

Outcome at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time
- ❌ no improvement in layouting as we render the first time
- ❌ no improvement in hittest as we render the first time
- ❌ no improvement in painting as we render the first time
- ❌ no improvement in composite as we render the first time
- ❌ no improvement for offscreen nodes as there are none

Outcome at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout`
- ✔ improvement in composite as we shield painting with `contain:layout`
- ❌ no improvement for offscreen nodes as there are none

### `content-visibility:auto` 

If we apply **`content-visibility:auto`** to all **`.card`** elements and **initially render the cards** we should not be able to land improvements for animation slightly.

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles as we render the first time and all nodes are onscreen
- ❌ no improvement in layouting as we render the first time and all nodes are onscreen
- ❌ no improvement in hittest as we render the first time and all nodes are onscreen
- ❌ no improvement in painting as we render the first time and all nodes are onscreen
- ❌ no improvement in composite as we render the first time and all nodes are onscreen
- ❌ no improvement for offscreen as we render the first time and all nodes are onscreen

Expected impact at **animation** is:
- ✔ improvement in recalculate styles shield it with `contain:layout` (included in `contain:content`)
- ✔ improvement in layouting as we shield it with `contain:layout`
- ❌ no improvement in hittest as we still render all nodes
- ✔ improvement in painting as we shield painting with `contain:layout` (included in `contain:content`)
- ✔ improvement in composite as we shield painting with `contain:layout` (included in `contain:content`)
- ❌ no improvement for offscreen nodes as there are none

**Measurement**

Running a measure gives the following flames:

![img-comparison-offscreen-content-visibility](https://user-images.githubusercontent.com/95690470/159096379-ad8d1036-bb26-47d8-a9ac-17897a766706.PNG)

Expected impact at **bootstrap** is:
- ❌ no improvement in recalculate styles visible
- ❌ no improvement in layouting visible
- ❌ no improvement in hit test visible
- ❌ no improvement in painting visible
- ❌ no improvement for offscreen visible
- 
Expected impact at **animation** is:
- ✔  improvement in recalculate styles visible
- ✔  improvement in layouting visible
- ❌ no improvement in hit test visible
- ✔  improvement in painting visible
- ❌ no improvement for offscreen nodes as there are none
