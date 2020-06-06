import * as dom from '../__mocks__/dom';
import defaults from '../src/defaults';
import zeroclick from '../src/zeroclick';

let spy = jest.SpyInstance;
let html;

beforeEach(() => {
  html = dom.init();
});

afterEach(() => {
  dom.clear();
});

it('has defaults', () => {
  zeroclick.init();

  expect(zeroclick.props).toStrictEqual(defaults);
  expect(zeroclick.props.await).toBeUndefined();
  expect(zeroclick._navigating).toBeFalsy();
  expect(zeroclick._worker).toBeUndefined();
});

it('could have custom props that override defaults', () => {
  zeroclick.init({
    timeout: 700
  });

  expect(zeroclick.props.timeout).toBe(700);
});

it('could have props.on set with a custom query selector', () => {
  zeroclick.init({
    on: document.querySelectorAll('a')
  });

  expect(zeroclick._nodelist.length).toBe(1);
});

it('should have _nodelist properly populated', () => {
  dom.clear();

  let link1 = document.createElement('a');
  document.body.appendChild(link1);
  let link2 = document.createElement('a');
  document.body.appendChild(link2);

  zeroclick.init();

  expect(zeroclick._nodelist.length).toBe(2);
});

describe('handle _nodelist event listeners', () => {
  it('should listen to mouseenter', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_engage');
    html.link.dispatchEvent(html.mouseenterEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('engage');

    spy.mockRestore();
  });

  it('should listen to mouseleave', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_cancel');
    html.link.dispatchEvent(html.mouseleaveEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('cancel');

    spy.mockRestore();
  });

  it('should listen to click', () => {
    zeroclick.init({
      preventClick: false
    });

    spy = jest.spyOn(zeroclick, '_click');
    html.link.dispatchEvent(html.clickEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('cancel');

    spy.mockRestore();
  });
});

it('should remove event listeners on destroy', () => {
  zeroclick.init();
  zeroclick.destroy();

  spy = jest.spyOn(zeroclick, '_engage');
  html.link.dispatchEvent(html.mouseenterEvent);

  expect(spy).toHaveBeenCalledTimes(0);
  spy.mockRestore();
});

it('should use previous props on refresh', () => {
  zeroclick.init({
    timeout: 700
  });

  zeroclick.refresh();

  expect(zeroclick.props.timeout).toBe(700);
});

it('should dispatch navigation when using a timeout promise', () => {
  zeroclick.init();

  spy = jest.spyOn(zeroclick, '_dispatch');
  html.link.dispatchEvent(html.mouseenterEvent);

  return zeroclick.props.current.promise.then(() => {
    expect(spy).toHaveBeenCalledTimes(1);
    expect(zeroclick._navigating).toBeTruthy();
    spy.mockRestore();
  });
});
