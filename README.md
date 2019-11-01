# Babel CSS Inline Plugin

**Work in Progress!** This plugin does not work as intended yet. 

This plugin should process css with PostCSS and inline it into the JavaScript file.

##### CSS File
```css
div {
    color: green;
    display: flex;
}
```

##### JS File
```js
import styles from "./styles.css";
```

##### Example JavaScript Output
```js
const styles = "div{color:green;display:flex;display:-webkit-flex}";
```


#### Running Tests
```bash 
npm test
```

#### Running Build
```bash 
npm run build
```
