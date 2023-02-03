export const formatDate = (input: number): string => {
  let date = new Date(input * 1000).toLocaleDateString();
  return date;
};

// format the coordinates received from the contract
export const scaleCoordinatesDown = (coordInput: number): number => {
  const result = coordInput / Math.pow(10, 6);
  return result;
};
