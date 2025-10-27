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
