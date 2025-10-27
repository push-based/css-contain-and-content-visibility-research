# Audit on Angular movies project to improve performance with `contain` and `content-visibility`

## TL;DR

![img-ngm-after](https://user-images.githubusercontent.com/10064416/159596750-604fb5e7-9e58-4f5b-97eb-360907f65397.png)

PR: https://github.com/tastejs/angular-movies/pull/107 


## Description 

URL
**https://angular-movies-a12d3.web.app/**

**Desktop view:**
![img-ngm-overview](https://user-images.githubusercontent.com/10064416/159577772-30983977-65b9-40a8-bc1a-293922bb7876.png)

To start I just opened up the application and started browsing. I randomli clicked links and refreshed the page in multiple different stages.

What I am looking for is interactoins or load cases where one of the following is true:
- paint heavy on/offscreen content
- layout heavy parts of the page
- lot of offscreen content
- static content
- a page layout with fixed dimensions in some sections (header, footer, sidebar)
- animations/effects triggeres on UI interaction or loading spinner

I spotted some areas where i immediately could apply changes and test, but before I start I try to get a good understanding of the pages loading behaviour and see if there are any special things to consider.
It also helps me to structure the page into their layouting areas.


Let's start with the general bootstrapping and page rendering process.

![img-ngm-before](https://user-images.githubusercontent.com/10064416/159577824-84507a1f-3628-43a7-b287-321000d3cbf2.png)

The bage it self is in a really good state. the total rendering and paint togeather is under 200ms which is really fast, but still we can improve.
After the initial page render different HTTP requests bounce in and apply visual updates to the page. The sidemenu and the pages content is updating with remote content.

Those updates trgger all the paint work after the initial rendering.

A good first step would be to shield the different areas and their updates form other areas.

Here I identified 3 different main sreas:
- header
- sidebar
- content

![img-ngm-areas](https://user-images.githubusercontent.com/10064416/159577882-015333a6-31ba-437e-94be-4eb9c29f2ee3.png)

## Improvements

### Sidebar

Lets start with the sidebar as it is the easier part.

![sidebar-areas](https://user-images.githubusercontent.com/10064416/159578010-439bbd16-fdcf-4b32-8056-1795188f57e1.png)


A first step would be to apply `contain: strict` (`contain: layout paint size`) to the sidebar. I pick content as there are no visual overflows needed for userinteraction or so. At the end of this section I realized the whole sidebar is hidden on mobile but all the elements are rendered and layouted, so I added a `content-visibility: auto`  here too.

```css 
.side-drawer {
    contain: strict;
    content-visibility: auto;
 }
```

Next I could also contain the scroll area and apply `content-visibility:auto` as it could improve potential offscreen menu elements.
I use a `contain-intrinsic-size` as i konw the item size `20px` and it will never change.

```css
.navigation {
  contain:content;
}

a {
  content-visibility: auto;
  contain-intrinsic-size: 20px;
}
```

The biggest impact is on mobile for the sidebar, but also on desktop we have small improvements at bootstrap time.

![bootstrap-comparison](https://user-images.githubusercontent.com/10064416/159578036-78c5ec25-8bbd-40bc-b128-2d26db1efed0.png)

The initial rendering of the sidebar if not nearly invisible and updates over all are slightly (but irrelevent) faster.
![bootstrap-comparison-mobile](https://user-images.githubusercontent.com/10064416/159578060-a223da95-794e-407c-986c-3b385123276c.png)

### Toolbar

The toolbar is the next small area we can focus on.

![toolbar-areas](https://user-images.githubusercontent.com/10064416/159584191-39a5b8bc-414a-4956-8df1-aad640464b42.png)

The interesting part here is the searchbox that has a animation on `width` focus. The first thing i did to isolate the animation was to set `contain:layout` on the toolbar area (I did not use `contain:content` includes `paint` as we have important visible overflow, the account menu). 

```css
.ui-toolbar {
  contain: layout;
}

The form it self can get `contain:strict` to shield the focus style of the input.

```css
.form {
  contain: strict;
}
```

As this showed only slight improvements I pushed the width animation into the composition layer with translatez and I applied will-chnage:width to optimize the animation furter. 


```css
.form {
  transform: translateZ(0px);
  will-change: width;
}
```

With this change we get a nice improvement for the input interaction.
We can also have a look into the layers panel and we would see that the inputbox is now a new layer.

![bootstrap-toolbar-comparison-interaction](https://user-images.githubusercontent.com/10064416/159585327-c1a77f65-84f7-46d6-a1d0-60c0f28b1d8b.png)

### Content area

As the content area is dynamic the content is from page to page different.
We will focus on the Main list and the detail view only to limit the scope of the audit.

![ngm-overview-detail-areas](https://user-images.githubusercontent.com/10064416/159586586-19776ee8-5f5a-489c-abb5-399d68080d39.png)

#### Main List

The main list has 2 areas:
- Headline
- List

The headline is a good candidate for the `content` value as it can change it's height if the text changes.
Here we can use `contain:content`.

```css
header {
  contain: content;
}
```

The list is a good cast for `content-visibility: auto` but also some containent is possible:

```css
ui-grid {
  contain: layout;
}
```


```css/*
.ui-movie-list {
  contain: content;
}

.ui-grid-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 450px;
}
```

The desktop view got improved a little bit.

![img-bootstrap-list-content-comparison](https://user-images.githubusercontent.com/10064416/159591557-66742e97-401b-4927-855a-6aea52f24cd6.png)

A really nice impact is visible for mobile.
![img-bootstrap-list-content-comparison-mobile](https://user-images.githubusercontent.com/10064416/159591561-da2acd01-7ac2-4199-9f96-a8bbca85264e.png)

#### Detail Page

The main list has 2 areas:
- Headline
- Movieinfos
- Cast list
- Reccomendaton list

The heading and the list already got improved in the list page.

The cast list is also of fixed height. here we can apply `strict`. As it has a fixed height and is not visible in mobile we can add `content-visibility:auto;` and contain its intrinsic size.

```css
.movie-detail--cast-list {
  contain: strict;
  content-visibility: auto;
  contain-itrinsic-size: 50px;
}
```

We also can contain the layout of the reccommendatin section.


## Comparisom

![img-ngm-after](https://user-images.githubusercontent.com/10064416/159596750-604fb5e7-9e58-4f5b-97eb-360907f65397.png)
