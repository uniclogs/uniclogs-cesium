import * as Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css";

const data_host = DATA_HOST || 'http://localhost:5000';

var viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayerPicker: false, // uses Cesium Ion
  geocoder: false, // uses Cesium Ion
  imageryProvider: new Cesium.UrlTemplateImageryProvider({  // use our own data
    url : data_host + "/tiles/{z}/{x}/{reverseY}.png",
    tilingScheme : new Cesium.GeographicTilingScheme(),
    maximumLevel: 5,
  }),
  timeline: false,
  shouldAnimate: true,
});

viewer.dataSources.add(Cesium.CzmlDataSource.load(data_host + '/czml/OreSat0.czml')).then(() => {
  // set time to current time
  viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
});

// add lighting
viewer.scene.globe.enableLighting = true;

// replace the Cesium Ion logo with just a Cesium logo, this is not using Cesium Ion, only CesiumJS
viewer.scene.frameState.creditDisplay._cesiumCredit._html = '<a href="https://cesium.com/" target="_blank"><img src="Assets/Images/cesium_credit.png" title="Cesium"/></a>';

var portlandPin = viewer.entities.add({
  name: "PSAS",
  description: "\
<p>\
  PortlandState Aerospace Society\
</p>",
  position: Cesium.Cartesian3.fromDegrees(-122.676483, 45.523064),
  billboard: {
    image: './static/PSAS_logo.png',
    scale: 0.2,
  },
});

Cesium.when.all([portlandPin])
