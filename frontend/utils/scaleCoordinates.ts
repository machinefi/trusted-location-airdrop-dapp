import { Geolocation } from "@w3bstream/geolocation-light";

// format the coordinates received from the contract
export const scaleCoordinatesDown = (coordInput: number) => {
  return Geolocation.scaleCoordinatesDown(coordInput);
}

// format the coordinates to send to the contract
export const scaleCoordinatesUp = (coordInput: number) => {
  return Geolocation.scaleCoordinatesUp(coordInput);
};