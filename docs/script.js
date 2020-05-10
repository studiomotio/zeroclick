'use strict';

let script = document.createElement('script');

script.onload = () => {
  new ZeroClick();
};

// load the appropriate library (based on environment)
script.src = window.location.port === '9000' ? 'zeroclick.js' : 'https://unpkg.com/zeroclick';
document.querySelector('body').appendChild(script);
