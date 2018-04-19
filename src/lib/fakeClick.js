let initialTouchX;
let initialTouchY;
let initialTouchElement;

export default {
	start: function(e) {
		const touch = e.changedTouches[0];
		initialTouchX = touch.clientX;
		initialTouchY = touch.clientY;
		initialTouchElement = e.target;

		//We don't want text nodes.
		while (initialTouchElement.nodeType === Node.TEXT_NODE) {
			initialTouchElement = initialTouchElement.parentNode;
		}
	},

	end: function(e) {
		const touch = e.changedTouches[0];
		const currentTouchX = touch.clientX;
		const currentTouchY = touch.clientY;
		const distanceX = initialTouchX - currentTouchX;
		const distanceY = initialTouchY - currentTouchY;
		const distance2 = distanceX * distanceX + distanceY * distanceY;
		const element = initialTouchElement;

		//Check if it was more like a tap (moved less than 7px).
		if (distance2 < 49) {
			//It was a tap, click the element.
			if (element.tagName === 'A') {
				let clickEvent = document.createEvent('MouseEvents');
				clickEvent.initMouseEvent(
					'click',
					true,
					true,
					e.view,
					1,
					touch.screenX,
					touch.screenY,
					touch.clientX,
					touch.clientY,
					e.ctrlKey,
					e.altKey,
					e.shiftKey,
					e.metaKey,
					0,
					null
				);
				element.dispatchEvent(clickEvent);
			}

			element.focus();
		}
	}
};
