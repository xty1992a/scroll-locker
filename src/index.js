const MIN_DISTANCE = 10;
import {on, off, getScrollEventTarget, preventDefault} from './utils.js';

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
	return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
	return 'vertical';
  }
  return '';
}

function insertStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
  .overflow_hidden{
  	overflow: hidden;
  }
  `;
  document.head.appendChild(style);
}

insertStyle();

export default class ScrollLocker {
  direction = '';
  deltaX = 0;
  deltaY = 0;
  offsetX = 0;
  offsetY = 0;

  constructor() {
  }

  touchStart = (event) => {
	this.resetTouchStatus();
	this.startX = event.touches[0].clientX;
	this.startY = event.touches[0].clientY;
  };

  touchMove = (event) => {
	const touch = event.touches[0];
	this.deltaX = touch.clientX - this.startX;
	this.deltaY = touch.clientY - this.startY;
	this.offsetX = Math.abs(this.deltaX);
	this.offsetY = Math.abs(this.deltaY);
	this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
  };

  onTouchMove = (event) => {
	this.touchMove(event);
	const direction = this.deltaY > 0 ? '10' : '01';
	const el = getScrollEventTarget(event.target, this.$el);
	const {scrollHeight, offsetHeight, scrollTop} = el;
	let status = '11';

	if (scrollTop === 0) {
	  status = offsetHeight >= scrollHeight ? '00' : '01';
	}
	else if (scrollTop + offsetHeight >= scrollHeight) {
	  status = '10';
	}

	if (
		status !== '11' &&
		this.direction === 'vertical' &&
		!(parseInt(status, 2) & parseInt(direction, 2))
	) {
	  preventDefault(event, true);
	}
  };

  resetTouchStatus = () => {
	this.direction = '';
	this.deltaX = 0;
	this.deltaY = 0;
	this.offsetX = 0;
	this.offsetY = 0;
  };

  lock = () => {
	document.body.className += ' overflow_hidden';
	on(document, 'touchstart', this.touchStart);
	on(document, 'touchmove', this.onTouchMove);
  };

  release = () => {
	document.body.className.replace(' overflow_hidden', '');
	off(document, 'touchstart', this.touchStart);
	off(document, 'touchmove', this.onTouchMove);
  };
}
