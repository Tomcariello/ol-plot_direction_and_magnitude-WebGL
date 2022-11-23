import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import Tile from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import WebGLPointsLayer from "ol/layer/WebGLPoints";

// An array to contain all of the features from the dataset after processing
const featuresArr = [];

// Fetch data, convert to JSON, then processData()
fetch("data/weather.json")
  .then(function (resData) {
    return resData.json();
  })
  .then(function (resDataJSON) {
    processData(resDataJSON);

    // Initialize the map
    const map = new Map({
      layers: [
        new Tile({ source: new OSM() }),
        new WebGLPointsLayer({
          source: new VectorSource({ features: featuresArr }),

          style: {
            symbol: {
              symbolType: "triangle",
              size: [
                "array",
                ["*", ["get", "speed"], 0.3], // speed * 0.4 --> width (triangle base)
                ["*", ["get", "speed"], 0.8], // speed * 0.8 --> height (triangle peak)
              ],
              color: [
                "case",
                [">", ["get", "speed"], 40], // if speed over 40 --> red
                "red",
                [">", ["get", "speed"], 20], // if speed over 20 --> blue
                "blue",
                "green", // if speed <= 20 --> green
              ],
              rotation: ["*", ["get", "deg"], Math.PI / 180],
              rotateWithView: true,
            },
          },
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 4,
      }),
    });
  });
function processData(data) {
  const weatherData = data.list;
  // Process data
  for (let i = 0; i < weatherData.length; ++i) {
    // Extract coordinates & wind values
    const { coord, wind } = weatherData[i];

    // Convert from lon/lat to floats using the provided OL method
    const coordinates = fromLonLat([coord.lon, coord.lat]);

    // Create this feature & add wind properties
    const feature = new Feature(new Point(coordinates));
    feature.setProperties(wind);

    // Push feature to the array
    featuresArr[i] = feature;
  }
}
