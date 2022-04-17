import { DEFAULT_LOCATION } from './const.js';
import { setAddress } from './forms.js';

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mapProperties = {};

const initMap = (cb) => {
  mapProperties.map = L.map('map-canvas')
    .on('load', () => {
      cb();
    })
    .setView(DEFAULT_LOCATION, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapProperties.map);

  mapProperties.markerGroup = L.layerGroup().addTo(mapProperties.map);

  mapProperties.mainPinMarker = L.marker(
    DEFAULT_LOCATION,
    {
      draggable: true,
      icon:  mainPinIcon,
    }
  );

  mapProperties.mainPinMarker.addTo(mapProperties.map);

  mapProperties.mainPinMarker.on('moveend', (evt) => {
    setAddress(evt.target.getLatLng());
  });
};

const createMarker = (location, popup) => {
  const marker = L.marker(
    location,
    {
      pinIcon,
    },
  );

  marker
    .addTo(mapProperties.markerGroup)
    .bindPopup(popup);
};

const setDefaultPosition = () => {
  mapProperties.map.setView(DEFAULT_LOCATION, 12);
  mapProperties.mainPinMarker.setLatLng(DEFAULT_LOCATION);
  setAddress(DEFAULT_LOCATION);
};

const removeMarkers = () => {
  mapProperties.markerGroup.clearLayers();
};

const resetMap = (cb) => {
  removeMarkers();
  setDefaultPosition();
  cb();
};

export { initMap, createMarker, removeMarkers, resetMap };
