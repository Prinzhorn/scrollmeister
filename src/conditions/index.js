import Scrollmeister from 'scrollmeister.js';

//TODO: do we want it that way? Should defineCondition return a function to update the condition?
//They should be pure and only rely on their parameters.
//Should it accept parameters?
//let updateXS = Scrollmeister.defineCondition('s', () => window.innerWidth >= 576);
//Or how about: Scrollmeister.updateCondition('m', window)

Scrollmeister.defineCondition(
	'm',
	win => win.innerWidth >= 768,
	update => {
		window.addEventListener(
			'resize',
			() => {
				update();
			},
			false
		);

		update();
	}
);
Scrollmeister.defineCondition('l', win => win.innerWidth >= 992);
Scrollmeister.defineCondition('xl', win => win.innerWidth >= 1200);

Scrollmeister.defineCondition('s-down', win => win.innerWidth < 576);
Scrollmeister.defineCondition('m-down', win => win.innerWidth < 768);
Scrollmeister.defineCondition('l-down', win => win.innerWidth < 992);
Scrollmeister.defineCondition('xl-down', win => win.innerWidth < 1200);

Scrollmeister.defineCondition('portrait', win => win.innerWidth < win.innerHeight);
Scrollmeister.defineCondition('landscape', win => win.innerWidth >= win.innerHeight);

//TODO: let's see what Modernizr, feature.js and has.js offer to get some inspiration.
Scrollmeister.defineCondition('webgl', () => true);

//TODO: function is optional, a condition can also be constant
Scrollmeister.defineCondition('websockets', () => typeof WebSocket === 'function');

//TODO: do we allow element-queries? They can potentially end in infinite loops.

//TODO: Allow composing conditions from existing
//let update = Scrollmeister.defineCondition('wat', ['xl', 'portrait'], (xl, portrait, more, extra) => xl && portrait);
//update('foo', 'bar') will set "more" and "extra" to these.
Scrollmeister.defineCondition('wat', ['xl', 'portrait'], (xl, portrait) => xl && portrait);

//TODO: Condition changes propagate synchrnously. But Scrollmeister will batch them and schedule an update just like detach/attach

//window.addEventListener('resize', ....)
