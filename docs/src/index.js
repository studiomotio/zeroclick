'use strict';

import zeroclick from 'source/zeroclick.js';
import barba from '@barba/core';
import barbaCss from '@barba/css';

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
