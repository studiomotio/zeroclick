import zeroclick from 'source/zeroclick.js';
import barba from '@barba/core';
import gsap from 'gsap';

// display the Github button
gsap.to(document.querySelector('.github-button'), {
  opacity: 1,
  delay: 0.8,
});

zeroclick.init({
  on: 'a:not(.github-button)',
});

barba.hooks.enter(() => {
  zeroclick.refresh();
});

barba.init({
  preventRunning: true,
  transitions: [{
    name: 'default',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.25,
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.25,
      });
    },
  }],
});
