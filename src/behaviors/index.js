import Scrollmeister from 'scrollmeister.js';

import LayoutBehavior from 'behaviors/LayoutBehavior.js';
import PositionBehavior from 'behaviors/position.js';
import BetterPositionBehavior from 'behaviors/betterposition.js';

Scrollmeister.defineBehavior('layout', LayoutBehavior);
Scrollmeister.defineBehavior('position', PositionBehavior);
Scrollmeister.defineBehavior('betterposition', BetterPositionBehavior);
