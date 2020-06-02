import zeroclick from '../src/zeroclick';

it('has defaults', () => {
  zeroclick.init();

  expect(zeroclick.props).toBeDefined();
  expect(zeroclick.props.on).toBe('a');
  expect(zeroclick.props.preventClick).toBeTruthy();
  expect(zeroclick.props.onEngage).toBeInstanceOf(Function);
  expect(zeroclick.props.onDispatch).toBeInstanceOf(Function);
  expect(zeroclick.props.onCancel).toBeInstanceOf(Function);
});

it('could have custom props that override defaults', () => {
  zeroclick.init({
    timeout: 700
  });

  expect(zeroclick.props.timeout).toBe(700);
});

it('should have _nodelist properly populated', () => {
  let link1 = document.createElement('a');
  document.body.appendChild(link1);
  let link2 = document.createElement('a');
  document.body.appendChild(link2);

  zeroclick.init();

  expect(zeroclick._nodelist.length).toBe(2);
});
