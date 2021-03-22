import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { setAdressValue } from './form.js';
import { createCard } from './card.js';

export const TOKIO_COORDINATES_LAT = 35.6623;
export const TOKIO_COORDINATES_LNG = 139.78053;

const mapCanvas = document.querySelector('#map-canvas');

let map;

const mainPinIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [46, 46],
    iconAnchor: [23, 46],
  },
);

const mainPinMarker = L.marker(
  {
    lat: TOKIO_COORDINATES_LAT,
    lng: TOKIO_COORDINATES_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

let markers = [];

export const renderMarkers = (offers) => {
  markers.forEach((marker) => marker.remove());
  markers = [];

  offers.forEach((offer) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon,
      },
    );

    markers.push(marker);

    marker
      .addTo(map)
      .bindPopup(
        createCard(offer),
        {
          keepInView: true,
        },
      );
  });
};

const onMainPinMove = () => {
  const {lat, lng} = mainPinMarker.getLatLng();
  setAdressValue(lat, lng);
};

export const addMainPinHandlers = () => {
  mainPinMarker.on('drag', onMainPinMove);
  mainPinMarker.on('moveend', onMainPinMove);
};

export const initializeMap = (onLoad) => {
  if (!map) {
    map = L.map('map-canvas');
  }

  map.on('load', () => {
    onLoad()
  })
    .setView({
      lat: TOKIO_COORDINATES_LAT,
      lng: TOKIO_COORDINATES_LNG,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const initialCoords = L.latLng(TOKIO_COORDINATES_LAT, TOKIO_COORDINATES_LNG);

  mainPinMarker.setLatLng(initialCoords);
  mainPinMarker.addTo(map);

  mapCanvas.setAttribute('height', '480');
  setAdressValue(TOKIO_COORDINATES_LAT, TOKIO_COORDINATES_LNG);

  addMainPinHandlers();
};
