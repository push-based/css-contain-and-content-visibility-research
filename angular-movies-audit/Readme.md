# Audit on Angular movies project to improve performance with contain and content-visibility

URL
**http://localhost:4200/list/category/popular**

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



### Sidebar

Lets start with the sidebar as it is the easier part.

![sidebar-areas](https://user-images.githubusercontent.com/10064416/159578010-439bbd16-fdcf-4b32-8056-1795188f57e1.png)


A first step would be to apply `contain: content` (`contain: layout paint`) to the sidebar. I pick content as there are no visual overflows needed for userinteraction or so. At the end of this section I realized the whole sidebar is hidden on mobile but all the elements are rendered and layouted, so I added a `content-visibility: auto`  here too.

```css 
.side-drawer {
    contain: content;
    content-visibility: auto;
 }
```

Next I could also contain the scroll area and apply `content-visibility:auto` as it could improve potential offscreen menu elements.
I use a `contain-intrinsic-size` as i konw the item size `20px` and it will never change.

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



