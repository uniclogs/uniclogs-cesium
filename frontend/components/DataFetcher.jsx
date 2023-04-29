import React, { useEffect } from 'react';
import { useCesium } from 'resium';
import { CzmlDataSource, Cartesian3 } from 'cesium';

function DataFetcher({ restApi }) {
  const cesium = useCesium();

  function fetchCzml() {
    fetch(`${restApi}/czml`)
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

    // replace the Cesium Ion logo with just a Cesium logo
    // this is not using Cesium Ion, only CesiumJS
    cesium.viewer.scene.frameState.creditDisplay._cesiumCreditContainer.innerHTML = '<a href="https://cesium.com/" target="_blank"><img src="cesium/Assets/Images/cesium_credit.png" title="Cesium"/></a>';

    cesium.viewer.entities.add({
      name: 'PSAS',
      description: '<p>Portland State Aerospace Society</p>',
      position: Cartesian3.fromDegrees(-122.676483, 45.523064),
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
