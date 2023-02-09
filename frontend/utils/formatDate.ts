// format date
export const secondsToLocaleDataString = (input: string) => {
  let date = new Date(Number(input) * 1000).toLocaleDateString();
  return date;
};

// format date in seconds
export const millisecondsToSeconds = (dateInput: number) => {
  const timestamp = dateInput / 1000;
  return timestamp;
};
