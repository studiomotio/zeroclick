'use strict';

let script = document.createElement('script');

script.onload = () => {
  zeroclick.init();

  barba.hooks.enter(() => {
    zeroclick.init();
  });

  barba.use(barbaCss);

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'fade',
      once() {},
      leave() {}
    }]
  });
};

// load the appropriate library (based on environment)
script.src = window.location.port === '9000' ? 'zeroclick.js' : 'https://unpkg.com/zeroclick';
document.querySelector('body').appendChild(script);
