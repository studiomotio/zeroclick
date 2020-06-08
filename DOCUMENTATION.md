# Documentation
Here you will find the documentation describing how to use `zeroclick`.

## Summary
1. [How it works](#how-it-works)
2. [Install](#install)
3. [Properties](#properties)
4. [Methods](#methods)
5. [Events](#events)

## How it works
The package avoid users from clicking on links by creating a fake user `click` event through `MouseEvent` API. The default event is prevented and called lately, when the `timeout` time has elapsed or your custom `Promise` resolved.

## Install
Want to try zeroclick? Let’s install it!

### Use with a bundler

Zeroclick is published on the **NPM registry**, so you can install it through the command line interpreter using your favorite package manager. This is the best way to install the library if you are comfortable with **javascript bundlers** like `webpack` or `rollup`.

```sh
# npm
npm install @studiomotio/zeroclick

# yarn
yarn add @studiomotio/zeroclick
```

Then **import it like any other module** inside your build:

```js
import zeroclick from '@studiomotio/zeroclick';

zeroclick.init({
  // ...
});
```

> Using a bundler has **many advantages** like output compression, code splitting, tree shaking, etc., so we encourage you to use this kind of tool with zeroclick.

### Use with a CDN

To rapidly **include the minified production file** in your webpage, load the latest build from your favorite CDN using a generic script markup:

```html
<!-- unpkg -->
<script src="https://unpkg.com/@studiomotio/zeroclick"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@studiomotio/zeroclick"></script>
```

Then init zeroclick:

```html
<script>
  zeroclick.init({
    // ...
  })
</script>
```

> By default, if no one is specified, the CDN will automatically target the **@latest** version of zeroclick and load the **UMD build** from `dist/zeroclick.umd.js`.

### Other setup

Zeroclick is build upon `microbundle` and is provided with an **ESM** and **Modern** version include in the package `dist` folder.

## Properties
API reference that describe plugin properties.

### on
Type: `String` | `NodeList`
Default: `a`

Define **on which elements** the plugin is applied. If you provide a `String`, it will automatically use `querySelectorAll` to create a `NodeList`.

```js
zeroclick.init({
  on: document.querySelector('a.zeroclick')
});
```

### timeout
Type: `Number`
Default: `600`

The **time before the `click` event is dispatched** on the hovered link. When using a custom `Promise` through [`await`](#await), this property will be ignored.

```js
zeroclick.init({
  timeout: 700
});
```

### await
Type: `Promise`
Default: `undefined`

Define a **custom `Promise` that need to be resolved** in order to dispatch the link `click` event, or cancel it if the `Promise` is rejected. This allow you to do some cool stuff before going to the next page: like playing an animation, fetch some content, etc..

```js
zeroclick.init({
  await: (resolve, reject) => {
    new customAnimation({
      onComplete: () => {
        resolve();
      },
      onFailure: () => {
        reject();
      }
    });
  }
});
```

## Methods
...

#### init (options)
Type: `Function`

...

```js
zeroclick.init({
  // options here
});
```

#### destroy ()
Type: `Function`

...

```js
zeroclick.destroy();
```

#### refresh ()
Type: `Function`

...

```js
zeroclick.refresh();
```

## Events
The "click process" is split into **three states**:

| Name       | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| `engage`   | you place the **mouse cursor hover the link**                                |
| `dispatch` | the event is **dispatched on the link** (user `MouseEvent` click simulation) |
| `cancel`   | you **remove the mouse cursor from the link** before the event is dispatched |

All of this states are declined into [custom events](#custom-events), [callbacks](#callbacks) and [data attributes](#data-attributes).

### Custom events
You can add an **event listener on a specific link** using:

```js
document.querySelector('.my-link').addEventListener('dispatch', (e) => {
  // do something when the click event is dispatched on .my-link
});
```

### Callbacks
You can **call specific code globally** using callbacks:

```js
zeroclick.init({
  onDispatch: () => {
    // do something when a link click event is dispatched
  }
});
```

#### Data attributes
In addition, the plugin provide a bunch of `data-attributes`, to easily add custom styles/scripts in your application.

- `data-zeroclick="engage"`  
- `data-zeroclick="dispatch"`  
- `data-zeroclick="cancel"`  
