// format the coordinates received from the contract
export const scaleCoordinatesDown = (coordInput: string) => {
  const result = Number(coordInput) / Math.pow(10, 6);
  return result;
};

// format the coordinates to send to the contract
export const scaleCoordinatesUp = (coordInput: number) => {
  const result = Math.round(coordInput * Math.pow(10, 6));
  return result;
};
