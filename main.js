import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import {Style, Fill, Stroke} from 'ol/style';
import VectorSource from "ol/source/Vector";
import Tile from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import WebGLPointsLayer from "ol/layer/WebGLPoints";

// An array to contain all of the features from the dataset after processing
const featuresArr = [];

// Set of colors to be applied to each feature based on the feature's magnitude
const arrowColorScaleArr = ["red", "blue", "green"];

// Fetch data, convert to JSON, then processData()
const getData = await fetch("data/weather.json")
  .then(function (resData) {
    return resData.json();
  })
  .then(function (resDataJSON) {
    processData(resDataJSON);
  });

// Initialize the map
const map = new Map({
  layers: [new Tile({source: new OSM()}),
    new WebGLPointsLayer({
      source: new VectorSource({ features: featuresArr,}),

      // THIS STATIC STYLE OBJECT WORKS AS EXPECTED
      style: {
        symbol: {
          symbolType: "triangle",
          size: 8,
          color: "blue",
          rotateWithView: true,
        }
      }

      // A STYLE FUNCTION FAILS TO RENDER
      // Result: Uncaught TypeError: Cannot read properties of undefined (reading 'size')
      // style (feature, resolution) {
      //   return { 
      //     symbol: {
      //       symbolType: "triangle",
      //       size: 8,
      //       color: "blue",
      //     }
      //   }
      // }
    }),
  ],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function processData(data) {
  const weatherData = data.list;
  // Process data
  for (let i = 0; i < weatherData.length; ++i) {
    // Extract coordinates & wind values
    const { coord } = weatherData[i];

    // Convert from lon/lat to floats using the provided OL method
    const coordinates = fromLonLat([coord.lon, coord.lat]);

    // Push feature & style to the array
    featuresArr[i] = new Feature(new Point(coordinates));
    // featuresArr[i].setStyle(arrow);
  }
}