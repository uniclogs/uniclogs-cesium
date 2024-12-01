import React, { memo } from 'react';
import { Viewer, Clock, CameraFlyTo } from 'resium';
import {
  UrlTemplateImageryProvider, GeographicTilingScheme, ClockStep, Credit, Cartesian3,
} from 'cesium';
import DataFetcher from './DataFetcher';
import Overlay from './Overlay';
import 'bootstrap/dist/css/bootstrap.min.css';

const restApi = REST_API || `http://${window.location.hostname}:5000`;

// replace the Cesium Ion logo with just a Cesium logo
// this is not using Cesium Ion, only CesiumJS
const cesiumCredit = '<a href="https://cesium.com/" target="_blank"><img src="/images/cesium_logo.png" title="Cesium"/></a>';

const imageryProvider = new UrlTemplateImageryProvider({
  url: restApi + '/tiles/{z}/{x}/{reverseY}.png',
  tilingScheme: new GeographicTilingScheme(),
  maximumLevel: 5,
});

function Cesium() {
  return (
    <Viewer
      baseLayerPicker={false} // uses Cesium Ion
      geocoder={false} // uses Cesium Ion
      imageryProvider={imageryProvider}
      credit={new Credit(cesiumCredit)}
      full
    >
      <CameraFlyTo destination={Cartesian3.fromDegrees(-122.676483, 45.523064, 25000000.0)} />
      <Clock clockStep={ClockStep.SYSTEM_CLOCK} />
      <DataFetcher restApi={restApi} />
      <Overlay restApi={restApi} />
    </Viewer>
  );
}

export default memo(Cesium);
