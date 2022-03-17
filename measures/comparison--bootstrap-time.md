window.innerWidth = 1140px
window.innerHeight = 975px
 
# Comparison of none, `contain` and `content-visibility` - Cards Bootstrap 

## URL

`https://typescript-nprm3z.stackblitz.io/`

![contain-comparison-cards](https://user-images.githubusercontent.com/95690470/158879336-539df79a-4f4e-40d2-ad7c-147dc03f785e.PNG)


## Description

This measure tests the different 3 different settings on the same page. 
The outcome helps to compare the expected impact in the bootstrap phase.

The target node under test is the left list container.

![contain-comparison-cards-diagram](https://user-images.githubusercontent.com/95690470/158891348-220e5a77-0cc2-43f6-9cba-734c565e06fd.PNG)


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
