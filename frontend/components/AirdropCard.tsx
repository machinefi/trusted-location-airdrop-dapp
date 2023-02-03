import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { ClaimVerifier } from "./ClaimVerifier";
import { useGetAirdropInfo } from "../hooks/useGetAirdropInfo";
import { secondsToLocaleDataString } from "../utils/formatDate";
import { scaleCoordinatesDown } from "../utils/scaleCoordinates";

export const AirdropCard = ({ hash }: { hash: string }) => {
  const airdrop = useGetAirdropInfo(hash);

  return (
    <Card
      as="article"
      maxW="sm"
      _hover={{
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        color: "white",
      }}
      boxShadow="inner"
    >
      <CardHeader>
        <Heading size="md" as="b">
          <Center>
            Air Drop {hash?.substring(0, 5)}..{hash?.substring(hash.length - 2)}
          </Center>
        </Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Tokens Left:{" "}
            {airdrop
              ? `${
                  Number(airdrop.tokens_count) - Number(airdrop.tokens_minted)
                } of ${airdrop.tokens_count}`
              : `loading`}
          </Heading>

          <Text pt="2" fontSize="sm" textTransform="uppercase">
            Latitude: {airdrop ? scaleCoordinatesDown(airdrop.lat) : "loading"}
          </Text>
          <Text pt="2" fontSize="sm" textTransform="uppercase">
            Longitude:{" "}
            {airdrop ? scaleCoordinatesDown(airdrop.long) : "loading"}
          </Text>
          <Text pt="2" fontSize="sm" textTransform="uppercase">
            Distance: {airdrop ? `${airdrop.max_distance} meters` : `loading`}
          </Text>
          <Text pt="2" fontSize="sm" textTransform="uppercase">
            From:{" "}
            {airdrop ? secondsToLocaleDataString(airdrop.time_from) : "loading"}
          </Text>
          <Text pt="2" fontSize="sm" textTransform="uppercase">
            To:{" "}
            {airdrop ? secondsToLocaleDataString(airdrop.time_to) : "loading"}
          </Text>

          <Center>{!!airdrop && <ClaimVerifier airdrop={airdrop} />}</Center>
        </Box>
      </CardBody>
    </Card>
  );
};

export default AirdropCard;
