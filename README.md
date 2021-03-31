# &lt;vaadin-radio-button&gt;

> ⚠️ 　Starting from Vaadin 20, this project has migrated to [`vaadin-web-components`](https://github.com/vaadin/vaadin-web-components/tree/master/packages/vaadin-radio-button) *monorepository*.
>
> This repository is used for Vaadin 14 LTS and Vaadin 19.

---

[Live Demo ↗](https://vaadin.com/components/vaadin-radio-button/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-radio-button/html-api)

[&lt;vaadin-radio-button&gt;](https://vaadin.com/components/vaadin-radio-button) is a Web Component providing an accessible and customizable radio button, part of the [Vaadin components](https://vaadin.com/components).

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-radio-button)](https://www.npmjs.com/package/@vaadin/vaadin-radio-button)
[![Build Status](https://travis-ci.org/vaadin/vaadin-radio-button.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-radio-button)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-radio-button)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-radio-button)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/vaadinvaadin-radio-button.svg)](https://vaadin.com/directory/component/vaadinvaadin-radio-button)
[![Discord](https://img.shields.io/discord/732335336448852018?label=discord)](https://discord.gg/PHmkCKC)

```html
<vaadin-radio-group name="radio-group" value="bar">
  <vaadin-radio-button value="foo">Foo</vaadin-radio-button>
  <vaadin-radio-button value="bar">Bar</vaadin-radio-button>
  <vaadin-radio-button value="baz">Baz</vaadin-radio-button>
</vaadin-radio-group>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-radio-button/master/screenshot.png" width="237" alt="Screenshot of vaadin-radio-group">](https://vaadin.com/components/vaadin-radio-button)

## Installation

Install `vaadin-radio-button`:

```sh
npm i @vaadin/vaadin-radio-button --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-radio-button/vaadin-radio-button.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The components with the Lumo theme:

  `theme/lumo/vaadin-radio-button.js`
  `theme/lumo/vaadin-radio-group.js`

- The components with the Material theme:

  `theme/material/vaadin-radio-button.js`
  `theme/material/vaadin-radio-group.js`

- Alias for `theme/lumo/vaadin-radio-button.js`
  `theme/lumo/vaadin-radio-group.js`:

  `vaadin-radio-button.js`
  `vaadin-radio-group.js`


## Running API docs and tests in a browser

1. Fork the `vaadin-radio-button` repository and clone it locally.

1. Make sure you have [node.js](https://nodejs.org/) 12.x installed.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-radio-button` directory, run `npm install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

1. You can also open visual tests, for example:

  - http://127.0.0.1:3000/test/visual/default.html


## Running tests from the command line

1. When in the `vaadin-radio-button` directory, run `npm test`

## Debugging tests in the browser

1. Run `npm run debug`, then choose manual mode (M) and open the link in browser.

## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
