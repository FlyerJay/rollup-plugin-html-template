### Install
```bash
    npm i rollup-plugin-html-template
```

### Demo
```js
    import html from 'rollup-plugin-html-template'
    export default {
        input: '',
        output: {
            ...
        },
        plugin: [
            html({
                template: 'index.html' // ignore will generate a default index.html
            })
        ]
    }
```