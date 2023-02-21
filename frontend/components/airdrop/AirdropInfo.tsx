import { Box, Text } from "@chakra-ui/react";
import { Airdrop } from "../../types/Airdrop";
import { secondsToLocaleDataString } from "../../utils/formatDate";
import { scaleCoordinatesDown } from "../../utils/scaleCoordinates";

export const AirdropInfo = ({ airdrop }: { airdrop: Airdrop }) => (
  <Box>
    <Text pt="2" fontSize="sm" textTransform="uppercase">
      Latitude: {airdrop ? scaleCoordinatesDown(Number(airdrop.lat)) : "loading"}
    </Text>
    <Text pt="2" fontSize="sm" textTransform="uppercase">
      Longitude: {airdrop ? scaleCoordinatesDown(Number(airdrop.long)) : "loading"}
    </Text>
    <Text pt="2" fontSize="sm" textTransform="uppercase">
      Distance: {airdrop ? `${airdrop.max_distance} meters` : `loading`}
    </Text>
    <Text pt="2" fontSize="sm" textTransform="uppercase">
      From: {airdrop ? secondsToLocaleDataString(airdrop.time_from) : "loading"}
    </Text>
    <Text pt="2" fontSize="sm" textTransform="uppercase">
      To: {airdrop ? secondsToLocaleDataString(airdrop.time_to) : "loading"}
    </Text>
  </Box>
);
