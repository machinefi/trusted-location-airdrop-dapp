// format date
export const secondsToLocaleDataString = (input: string) => {
return new Date(Number(input) * 1000).toLocaleDateString();
};

// format date in seconds
export const millisecondsToSeconds = (dateInput: number) => {
  return dateInput / 1000;
};
