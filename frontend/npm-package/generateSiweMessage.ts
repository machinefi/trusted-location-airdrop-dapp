import moment from "moment";
import { SiweMessage } from "siwe";
import { formatDate } from "../utils/formatDate";
import { scaleCoordinatesDown } from "../utils/scaleCoordinates";

const TESTNET_CHAIN_ID = 4690;

const createSiweMessage = (
  address: string,
  latitude: string,
  longitude: string,
  distance: string,
  from: string,
  to: string
) => {
  const message = new SiweMessage({
    domain: globalThis.location.host,
    address: address,
    statement: `The application will know if you were located in the following region with latitude: ${scaleCoordinatesDown(
      Number(latitude)
    )}, longitude: ${scaleCoordinatesDown(
      Number(longitude)
    )}, and within a maximum distance of ${Number(
      distance
    )} meters, between ${formatDate(Number(from))}, and ${formatDate(
      Number(to)
    )}`,
    uri: globalThis.location.origin,
    version: "1",
    chainId: TESTNET_CHAIN_ID,
    expirationTime: moment().add(5, "minutes").toISOString(),
  });
  return message.prepareMessage();
};

export default createSiweMessage;