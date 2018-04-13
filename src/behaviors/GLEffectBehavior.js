import Behavior from 'behaviors/Behavior.js';

let createRegl;

try {
	createRegl = require('regl');
} catch (ignore) {
	createRegl = null;
}

export default class GLEffectBehavior extends Behavior {
	static get schema() {
		return {
			shader: {
				type: 'template',
				default: 'auto'
			}
		};
	}

	static get behaviorName() {
		return 'gl-effect';
	}

	static get dependencies() {
		return ['layout', 'interpolate', 'media'];
	}

	attach() {
		if (!createRegl) {
			return;
		}

		this._sourceElement = this.el.querySelector('img, video');
		this._canvas = this._createCanvas();

		if (!this._initRegl()) {
			this._removeCanvas();
			return;
		}

		this.connectTo('layout', this._resize.bind(this));
		this.connectTo('interpolate', this._render.bind(this), () => {
			//This updates the texture in addition to the render loop.
			//It catches stuff like onload for images and updates videos that are currently playing (even if you're not scrolling).
			this._pollTimer = setInterval(this._pollSource.bind(this, true), 1000 / 30);
		});
	}

	update() {
		this._initRegl();
	}

	detach() {
		if (!createRegl) {
			return;
		}

		clearInterval(this._pollTimer);
		this._regl.destroy();
	}

	_createCanvas() {
		const canvas = document.createElement('canvas');

		this.appendChild(canvas);

		return canvas;
	}

	_removeCanvas() {
		this.removeChild(this._canvas);
	}

	_resize({ layout }) {
		this._canvas.width = layout.width;
		this._canvas.height = layout.height;
		this._canvas.style.cssText = this._sourceElement.style.cssText;
	}

	_initRegl() {
		if (this._regl) {
			this._regl.destroy();
		}

		let regl;

		try {
			regl = createRegl(this._canvas);
		} catch (ignore) {
			createRegl = null;
			return false;
		}

		this._draw = regl({
			frag: this.props.shader.template,
			vert: `
				precision mediump float;

				attribute vec2 position;

				varying vec2 uv;

				void main () {
					uv = vec2(1.0 - position.x, position.y);
					gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
				}
			`,

			attributes: {
				position: [-2, 0, 0, -2, 2, 2]
			},

			uniforms: {
				image: regl.prop('image'),
				progress: regl.prop('progress'),
				size: regl.prop('size')
			},

			count: 3
		});

		this._regl = regl;

		return true;
	}

	_sourceIsReady() {
		if (this._sourceElement.tagName === 'IMG') {
			return this._sourceElement.complete && this._sourceElement.naturalWidth > 0;
		}

		if (this._sourceElement.tagName === 'VIDEO') {
			return this._sourceElement.readyState >= 2 && !this._sourceElement.seeking;
		}

		return false;
	}

	_getSourceIdentifier() {
		if (this._sourceElement.tagName === 'IMG') {
			return this._sourceElement.src;
		}

		if (this._sourceElement.tagName === 'VIDEO') {
			return [this._sourceElement.src, this._sourceElement.currentTime].join(';');
		}
	}

	_pollSource(render = false) {
		let sourceIdentifier = this._getSourceIdentifier();

		//The source has changed.
		if (this._sourceIsReady() && sourceIdentifier !== this._sourceIdentifier) {
			this._sourceIdentifier = sourceIdentifier;
			this._updateTexture(render);

			if (render) {
				this._render(this.el.interpolate);
			}
		}
	}

	_updateTexture() {
		if (this._texture) {
			this._texture.destroy();
			this._texture = null;
		}

		//This mainly catches IE 11, which does not support <video> textures at all
		//Will also catch cases where CORS is not supported or configured.
		try {
			//TODO: The texture uses the unscaled image which makes swirl effect looks hella unantialiased.
			this._texture = this._regl.texture(this._sourceElement);
		} catch (err) {
			//TODO: should we do something with the error or just let it happen every frame?
			//Maybe only do something when the source changes.
			return;
		}
	}

	_render(interpolateBehavior) {
		this._pollSource();

		if (!this._texture) {
			return;
		}

		this._regl.poll();

		this._draw({
			image: this._texture,
			progress: interpolateBehavior.values.progress,
			size: [this._canvas.width, this._canvas.height]
		});

		this.notify();
	}
}
