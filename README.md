```
npm install
npm run build
npm run serve // let it run while you are doing further rebuilds
... make any changes then rerun: `npm run build` to update the distribution

.babelrc:
{
  "presets": ["react", "es2015", "stage-0"],
  "plugins": [
    ["transform-es2015-classes", {
      "loose": true
    }]
  ]
}
```