# Babel CSS Inline Plugin

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

## Why? How to use?

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

