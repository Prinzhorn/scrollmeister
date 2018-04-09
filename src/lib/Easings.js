export default {
	linear: function(p) {
		return p;
	},
	quad: function(p) {
		return p * p;
	},
	cubic: function(p) {
		return p * p * p;
	},
	swing: function(p) {
		return -Math.cos(p * Math.PI) / 2 + 0.5;
	},
	sqrt: function(p) {
		return Math.sqrt(p);
	},
	outCubic: function(p) {
		return Math.pow(p - 1, 3) + 1;
	},
	natural: function(p) {
		if (p === 0) {
			return 0;
		}

		return Math.exp(4 * (p - 1));
	},
	//see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
	bounce: function(p) {
		var a;

		if (p <= 0.5083) {
			a = 3;
		} else if (p <= 0.8489) {
			a = 9;
		} else if (p <= 0.96208) {
			a = 27;
		} else if (p <= 0.99981) {
			a = 91;
		} else {
			return 1;
		}

		return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);
	}
};
