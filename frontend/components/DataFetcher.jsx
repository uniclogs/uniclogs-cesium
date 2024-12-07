import React, { useEffect } from 'react';
import { useCesium } from 'resium';
import { CzmlDataSource, Cartesian3 } from 'cesium';
import { BACKEND_REST_API, CESIUM_CREDIT, HOME_LAT_DEG, HOME_LONG_DEG, HOME_ALT_M } from './Constants';

function DataFetcher() {
  const cesium = useCesium();

  function fetchCzml() {
    fetch(`${BACKEND_REST_API}/czml`)
      .then(response => response.json())
      .then(data => {
        if (cesium.viewer.dataSources !== undefined) {
          cesium.viewer.dataSources.removeAll(); // clear old CZMLs
          cesium.viewer.dataSources.add(CzmlDataSource.load(data));
        }
      });
  }

  useEffect(() => {
    cesium.viewer.scene.globe.enableLighting = true;

    // override home
    cesium.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (e) => {
        e.cancel = true;
        cesium.viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(HOME_LONG_DEG, HOME_LAT_DEG, HOME_ALT_M),
        });
      },
    );

    // replace the Cesium Ion logo with just a Cesium logo
    // this is not using Cesium Ion, only CesiumJS
    cesium.viewer.scene.frameState.creditDisplay._cesiumCreditContainer.innerHTML = CESIUM_CREDIT;

    cesium.viewer.entities.add({
      name: 'PSAS',
      description: '<p>Portland State Aerospace Society</p>',
      position: Cartesian3.fromDegrees(HOME_LONG_DEG, HOME_LAT_DEG),
      billboard: {
        image: '/psas_logo.png',
        scale: 0.2,
      },
    });

    fetchCzml();

    // refresh czml every hour
    const interval = setInterval(() => {
      fetchCzml();
    }, 3600000); // ms
    return () => clearInterval(interval);
  });

  return (
    <div />
  );
}

export default DataFetcher;
