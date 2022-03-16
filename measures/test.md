 
# Correct usage of contain properties 


## URL

`https://contain-tests-css-performance.stackblitz.io`

![contain-basic-tests](https://user-images.githubusercontent.com/95690470/158649244-e1d362b2-0803-48da-b22b-7c0443f8bb19.PNG)

## Description

This measure tests the different contain properties without load. It's should generate a reproducable validation of the theoretical knowledge.

The target node under test is the border box around the loading bar.
The radio inputs apply the styles visible below the target and color the bar.

### Layout root

By default the layout root is the document.
Any changes inside the target node will cause a relayout of the whole page.

This can be check if we a recording of te the animation and click a tasks layout work.
![img-contain-and-layout-root--document](https://user-images.githubusercontent.com/95690470/158653604-0754b098-dbcb-4adc-8c0e-8865859d0572.PNG)

We can see the layout root is `#document`.

We can define the layoutroot by the following settings:

```css
.contain-target {
 
}
```

This can be evaluated over again the performance tab:
![img-contain-and-layout-root--node](https://user-images.githubusercontent.com/95690470/158654190-dda771b2-66ca-463e-8b18-8c53e2a808ff.PNG)


### Visible overflow

the visible overflow is defined over the `overflow` attribute and by default visible.
We can restric this and usr a scroll bar intesad (or even hide the scrollba). This limites the paint area of the node.

![img-contain-and-overflow](https://user-images.githubusercontent.com/95690470/158661451-50a9d0de-ee77-444a-b166-23f1a860fe1a.PNG)


## Comparison:

| Value   | Impact | Usage  | Layout Root | Overflow | Description                           |
| ------- | ------ | ------ | ----------- | -------- | ------------------------------------- | 
| none    | n/a    | n/a    | document    | visible  | Default value with no effect          |
| size    | ~      | +++    | document    | visible  |                                       |
| layout  | +++    | --     | node        | hidden   | below-the fold nodes [1]              |
| paint   | ++     | -      | node        | hidden   | below-the fold nodes [1]              |
|   ---   |  ---   |  ---   | ---         |  ---     |  ---                                  |
| content |        | ++     |             | visible  | Shorthand for `layout` `paint`        |
| strict  |        | --     |             | hidden   | Shorthand for `layout` `paint` `size` |

### Measurement Result

- [Timeline - contain-none](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-none.json)
- [Timeline - contain-size](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-size.json)
- [Timeline - contain-layout](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-layout.json)
- [Timeline - contain-paint](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-paint.json)
- [Timeline - contain-content](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-content.json)
- [Timeline - contain-strict](https://chromedevtools.github.io/timeline-viewer/?loadTimelineFromURL=https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-strict.json)




### Attachments with raw measurements

> Raw files and screenshots of measurements can be found in the `/raw` directory.

- [Profile-contain-none.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-none.json)
- [Profile-contain-size.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-size.json)
- [Profile-contain-layout.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-layout.json)
- [Profile-contain-paint.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-paint.json)
- [Profile-contain-contain.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-contain.json)
- [Profile-contain-strict.json](https://raw.githubusercontent.com/push-based/css-contain-research/master/measures/Profile-contain-strict.json)


### Runtime Settings 

default
