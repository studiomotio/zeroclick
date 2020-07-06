export function init() {
  const mouseenterEvent = new MouseEvent('mouseenter');
  const mouseleaveEvent = new MouseEvent('mouseleave');
  const clickEvent = new MouseEvent('click');
  const keydownEnterEvent = new KeyboardEvent('keydown', {
    code: 'Enter',
    key: 'Enter'
  });

  const link = document.createElement('a');
  link.href = '/';

  document.body.appendChild(link);

  return { link, mouseenterEvent, mouseleaveEvent, clickEvent, keydownEnterEvent };
}

export function clear() {
  document.body.innerHTML = '';
}
