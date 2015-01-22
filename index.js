var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
 * Calculates the median value of a field for a set of {@link Point} features within a set of {@link Polygon} features.
 *
 * @module turf/median
 * @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} points a FeatureCollection of {@link Point} features
 * @param {string} inField the field in input data to analyze
 * @param {string} outField the field in which to store results
 * @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
 * with properties listed as `outField` values
 * @example
 * var polygons = turf.featurecollection([
 *   turf.polygon([[
 *    [18.400039, -33.970697],
 *    [18.400039, -33.818518],
 *    [18.665771, -33.818518],
 *    [18.665771, -33.970697],
 *    [18.400039, -33.970697]
 *   ]]),
 *   turf.polygon([[
 *    [18.538742, -34.050383],
 *    [18.538742, -33.98721],
 *    [18.703536, -33.98721],
 *    [18.703536, -34.050383],
 *    [18.538742, -34.050383]
 *   ]])
 * ]);
 * var points = turf.featurecollection([
 *   turf.point([18.514022, -33.860152], {population: 200}),
 *   turf.point([18.48999, -33.926269], {population: 600}),
 *   turf.point([18.583374, -33.905755], {population: 100}),
 *   turf.point([18.591613, -34.024778], {population: 200}),
 *   turf.point([18.653411, -34.017949], {population: 300})
 * ]);
 * var medians = turf.median(
 *  polygons, points, 'population', 'median');
 *
 * var result = turf.featurecollection(
 *  medians.features.concat(points.features));
 *
 * //=result
 */
module.exports = function(polyFC, ptFC, inField, outField){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    });
    poly.properties[outField] = median(values);
  });

  return polyFC;
}

function median(x) {
    // The median of an empty list is null
    if (x.length === 0) return null;

    // Sorting the array makes it easy to find the center, but
    // use `.slice()` to ensure the original array `x` is not modified
    var sorted = x.slice().sort(function (a, b) { return a - b; });

    // If the length of the list is odd, it's the central number
    if (sorted.length % 2 === 1) {
        return sorted[(sorted.length - 1) / 2];
    // Otherwise, the median is the average of the two numbers
    // at the center of the list
    } else {
        var a = sorted[(sorted.length / 2) - 1];
        var b = sorted[(sorted.length / 2)];
        return (a + b) / 2;
    }
}
