import { dom } from '../__mocks__';
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

test('has defaults', () => {
  zeroclick.init();

  expect(zeroclick.props).toStrictEqual(defaults);
  expect(zeroclick.props.await).toBeUndefined();
  expect(zeroclick._navigating).toBeFalsy();
  expect(zeroclick._worker).toBeUndefined();
});

test('should have nodelist properly populated', () => {
  dom.clear();

  let link1 = document.createElement('a');
  document.body.appendChild(link1);
  let link2 = document.createElement('a');
  document.body.appendChild(link2);

  zeroclick.init();

  expect(zeroclick._nodelist.length).toBe(2);
});

describe('handle properties', () => {
  test('could have custom props that override defaults', () => {
    zeroclick.init({
      timeout: 700,
    });

    expect(zeroclick.props.timeout).toBe(700);
  });

  test('could have props.on set with a custom query selector', () => {
    zeroclick.init({
      on: document.querySelectorAll('a'),
    });

    expect(zeroclick._nodelist.length).toBe(1);
  });

  test('should use previous props on refresh', () => {
    zeroclick.init({
      timeout: 700,
    });

    zeroclick.refresh();

    expect(zeroclick.props.timeout).toBe(700);
  });
});

describe('handle event listeners', () => {
  test('should listen to mouseenter', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_engage');
    html.link.dispatchEvent(html.event.mouse.enter);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('engage');

    spy.mockRestore();
  });

  test('should listen to mouseleave', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_cancel');
    html.link.dispatchEvent(html.event.mouse.leave);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('cancel');

    spy.mockRestore();
  });

  test('should listen to click', () => {
    zeroclick.init({
      preventClick: false,
    });

    spy = jest.spyOn(zeroclick, '_click');
    html.link.dispatchEvent(html.event.mouse.click);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(html.link.getAttribute('data-zeroclick')).toBe('cancel');

    spy.mockRestore();
  });

  test('should listen to `Enter` key', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_keydown');
    html.link.dispatchEvent(html.event.keyboard.enter);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(zeroclick._navigating).toBeTruthy();

    spy.mockRestore();
  });

  test('should remove event listeners on destroy', () => {
    zeroclick.init();
    zeroclick.destroy();

    spy = jest.spyOn(zeroclick, '_engage');
    html.link.dispatchEvent(html.event.mouse.enter);

    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });

  test('should do nothing on click when preventClick is enable', () => {
    zeroclick.init({
      preventClick: true,
    });

    spy = jest.spyOn(zeroclick, '_click');
    html.link.dispatchEvent(html.event.mouse.click);

    expect(spy).toHaveReturned();
    spy.mockRestore();
  });

  test('should return on engage when navigating', () => {
    zeroclick.init({
      preventClick: false,
    });

    html.link.dispatchEvent(html.event.mouse.click);
    spy = jest.spyOn(zeroclick, '_engage');
    html.link.dispatchEvent(html.event.mouse.enter);

    expect(spy).toHaveReturned();
    spy.mockRestore();
  });

  test('should return on cancel when navigating', () => {
    zeroclick.init({
      preventClick: false,
    });

    spy = jest.spyOn(zeroclick, '_cancel');
    html.link.dispatchEvent(html.event.mouse.click);

    expect(spy).toHaveReturned();
    spy.mockRestore();
  });

  test('should return when worker is undefined', () => {
    zeroclick.init({
      preventClick: false,
    });

    zeroclick._worker = undefined;

    spy = jest.spyOn(zeroclick, '_cancel');
    html.link.dispatchEvent(html.event.mouse.click);

    expect(spy).toHaveReturned();
    spy.mockRestore();
  });
});

describe('handle promises', () => {
  test('should dispatch navigation when using a timeout promise', () => {
    zeroclick.init();

    spy = jest.spyOn(zeroclick, '_dispatch');
    html.link.dispatchEvent(html.event.mouse.enter);

    return zeroclick.props.current.promise.then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(zeroclick._navigating).toBeTruthy();
      expect(html.link.getAttribute('data-zeroclick')).toBe('dispatch');
      spy.mockRestore();
    });
  });

  test('should dispatch navigation when using a custom promise', () => {
    zeroclick.init({
      await(resolve) {
        resolve();
      },
    });

    spy = jest.spyOn(zeroclick, '_dispatch');
    html.link.dispatchEvent(html.event.mouse.enter);

    return zeroclick.props.current.promise.then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(zeroclick._navigating).toBeTruthy();
      expect(html.link.getAttribute('data-zeroclick')).toBe('dispatch');
      spy.mockRestore();
    });
  });

  test('should reset when promise throw an exception', () => {
    zeroclick.init({
      await() {
        throw new Error('exception');
      },
    });

    spy = jest.spyOn(zeroclick, '_reset');
    html.link.dispatchEvent(html.event.mouse.enter);

    return zeroclick.props.current.promise.then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });

  test('should reject promise on cancel', () => {
    zeroclick.init({
      await(resolve, reject) {
        reject();
      },
    });

    html.link.dispatchEvent(html.event.mouse.enter);
    spy = jest.spyOn(zeroclick, '_worker');
    html.link.dispatchEvent(html.event.mouse.leave);

    return zeroclick.props.current.promise.then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
