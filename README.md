# TOC Generate
| Create a table of contents for a HTML, ESModule

[![https://nodei.co/npm/toc-generate.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/toc-generate.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/toc-generate)

### Demo
[Demo Link](https://dunggramer.github.io/toc-generate/public/)

### Usage
#### Script HTML
1. Include one of the link in to HTML
```js
<script src="https://dunggramer.github.io/toc-generate/dist/toc-generate.js" defer></script>
```
```js
<script src="https://gitcdn.xyz/cdn/DungGramer/toc-generate/master/dist/toc-generate.js" defer></script>
```
```js
<script src="https://cdn.statically.io/gh/DungGramer/toc-generate/5d26/dist/toc-generate.js" defer></script>
```
2. Call the function
```html
 <script>
    document.addEventListener('DOMContentLoaded', function() {
        const tableOfContent = tocGenerate({
            contentWrapperSelector: "main",
            headingLevelFrom: 2,
            viewablePercentToHighlight: 70,
            showsHighLight: true,
            showsParentHighlight: true,
        });

        const tocSelector = document.querySelector("#toc");
        tocSelector.appendChild(tableOfContent);
    });
</script>
```

#### ESModule
```bash
npm i toc-generate
# or 
yarn add toc-generate
```
You may not use `tocSelector` if the content is not already displayed.
```js
import tocGenerate from 'toc-generate';

const tableOfContent = tocGenerate({
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
