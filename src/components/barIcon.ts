import L from 'leaflet';
import pinUrl from '../assets/pin.svg';

export const barIcon = L.icon({
  iconUrl: pinUrl,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});
