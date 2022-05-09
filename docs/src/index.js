import zeroclick from 'source/zeroclick.js';
import barba from '@barba/core';
import gsap from 'gsap';

let github = document.querySelector('.github-button');
let progress = document.querySelector('.progress');
let circle = document.querySelector('.progress-circle');
let length = circle.getTotalLength();
let timeline = gsap.timeline();

gsap.set(progress, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

zeroclick.init({
  on: 'a:not(.github-button)',
  await(resolve) {
    timeline.clear().to(progress, {
      rotation: 360,
      strokeDashoffset: 0,
      strokeDasharray: length,
      duration: 0.7,
      onComplete: () => {
        resolve();
      },
    }).to(progress, {
      opacity: 1,
      duration: 0.4,
    }, '<');
  },
  onCancel() {
    timeline.clear().to(progress, {
      opacity: 0,
      rotation: 0,
      strokeDashoffset: length,
      duration: 0.4,
    });
  },
  onDispatch() {
    timeline.clear().to(progress, {
      opacity: 0,
      duration: 0.1,
      scale: 0.9,
      onComplete: () => {
        gsap.set(progress, {
          rotation: 0,
          scale: 1,
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      },
    });
  },
});

barba.hooks.enter(({ current }) => {
  current.container.remove();
  zeroclick.refresh();
});

barba.init({
  preventRunning: true,
  transitions: [{
    name: 'default',
    once() {
      gsap.to(github, {
        opacity: 1,
        delay: 0.25,
      });
    },
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
