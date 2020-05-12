'use strict';

import defaults from './defaults.js';

export default class ZeroClick {

  /**
    Class constructor
    @param {Object} properties - custom properties of the class
  */
  constructor(properties) {

    // assign custom user properties to defaults
    this._props = Object.assign({}, defaults, properties);

    // loop through all elements that will use the plugin
    Array.from(document.querySelectorAll(this._props.on)).forEach((target) => {
      target.addEventListener('mouseenter', (e) => {
        this._props.current = {
          event: e,
          promise: new Promise(resolve => this._worker = setTimeout(resolve, this._props.timeout)).then(() => {
            window.location = target.href;
          })
        };
      });

      target.addEventListener('mouseleave', () => {
        if (typeof this._worker !== 'undefined') {
          clearTimeout(this._worker);
        }
      });

      target.addEventListener('click', (e) => {
        if (this._props.preventClick) {
          e.preventDefault();
          e.stopPropagation();

          return;
        }

        clearTimeout(this._worker);
      });
    });
  }
}
