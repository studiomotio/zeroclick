'use strict';

import defaults from './defaults.js';

export default class ZeroClick {

  /**
    Class constructor
    @param {Object} properties - custom properties of the class
  */
  constructor(properties) {

    // assign custom user properties to defaults
    this._props = {
      ...defaults,
      ...properties
    };

    // loop through all elements that will use the plugin
    Array.from(document.querySelectorAll(this._props.on)).forEach((target) => {
      target.addEventListener('mouseenter', (e) => {
        this._engage(e.target);

        this._props.current = {
          event: e,
          promise: new Promise(resolve => this._worker = setTimeout(resolve, this._props.timeout)).then(() => {
            this._dispatch(target);
          }).catch(() => {
            this._reset();
          })
        };
      });

      target.addEventListener('mouseleave', (e) => {
        this._cancel(e.target);
      });

      target.addEventListener('click', (e) => {
        if (e.isTrusted && this._props.preventClick) {
          e.preventDefault();
          e.stopPropagation();

          return;
        }

        this._reset();
      });
    });
  }

  /**
    Engage the link
    @param {HTMLElement} target - element on which the mouseover event is engaged
  */
  _engage(target) {
    target.dispatchEvent(new CustomEvent('engage'));
    target.setAttribute('data-zeroclick', 'engage');
  }

  /**
    Dispatch the click event
    @param {HTMLElement} target - element on which the click event is dispatched
  */
  _dispatch(target) {
    target.dispatchEvent(new CustomEvent('dispatch'));
    target.setAttribute('data-zeroclick', 'dispatch');

    target.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    }));
  }

  /**
    Cancel the click event
    @param {HTMLElement} target - element on which the click event is canceled
  */
  _cancel(target) {
    if (typeof this._worker !== 'undefined') {
      target.dispatchEvent(new CustomEvent('cancel'));
      target.setAttribute('data-zeroclick', 'cancel');
    }

    this._reset();
  }

  /**
    Reset the timeout worker
  */
  _reset() {
    if (typeof this._worker !== 'undefined') {
      clearTimeout(this._worker);
      delete this._worker;
    }
  }

  /**
    Get the live properties
    @return {Object} defined and live properties
  */
  get props() {
    return this._props;
  }

  /**
    Get the timeout
    @return {Number} [0..*] delay before dispatching the click event
  */
  get timeout() {
    return this._props.timeout;
  }

  /**
    Set the timeout
    @param {Number} timeout - [0..*] delay before dispatching the click event
  */
  set timeout(timeout) {
    if (typeof timeout !== 'number' || timeout < 0) {
      throw new Error('Invalid timeout, you need to give a number above 0');
    }

    this._props.timeout = timeout;
  }
}
