export function init() {
  const event = {
    mouse: {
      enter: new MouseEvent('mouseenter'),
      leave: new MouseEvent('mouseleave'),
      click: new MouseEvent('click')
    },
    keyboard: {
      enter: new KeyboardEvent('keydown', {
        code: 'Enter',
        key: 'Enter'
      })
    }
  };

  const link = document.createElement('a');
  link.href = '/';

  document.body.appendChild(link);

  return { link, event };
}

export function clear() {
  document.body.innerHTML = '';
}
