import Scrollmeister from 'scrollmeister.js';

import GuideLayoutBehavior from 'behaviors/GuideLayoutBehavior.js';
import DebugGuidesBehavior from 'behaviors/DebugGuidesBehavior.js';
import FadeInBehavior from 'behaviors/FadeInBehavior.js';

import LayoutBehavior from 'behaviors/LayoutBehavior.js';
import LazyLoadBehavior from 'behaviors/LazyLoadBehavior.js';

Scrollmeister.defineBehavior(GuideLayoutBehavior);
Scrollmeister.defineBehavior(DebugGuidesBehavior);
Scrollmeister.defineBehavior(FadeInBehavior);

Scrollmeister.defineBehavior(LayoutBehavior);
Scrollmeister.defineBehavior(LazyLoadBehavior);
