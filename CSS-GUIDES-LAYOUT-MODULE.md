# CSS Guides Layout Module

Just some random sketches of how Guides Layout could look in CSS. Clean af that is. This is _the_ layout module you'd want for scrolling websites. It has built-in support for parallax and pinning (imagine native browser support with these as first-class citizens).

One thing that Scrollmeister also has that we still cannot do in CSS is having the height defined as a ratio. E.g. having an element that is always `16:9`. This is trivial to implement inside the Guides Layout, because the width is _always_ well defined by the guides. It is not something that can be solved in a general purpose way, but inside of Guides Layout `height: 16 / 9` should just work. Or maybe allow unit-less numbers to make parsing backwards-compatible, e.g. `height: 0.5625` (9 divided by 16).

## Linear document flow

`.a`, `.b` and `.c` will all be displayed below each other. If they have margin-top/bottom it is respected.

```html
<div class="container">
	<div class="a"></div>
	<div class="b"></div>
	<div class="c"></div>
</div>
```

```css
.container {
	display: guides;
	guides-template: left 0 2vmin, center 50%, right 100% 2vmin;
}

.a {
	guides-snap: left center;
}

.b {
	guides-snap: left right;
}

.c {
	guides-snap: viewport;
}
```

## Break the flow (skip)

`.b` and `.c` will be displayed below `.a`, because `.c` skips `.b`.

```html
<div class="container">
	<div class="a"></div>
	<div class="b"></div>
	<div class="c"></div>
</div>
```

```css
.container {
	display: guides;
	guides-template: left 0 2vmin, center 50% 10px, right 100% 2vmin;
}

.a {
	guides-snap: viewport;
}

.b {
	guides-snap: left center;
}

.c {
	guides-snap: center right;
	guides-dependencies: skip 1;
}
```

## Follow multiple elements without a wrapper (consume)

`.d` will be below `.b` and `.c`, whichever is higher, because `.d` consumes two elements.

```html
<div class="container">
	<div class="a"></div>
	<div class="b"></div>
	<div class="c"></div>
	<div class="d"></div>
</div>
```

```css
.container {
	display: guides;
	guides-template: left 0 2vmin, center 50% 10px, right 100% 2vmin;
}

.a {
	guides-snap: viewport;
}

.b {
	guides-snap: left center;
}

.c {
	guides-snap: center right;
}

.d {
	guides-snap: left right;
	guides-dependencies: consume 2;
}
```

## Parallax

`.follower` will move in a parallax motion with `.leader` in a way such that their top is aligned when they enter the viewport (from the bottom) and their bottoms are aligned when they leave the viewport (at the top).

```html
<div class="container">
	<div class="leader">some long text</div>
	<div class="follower">some image</div>
</div>
```

```css
.container {
	display: guides;
	guides-template: left 0 2vmin, center 50% 10px, right 100% 2vmin;
}

.leader {
	guides-snap: left center;
}

.follower {
	guides-snap: center right;
	guides-mode: follow parallax;
}
```

## Pinning alongside a longer element

`.image` will be pinned alongside `.text`. It will enter the viewport with `.text` (both tops are aligned), the pin at the center of the viewport until it leaves with `.text` (bottoms aligned).

```html
<div class="container">
	<div class="text">...tons of lorem ipsum...</div>
	<img class="image" src="my-meme-collection/0081295.jpg">
</div>
```

```css
.container {
	display: guides;
	guides-template: left 0 2vmin, center 50% 10px, right 100% 2vmin;
}

.text {
	guides-snap: left center;
}

.image {
	guides-snap: center right;
	guides-mode: follow pin center;
}
```

## Right-aligned guide

Using a negative position the offset is calculated from the right. So if you want a right column that is always 200px you could do `calc(100% - 200px)` or just do `-200px`.

```css
.container {
	display: guides;
	guides-template: sidebar -200px;
}
```
