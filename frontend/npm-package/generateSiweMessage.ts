import moment from "moment";
import { SiweMessage } from "siwe";
import { formatDate, scaleCoordinatesDown } from "./helpers";

const TESTNET_CHAIN_ID = 4690;

type LocationSiweProps = {
  address: string;
  latitude: string;
  longitude: string;
  distance: string;
  from: string;
  to: string;
};

type ParsedLocationSiweProps = {
  latitude: number;
  longitude: number;
  distance: number;
  from: string;
  to: string;
};

const createSiweMessage = (props: LocationSiweProps): string => {
  const parsedProps = parseProps(props);

  const message = new SiweMessage({
    domain: globalThis.location.host,
    address: props.address,
    statement: generateStatement(parsedProps),
    uri: globalThis.location.origin,
    version: "1",
    chainId: TESTNET_CHAIN_ID,
    expirationTime: moment().add(5, "minutes").toISOString(),
  });
  return message.prepareMessage();
};

export default createSiweMessage;

const parseProps = (props: LocationSiweProps) => {
  const { latitude, longitude, distance, from, to } = props;
  return {
    latitude: scaleCoordinatesDown(Number(latitude)),
    longitude: scaleCoordinatesDown(Number(longitude)),
    distance: Number(distance),
    from: formatDate(Number(from)),
    to: formatDate(Number(to)),
  };
};

const generateStatement = ({
  latitude,
  longitude,
  distance,
  from,
  to,
}: ParsedLocationSiweProps) =>
  `The application will know if you were located in the following region with latitude: ${latitude}, longitude: ${longitude}, and within a maximum distance of ${distance} meters, between ${from}, and ${to}`;
