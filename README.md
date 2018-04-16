# What is Scrollmeister?

Scrollmeister is an open-source JavaScript framework to declaratively build scrolling experiences. Using custom elements (`<scroll-meister>`, `<element-meister>` and `<shadow-meister>`) you can create complex interactive scrolling pages _without a single line of code_. All you need is an HTML editor and you're good to go, you can even render the pages on the server. Scrollmeister comes with it's own layout engine called Guides Layout. It was built from the ground up with scrolling interactions in mind. This makes it ridiculously performant (on both desktop and touch devices).

# What is it _not_?

Scrollmeister solves a particular problem really well, but it is important to understand when _not_ to use Scrollmeister.

* Scrollmeister is not a drop-in library that you can use with your existing website. To achieve its flexibility and performance Scrollmeister needs full control over the elements of a web page. However, Scrollmeister does not lock you into its system in the sense that you can do whatever you want _inside_ of a `<element-meister>` Element.
* If you're creating a "regular" public facing website then Scrollmeister might not be the right choice. If all you need is a parallax header image then just use a jQuery plugin. Scrollmeister is meant for complex scrolling interactions spanning multiple elements, e.g. stories or presentations.

# Docs

Check out the [website](https://www.scrollmeister.com/) and [demos](https://www.scrollmeister.com/demos/) for now, this is highly WIP.
