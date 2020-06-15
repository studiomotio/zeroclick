'use strict';

let script = document.createElement('script');

script.onload = () => {
  barba.hooks.once(() => {
    zeroclick.init({
      on: 'a:not(.github-button)'
    });
  });

  barba.hooks.enter(() => {
    zeroclick.refresh();
  });

  barba.use(barbaCss);

  barba.init({
    preventRunning: true
  });
};

// load the appropriate library (based on environment)
script.src = window.location.port === '9000' ? 'zeroclick.js' : 'https://unpkg.com/@studiomotio/zeroclick';
document.querySelector('body').appendChild(script);
