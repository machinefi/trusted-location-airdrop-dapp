import { Geolocation } from "@nick-iotex/g3o";

// format the coordinates received from the contract
export const scaleCoordinatesDown = (coordInput: number) => {
  return Geolocation.scaleCoordinatesDown(coordInput);
}

// format the coordinates to send to the contract
export const scaleCoordinatesUp = (coordInput: number) => {
  return Geolocation.scaleCoordinatesUp(coordInput);
};
