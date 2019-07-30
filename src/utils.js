export let supportsPassive = true;
try {
  const opts = {};
  Object.defineProperty(opts, 'passive', {
	get() {
	  /* istanbul ignore next */
	  supportsPassive = true;
	}
  });
  window.addEventListener('test-passive', null, opts);
} catch (e) {
}

export function getScrollEventTarget(element, rootParent = window) {
  let node = element;
  while (
	  node &&
	  node.tagName !== 'HTML' &&
	  node.tagName !== 'BODY' &&
	  node.nodeType === 1 &&
	  node !== rootParent
	  ) {
	const {overflowY} = window.getComputedStyle(node);
	if (overflowY === 'scroll' || overflowY === 'auto') {
	  return node;
	}
	node = node.parentNode;
  }
  return rootParent;
}

export function on(
	target,
	event,
	handler,
	passive = false
) {
  target.addEventListener(
	  event,
	  handler,
	  supportsPassive ? {capture: false, passive} : false
  );
}

export function off(target, event, handler) {
  target.removeEventListener(event, handler);
}

export function stopPropagation(event) {
  event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
	event.preventDefault();
  }

  if (isStopPropagation) {
	stopPropagation(event);
  }
}
