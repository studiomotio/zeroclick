export function init() {
  const mouseenterEvent = new MouseEvent('mouseenter');
  const mouseleaveEvent = new MouseEvent('mouseleave');
  const clickEvent = new MouseEvent('click');

  const link = document.createElement('a');
  link.href = '/';

  document.body.appendChild(link);

  return { link, mouseenterEvent, mouseleaveEvent, clickEvent };
}

export function clear() {
  document.body.innerHTML = '';
}
