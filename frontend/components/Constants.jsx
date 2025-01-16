// Shared constants
export const BACKEND_REST_API = REST_API || `https://cesium-api.uniclogs.org`;
console.log(`[ENV]: Using Rest API at ${BACKEND_REST_API}`)

// to replace the Cesium Ion logo with just a Cesium logo
// this is not using Cesium Ion, only CesiumJS
export const CESIUM_CREDIT = '<a href="https://cesium.com/" target="_blank"><img src="cesium/Assets/Images/cesium_credit.png" title="Cesium"/></a>';


// PSU coordinates
export const HOME_LAT_DEG = 45.523064;
export const HOME_LONG_DEG = -122.676483;
export const HOME_ALT_M = 25000000.0;