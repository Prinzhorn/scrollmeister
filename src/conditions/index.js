import Scrollmeister from 'scrollmeister.js';

Scrollmeister.defineCondition('s', () => window.innerWidth >= 576);
Scrollmeister.defineCondition('m', () => window.innerWidth >= 768);
Scrollmeister.defineCondition('l', () => window.innerWidth >= 992);
Scrollmeister.defineCondition('xl', () => window.innerWidth >= 1200);

Scrollmeister.defineCondition('s-down', () => window.innerWidth < 576);
Scrollmeister.defineCondition('m-down', () => window.innerWidth < 768);
Scrollmeister.defineCondition('l-down', () => window.innerWidth < 992);
Scrollmeister.defineCondition('xl-down', () => window.innerWidth < 1200);
