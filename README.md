Open Layers Plot Direction and Magnitude with WebGL

This repo is for me to explore openlayers by representing direction & magnitude in a meaningful way on a map using WebGL.

I am rendering **WIND CURRENTS** from a local data file on an OpenLayers 7.1.0 map. Each feature is styled with a triangle with the COLOR and SIZE adjusted based on the strength of the current. There are 3 color levels (low, medium, high) & the size scales proportionally to the strength of the wind.

# How to run
- git clone 
- npm install
- npm start

# The Data 
/data/weather.json is faked weather data across the globe. Each feature has a coordinates, wind speed & wind direction included.

# Other Stuff
This project was inspired by various Openlayers examples (https://openlayers.org/en/latest/examples/).
And, naturally, Stack Overflow (https://stackoverflow.com/questions/74539898/openlayers-7-1-0-using-a-style-function-with-webglpointslayer-vectorsource) helped me get over the final hurdle.

If you find this repo & want to contribute/chat/criticize, feel free to reach out.