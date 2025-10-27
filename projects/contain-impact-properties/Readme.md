**Legend**:

- [L] Layout work
- [l] layout containment
- [P] Paint work
- [p] paint containment
- [S] Size work
- [s] size containment
- [Y] Style work
- [y] style containment
- [Off] offscreen node
- [On] onscreen node
- [Ob] obscured node => (partially) out of border-box


# Obscured Nodes

An example of this is a contained element not in view at the end of a block element and the beginning of that block element is visible.

# Measurements

- ❌ no improvement in recalculate styles 

## Layout

### [P,l,On] (test no improvement for different work)
Improvement in:
- ❌ layouting
- ❌ hittest
- ❌ painting
- ❌ composite



### [L,l,On]

Improvement in:
- ✔ layouting *
- ❌ hittest
- ❌ painting
- ❌ composite

[*]  as we shield layouting with `contain:layout`
[*]  `Update Layer Tree` significantly improved (basically disappears) when work is performed outside of the contained element

### [L,l,Off]

Improvement in:
- ❌ layouting *
- ❌ hittest
- ❌ painting
- ❌ composite

[*] no further improvement compated to measure [L,l,On]

### [P,p,Off]

Improvement in:
- ❌ layouting *
- ❌ hittest
- ❌ painting
- ❌ composite

[*]  as we shield layouting with `contain:layout`

## Paint

### [L,p,On] (test no improvement for different work)
Improvement in:
- ❌ layouting *
- ❌ hittest
- ❌ painting
- ❌ composite  

[*] as we shield painting with `contain:paint` and this is a different type of work 

### [P,p,On]
- ❌ layouting *
- ❌ hittest
- ✔  painting **
- ✔  composite **  

[*] no improvement as different work type
[**] as we shield painting with `contain:paint`  

### [P,p,Off]

- ❌ layouting *
- ❌ hittest
- ✔  painting **
- ✔  composite ** 

[*] no improvement as different work type
[**] as we dont paint offscreen nodes 

### [P,p,Ob]
- ❌ layouting
- ❌ hittest
- ❌ painting
- ❌ composite

[*] no further improvement compated to measure [L,l,Off]

## Size

TBD

## Style

TBD
