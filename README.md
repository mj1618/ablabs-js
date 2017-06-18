# ABLabs JS
[![npm version](https://img.shields.io/npm/v/ablabs-js.svg?style=flat-square)](https://www.npmjs.com/package/ablabs-js)
[![Build Status](https://travis-ci.org/mj1618/ablabs-js.svg?branch=master)](https://travis-ci.org/mj1618/ablabs-js)

## Demo Usage
Browser: https://rawgit.com/mj1618/ablabs-js/master/demo.html  
Node: https://runkit.com/embed/wqdw4dni7wgz

The Node and browser API is the same, though they require different libraries.

## Browser Usage

First include the ABLabsJS browser library in the browser head:
```
<script src="https://cdn.rawgit.com/mj1618/ablabs-js/v1.0.7/build/ablabs.min.js"></script>
```

You can use it directly in JS:
```
var ab = new ABLabs.default( '{your_key}' );
```

## Node Usage

If you would like to run ABLabs inside a node server project follow these steps.

1. Install

```
npm install --save ablabs-js
```

2. Import
```
import ABLabs from 'ablabs-js'
```

3. Use
```
const ab = new ABLabs('{your_key}');
let variation;
ab.assign( 'Blue/Green Button Experiment' ).then(res=>{
    variation = res.variation;
});
...
ab.track( 'Clicked Button' );
```


## Node testing for browser project

You may want to write some code for the browser, but test it in node.

To achieve this:
1. Install in node (see above)
2. Write your browser code as normal
3. At the start of your testing code, declare ABLabs as global:
```
global.ABLabs = require('ablabs-js');
```
