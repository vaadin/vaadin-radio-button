# &lt;vaadin-radio-button&gt;

[&lt;vaadin-radio-button&gt;](https://vaadin.com/components/vaadin-radio-button) is a Web Component providing an accessible and customizable radio button, part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-radio-button/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-radio-button/html-api)

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-radio-button)](https://www.npmjs.com/package/@vaadin/vaadin-radio-button)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-radio-button)
[![Build Status](https://travis-ci.org/vaadin/vaadin-radio-button.svg?branch=next)](https://travis-ci.org/vaadin/vaadin-radio-button)
[![Coverage Status](https://coveralls.io/repos/github/vaadin/vaadin-radio-button/badge.svg?branch=next)](https://coveralls.io/github/vaadin/vaadin-radio-button?branch=next)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-radio-button)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/vaadinvaadin-radio-button.svg)](https://vaadin.com/directory/component/vaadinvaadin-radio-button)

> ⚠️ This is a pre-release version built with [`LitElement`](https://github.com/Polymer/lit-element), part of the [next generation of Vaadin web components](https://vaadin.com/blog/next-generation-vaadin-components).
>
> Looking for Vaadin 14 compatible version? Please see the following branches:
> - [1.2 branch](https://github.com/vaadin/vaadin-radio-button/tree/1.2) (latest stable)
> - [1.3 branch](https://github.com/vaadin/vaadin-radio-button/tree/1.3) (next minor version with incremental improvements)

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


## Running demos and API docs in a browser

1. Fork the `vaadin-radio-button` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-radio-button` directory, run `npm install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

## Running tests from the command line

- When in the `vaadin-radio-button` directory, run `npm test`

- To debug tests in the browser, run `npm run test:debug`

## Following the coding style

We are using [ESLint](http://eslint.org/) for linting TypeScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.ts` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
