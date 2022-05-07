# Auto TOC
| Create a table of contents for a HTML, ESModule

### Demo

### Usage
#### Script HTML
1. Include one of the link in to HTML
```js
<script src="https://dunggramer.github.io/auto-toc/dist/toc.js" defer></script>
```
```js
<script src="https://gitcdn.xyz/repo/DungGramer/auto-toc/master/dist/toc.js" defer></script>
```
```js
<script src="https://cdn.staticaly.com/gh/DungGramer/auto-toc/498e/dist/toc.js" defer></script>
```
2. Call the function
```html
 <script>
    toc({
      contentWrapperSelector: "main",
      tocSelector: "#toc",
      showsHighLight: true,
      showsParentHighlight: true,
    });
  </script>
```

#### ESModule
You may not use `tocSelector` if the content is not already displayed.
```js
import toc from './dist/toc.module.js';

const tableOfContent = toc({
    contentWrapperSelector: "main",
    headingLevelFrom: 2,
    viewablePercentToHighlight: 70,
    showsHighLight: true,
    showsParentHighlight: true,
});

const tocSelector = document.querySelector("#toc");
tocSelector.appendChild(tableOfContent);
```


### API

| Parameter                    | Type      | Default     | Description                                                                      |
| ---------------------------- | --------- | ----------- | -------------------------------------------------------------------------------- |
| `contentWrapperSelector`     | `string`  | `'body'`    | The selector for the content wrapper                                             |
| `tocSelector`                | `string`  | `undefined` | The selector for the TOC                                                         |
| `headingLevelFrom`           | `number`  | `2`         | The heading level to start from                                                  |
| `headingLevelTo`             | `number`  | `6`         | The heading level to stop at                                                     |
| `showsHighLight`             | `boolean` | `false`     | Whether to show the highlight                                                    |
| `showsParentHighlight`       | `boolean` | `false`     | Whether to keep the parent highlight, only works when `showsHighLight` is `true` |
| `viewablePercentToHighlight` | `number`  | `70`        | The viewable percent to highlight                                                |
