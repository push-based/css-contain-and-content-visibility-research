# Audit on Angular movies project to improve performance with contain and content-visibility

URL
**http://localhost:4200/list/category/popular**

**Desktop view:**
![angular movies](https://user-images.githubusercontent.com/10064416/159556808-c022242e-bbe0-49c5-a1bc-3cc4e4ffc7b3.png)

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

[IMG page full size screen shot]

Let's start with the general bootstrapping and page rendering process.

[IMG page bootstrap flames]

The bage it self is in a really good state. the total rendering and paint togeather is under 200ms which is really fast, but still we can improve.
After the initial page render different HTTP requests bounce in and apply visual updates to the page. The sidemenu and the pages content is updating with remote content.

Those updates trgger all the paint work after the initial rendering.

A good first step would be to shield the different areas and their updates form other areas.

Here I identified 3 different main sreas:
- header
- sidebar
- content

[IMG areas]


### Sidebar

Lets start with the sidebar as it is the easier part.

[IMG areas]

A first step would be to apply `contain: content` (`contain: layout paint`) to the sidebar. I pick content as there are no visual overflows needed for userinteraction or so.

```css 
  .side-drawer {
    contain: content;
  }
```

Next i could also contain the scroll area and apply `content-visibility:auto` as it could improve potential offscreen menu elements.

.navigation {
  contain:content;
}

a {
  content-visibility: auto;
  contain-intrinsic-size: 20px;
}
```

After that i realized the whole sidebar is hidden on mobile but all the elements are rendered and layouted, so I added a `content-visibility: auto`  here too.

```css 
.side-drawer {
  content-visibility: auto;
}
```

[IMG improvements]

### Toolbar



