# zeroclick – [![npm (scoped)](https://img.shields.io/npm/v/@studiomotio/zeroclick.svg)](https://www.npmjs.com/package/@studiomotio/zeroclick)
A **web concept** for a zero click user experience.

[![zeroclick](logo.png "Discover the experiment")](https://studiomotio.github.io/zeroclick)

## Intro
This plugin is a **web concept for a zero click user experience**, meaning that the user doesn't need to click any links to properly navigate between your website's pages.

Even if this package may seems funny at first, it has many advantages:
- discover the no click navigation: just hover the link and go!
- improve accessibility for users that could have difficulties to click
- works with `Promise` transitions
- works great with [@barbajs](http://barba.js.org/)
- compatible with touch screens
- perfect for a cool portfolio!

> The package is currently published in beta version.

## How it works
The package avoid users from clicking on links by creating a fake user `click` event through `MouseEvent` API. The default event is prevented and called lately, when the `timeout` time has elapsed or your custom `Promise` resolved.

## Get started
### Install
ZeroClick is published on the **NPM** *(Node Package Manager)* registry, so you can install it through the command line interpreter using your favorite package manager:

```console
# npm
npm install @studiomotio/zeroclick

# yarn
yarn add @studiomotio/zeroclick
```

### Params
--

### Events
#### Custom events


#### Data attributes
In addition to events, the plugin provide a bunch of `data-attributes`, to easily add custom styles/scripts in your application.

- `data-zeroclick="engage"`  
  you place the mouse cursor hover the link

- `data-zeroclick="dispatch"`  
  the `click` event is dispatched on the link

- `data-zeroclick="cancel"`  
you remove the mouse cursor from the link before the event is dispatched

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
