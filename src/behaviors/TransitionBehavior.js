// @flow

import Behavior from 'behaviors/Behavior.js';

export default class TransitionBehavior extends Behavior {
  static get schema(): any {
    return {};
  }

  static get dependencies(): Array<string> {
    return ['interpolate'];
  }

  static get behaviorName(): string {
    return 'transition';
  }

  attach() {
    this.listen(this.el, 'interpolate:interpolate', () => {
      this.el.style.opacity = this.el.interpolate.opacity;
    });
  }
}
