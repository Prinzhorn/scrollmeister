import Scrollmeister from '../scrollmeister.js';

import LayoutBehavior from './layout.js';
import PositionBehavior from './position.js';
import BetterPositionBehavior from './betterposition.js';

Scrollmeister.defineBehavior('layout', LayoutBehavior);
Scrollmeister.defineBehavior('position', PositionBehavior);
Scrollmeister.defineBehavior('betterposition', BetterPositionBehavior);
