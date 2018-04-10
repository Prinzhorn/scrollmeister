# CSS Guides Layout Module

Just some random sketches of how Guides Layout could look in CSS. Clean af that is.

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
	guides-template: left 0 2vmin, center 50% 10px, centercollapsed 50%, right 100% 2vmin;
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

## Break the flow

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
	guides-template: left 0 2vmin, center 50% 10px, centercollapsed 50%, right 100% 2vmin;
}

.a {
	guides-snap: left center;
}

.b {
	guides-snap: left right;
}

.c {
	guides-snap: viewport;
	guides-dependencies: skip 1;
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
