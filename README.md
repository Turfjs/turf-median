turf-median
===========
[![Build Status](https://travis-ci.org/Turfjs/turf-median.svg?branch=master)](https://travis-ci.org/Turfjs/turf-median)

Calculates the median value of a field for points within a set of polygons.

```js
var median = require('turf-median')
var point = require('turf-point')
var polygon = require('turf-polygon')
var featurecollection = require('turf-featurecollection')

var poly1 = polygon([[[0,0],[10,0],[10,10], [0,10]]])
var poly2 = polygon([[[10,0],[20,10],[20,20], [20,0]]])
var polyFC = featurecollection([poly1, poly2])
var pt1 = point(5,5, {population: 200})
var pt2 = point(1,3, {population: 600})
var pt3 = point(14,2, {population: 100})
var pt4 = point(13,1, {population: 200})
var pt5 = point(19,7, {population: 300})
var ptFC = featurecollection([pt1, pt2, pt3, pt4, pt5])

var medianed = median(polyFC, ptFC, 'population', 'pop_median')

console.log(medianed.features[0].properties.pop_median) // 400
console.log(medianed.features[1].properties.pop_median) // 200
```
