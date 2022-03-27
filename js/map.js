import { setFormsState, setAddress } from './forms.js';
import { DEFAULT_LOCATION } from './settings.js';

setFormsState(false);

const map = L.map('map-canvas')
  .on('load', () => {
    setFormsState(true);
    setAddress(DEFAULT_LOCATION);
  })
  .setView(DEFAULT_LOCATION, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

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

const mainPinMarker = L.marker(
  DEFAULT_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const createMarker = (location, popup) => {
  const marker = L.marker(
    location,
    {
      pinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(popup);
};

export { createMarker };
