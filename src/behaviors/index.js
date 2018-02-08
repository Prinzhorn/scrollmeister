import Scrollmeister from 'scrollmeister.js';

import LayoutBehavior from 'behaviors/LayoutBehavior.js';
import DebugGuidesBehavior from 'behaviors/DebugGuidesBehavior.js';
import PositionBehavior from 'behaviors/position.js';
import BetterPositionBehavior from 'behaviors/betterposition.js';

Scrollmeister.defineBehavior(LayoutBehavior);
Scrollmeister.defineBehavior(DebugGuidesBehavior);

Scrollmeister.defineBehavior(PositionBehavior);
Scrollmeister.defineBehavior(BetterPositionBehavior);
