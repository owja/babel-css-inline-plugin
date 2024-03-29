# Babel CSS Inline Plugin

# DEPRECATED!

If possible use your bundler to inline CSS. This plugin was written before Microbundle implemented that feature. Webpack and Microbundle both support inlining CSS now.

* [Microbundle](https://github.com/developit/microbundle) with flag `--css inline`
* [Webpack](https://v4.webpack.js.org/loaders/raw-loader) with `raw-loader`

---

[![codecov](https://codecov.io/gh/owja/babel-css-inline-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/owja/babel-css-inline-plugin)
[![Build Status](https://travis-ci.org/owja/babel-css-inline-plugin.svg?branch=master)](https://travis-ci.org/owja/babel-css-inline-plugin)
[![npm version](https://badge.fury.io/js/%40owja%2Fbabel-css-inline-plugin.svg)](https://badge.fury.io/js/%40owja%2Fbabel-css-inline-plugin)

This plugin parses css with PostCSS and inline it into JavaScript. 

## Example

##### CSS File
```css
div {
    color: #333;
    display: flex;
}
```

##### JS File
```js
import styles from "./styles.css";
```

##### JavaScript Output
```js
const styles = "div{color:#333;display:flex;display:-webkit-flex}";
```

## Why?

This plugin is created to inline CSS into WebComponents with a ShadowRoot. 

```typescript
import styles from "./my-component.css";

class MyComponent extends HTMLElement {
    protected readonly _root: ShadowRoot;

    constructor() {
        super();
        this._root = this.attachShadow({mode: "closed"});
    }

    connectedCallback() {
        const style = document.createElement("style");
        style.textContent = styles;
        this._root.appendChild(style);
    }
} 
```

Currently `autoprefixer` and `cssnano` are enabled. To configure the browsers to support simply add
a `browserlist` property to the `package.  

## Usage

Install the plugin:

```shell script
npm install --save-dev @owja/babel-css-inline-plugin
```

Add the plugin to the Babel configuration:

*babel.config.js*
```javascript
module.exports = {
    plugins: ['module:@owja/babel-css-inline-plugin'],
};
```

With TypeScript you have to add a definition file:

*src/types/css.d.ts*
```typescript
declare module "*.css" {
    const content: string;
    export default content;
}
```

Now you can import CSS files:

```typescript
import styles from "./my-styles.css";
```

which compiles to

```javascript
const styles = "<css styles>";
```

## Notice

The plugin uses PostCSS CLI which is slow. The reason is that Babel does not support
async plugins yet. This might change in the future. A other workaround could be to
implement a server/client to sync PostCSS.

This plugin is marked as alpha but it should stay backwards compatible.

It is possible that we will add some features in the future:

* CSS Modules
* Configurable file extension, to make it possible to only inline specific files

## Development

Clone this repository and run `npm install`.

#### Tests
```bash 
npm test
```

#### Build
```bash 
npm run build
```

## License

**MIT**

Copyright © 2020 Hauke Broer

