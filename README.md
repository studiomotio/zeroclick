# zeroclick – [![npm (scoped)](https://img.shields.io/npm/v/@studiomotio/zeroclick.svg)](https://www.npmjs.com/package/@studiomotio/zeroclick)
A **web concept** for a zero click user experience.

[![zeroclick](logo.svg "Discover the experiment")](https://studiomotio.github.io/zeroclick)

## Intro
This plugin is a **web concept for a zero click user experience**, meaning that the user doesn't need to click any links to properly navigate between your website's pages.

Even if this package may seems funny at first, it has **many advantages**:
- discover the no click navigation: just hover the link and go!
- improve accessibility for users that could have difficulties to click
- use `Promise` transitions: do something before leaving the page
- works great with [@barbajs](http://barba.js.org/)
- compatible with touch screens
- perfect for a cool portfolio!

## How it works
The package avoid users from clicking on links by creating a fake user `click` event through `MouseEvent` API. The default event is prevented and called lately, when the `timeout` time has elapsed or your custom `Promise` resolved.

## Get started
### Install
The plugin is published on the **NPM registry**, so you can install it through the command line interpreter using your favorite package manager:

```console
# npm
npm install @studiomotio/zeroclick

# yarn
yarn add @studiomotio/zeroclick
```
Then import it like any other module inside your build:
```js
import zeroclick from '@studiomotio/zeroclick';

zeroclick.init();
```

### Params
--

### Events
#### Link states
The click process is split into **three states**:

| Name       | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| `engage`   | you place the **mouse cursor hover the link**                                |
| `dispatch` | the event is **dispatched on the link**                                      |
| `cancel`   | you **remove the mouse cursor from the link** before the event is dispatched |

#### Custom events
You can add an **event listener on a specific link** using:

```js
document.querySelector('.my-link').addEventListener('dispatch', (e) => {
  // do something when the click event is dispatched on .my-link
});
```

#### Callbacks
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

## Disclaimer
As the plugin create an **"untrusted" `MouseEvent`** in order to simulate a user "click", some browsers may interpret `target="_blank"` links as **intrusive pop-up**. Be sure to ignore/ban those kind of links from your site.

## License
The project is developed under the **MIT** license:

- **Permissions**: This software and derivatives may be used for commercial purposes, you may distribute this software, this software may be modified and you may use and modify the software without distributing it.
- **Conditions**: Include a copy of the license and copyright notice with the code.
- **Limitations**: Software is provided without warranty and the software author/license owner cannot be held liable for damages.

Read the [full license](LICENSE.md) for more information about your rights.

## Questions?
If you have any questions, please **feel free to contact us!**  
[hello [at] studiomotio.com](mailto:hello@studiomotio.com)
