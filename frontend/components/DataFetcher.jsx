import React, { useEffect } from 'react';
import { useCesium } from 'resium';
import { CzmlDataSource, Cartesian3 } from 'cesium';
import { BACKEND_REST_API, CESIUM_CREDIT, HOME_LAT_DEG, HOME_LONG_DEG, HOME_ALT_M, RETRY_DELAY } from './Constants';
import { func } from 'prop-types';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function DataFetcher() {
  const cesium = useCesium();

  function fetchCzml() {
    const url = `${BACKEND_REST_API}/czml`
    console.debug(`Fetching CZML from ${url}`)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (cesium.viewer.dataSources !== undefined) {
          cesium.viewer.dataSources.removeAll(); // clear old CZMLs
          cesium.viewer.dataSources.add(CzmlDataSource.load(data));
        }
      }).catch(res => {
        console.error(`Failed to fetch CZML with reason: ${res}`)
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
