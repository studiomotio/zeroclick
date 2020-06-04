'use strict';

import defaults from './defaults.js';

class ZeroClick {

  /**
    Class constructor
    @param {Object} properties - custom properties of the class
  */
  init(properties) {

    // assign custom user properties to defaults
    this._props = {
      ...defaults,
      ...properties
    };

    // init global navigation state
    this._navigating = false;

    // select all elements if a string is provided
    this._nodelist = typeof this._props.on === 'string' ? [...document.querySelectorAll(this._props.on)] : [this._props.on];

    // loop through all elements that will use the plugin
    this._nodelist.forEach((target) => {
      target.handler = {
        engage: () => {
          this._engage(target);
        },
        cancel: () => {
          this._cancel(target);
        },
        click: (e) => {
          this._click(e);
        }
      };

      target.addEventListener('mouseenter', target.handler.engage);
      target.addEventListener('mouseleave', target.handler.cancel);
      target.addEventListener('click', target.handler.click);
    });
  }

  /**
    Destroy all event listeners
  */
  destroy() {
    this._nodelist.forEach((target) => {
      target.removeEventListener('mouseenter', target.handler.engage);
      target.removeEventListener('mouseleave', target.handler.cancel);
      target.removeEventListener('click', target.handler.click);
    });
  }

  /**
    Refresh all event listeners using the current settings
  */
  refresh() {
    this.destroy();
    this.init(this._props);
  }

  /**
    Engage the link
    @param {HTMLElement} target - element on which the mouseover event is engaged
  */
  _engage(target) {
    if (this._navigating) {
      return;
    }

    this._props.onEngage({
      target: target,
      url: target.href
    });

    target.dispatchEvent(new CustomEvent('engage'));
    target.setAttribute('data-zeroclick', 'engage');

    this._props.current = {
      target: target,
      promise: new Promise((resolve, reject) => {
        if (typeof this._props.await === 'function') {
          this._props.await(resolve, reject);
          this._worker = reject;
        } else {
          this._worker = setTimeout(resolve, this._props.timeout);
        }
      }).then(() => {
        this._dispatch(target);
      }).catch(() => {
        this._reset();
      })
    };
  }

  /**
    Dispatch the click event
    @param {HTMLElement} target - element on which the click event is dispatched
  */
  _dispatch(target) {
    this._navigating = true;

    this._props.onDispatch({
      target: target,
      url: target.href
    });

    target.dispatchEvent(new CustomEvent('dispatch'));
    target.setAttribute('data-zeroclick', 'dispatch');

    target.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    }));

    this._reset();
  }

  /**
    Cancel the click event
    @param {HTMLElement} target - element on which the click event is canceled
  */
  _cancel(target) {
    if (this._navigating) {
      return;
    }

    if (typeof this._worker === 'undefined') {
      return;
    }

    if (typeof this._worker === 'function') {
      this._worker('cancel');
    }

    if (typeof this._worker === 'number') {
      clearTimeout(this._worker);
    }

    this._props.onCancel({
      target: target,
      url: target.href
    });

    target.dispatchEvent(new CustomEvent('cancel'));
    target.setAttribute('data-zeroclick', 'cancel');
  }

  /**
    Manage the user click event
    @param {MouseEvent} e - user click event
  */
  _click(e) {
    if (e.isTrusted && this._props.preventClick) {
      e.preventDefault();
      e.stopPropagation();

      return;
    }

    // clicking on a link is considered as cancelling the process
    this._cancel(e.target);
    this._navigating = true;
  }

  /**
    Reset the current worker
  */
  _reset() {
    delete this._worker;
  }

  /**
    Get the live properties
    @return {Object} defined and live properties
  */
  get props() {
    return this._props;
  }
}

// default export
const zeroclick = new ZeroClick();
export default zeroclick;
