import Scrollmeister from 'scrollmeister.js';

import GuidesLayoutBehavior from 'behaviors/GuidesLayoutBehavior.js';
import ScrollBehavior from 'behaviors/ScrollBehavior.js';
import FakeScrollBehavior from 'behaviors/FakeScrollBehavior.js';
import DebugGuidesBehavior from 'behaviors/DebugGuidesBehavior.js';
import FadeInBehavior from 'behaviors/FadeInBehavior.js';

import LayoutBehavior from 'behaviors/LayoutBehavior.js';
import MediaBehavior from 'behaviors/MediaBehavior.js';
import MousetrapBehavior from 'behaviors/MousetrapBehavior.js';
//import FullscreenBehavior from 'behaviors/FullscreenBehavior.js';

Scrollmeister.registerBehavior(GuidesLayoutBehavior);
Scrollmeister.registerBehavior(ScrollBehavior);
Scrollmeister.registerBehavior(FakeScrollBehavior);
Scrollmeister.registerBehavior(DebugGuidesBehavior);
Scrollmeister.registerBehavior(FadeInBehavior);

Scrollmeister.registerBehavior(LayoutBehavior);
Scrollmeister.registerBehavior(MediaBehavior);
Scrollmeister.registerBehavior(MousetrapBehavior);
//Scrollmeister.registerBehavior(FullscreenBehavior);
