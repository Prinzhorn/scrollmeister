import 'document-register-element';
import raf from 'raf';

import ScrollMeisterComponent from 'components/ScrollMeisterComponent.js';
import ElementMeisterComponent from 'components/ElementMeisterComponent.js';

raf(() => {
	customElements.define('scroll-meister', ScrollMeisterComponent);
	customElements.define('el-meister', ElementMeisterComponent);
});
