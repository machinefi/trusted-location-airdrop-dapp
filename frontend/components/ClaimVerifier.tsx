import { useSignMessage, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useClaimDrop } from "../hooks/useClaimDrop";
import { VerifiedLocation } from "../types/VerifiedLocation";
import { Airdrop } from "../types/Airdrop";
import { Button, Spinner } from "@chakra-ui/react";
import { Location } from "../types/Location";
import { ConnectButton } from "./User/ConnectButton";
import { createSiweMessage, getLocationProof } from "../npm-package/";

export const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
  const { address, isConnected } = useAccount();

  const [verifiedLocations, setVerifiedLocations] = useState<
    VerifiedLocation[]
  >([]);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);

  const { isLoading, isSuccess, claimAirdrop } = useClaimDrop({
    scaled_latitude: isReadyToClaim ? verifiedLocations[0].scaled_latitude : 0,
    scaled_longitude: isReadyToClaim
      ? verifiedLocations[0].scaled_longitude
      : 0,
    distance: isReadyToClaim ? verifiedLocations[0].distance : 0,
    from: isReadyToClaim ? verifiedLocations[0].from : 0,
    to: isReadyToClaim ? verifiedLocations[0].to : 0,
    devicehash: isReadyToClaim ? verifiedLocations[0].devicehash : "",
    signature: isReadyToClaim ? verifiedLocations[0].signature : "",
    isReadyToClaim,
  });

  useEffect(() => {
    if (isReadyToClaim) {
      setTimeout(() => {
        claimAirdrop?.();
      }, 8000);
    }
  }, [isReadyToClaim]);

  const locations: Location[] = [
    {
      scaled_latitude: Number(airdrop.lat),
      scaled_longitude: Number(airdrop.long),
      distance: Number(airdrop.max_distance),
      from: airdrop.time_from,
      to: airdrop.time_to,
    },
  ];

  const { signMessage } = useSignMessage({
    onSuccess: async (data, variables) => {
      await queryPolAPI(
        locations,
        address as `0x${string}`,
        data,
        variables.message
      );
    },
  });

  async function queryPolAPI(
    locations: Location[],
    address: string,
    signature: string,
    message: string | Uint8Array
  ) {
    const verifiedLocations = await getLocationProof(
      locations,
      address,
      signature,
      message
    );

    if (!!verifiedLocations && verifiedLocations.length > 0) {
      setVerifiedLocations([...verifiedLocations]);
      setIsReadyToClaim(true);
    } else {
      setVerifiedLocations([]);
      setIsReadyToClaim(false);
    }
  }

  function handleClaim() {
    if (!address) return;
    let message = createSiweMessage({
      address,
      latitude: airdrop.lat,
      longitude: airdrop.long,
      distance: airdrop.max_distance,
      from: airdrop.time_from,
      to: airdrop.time_to,
    });
    signMessage({ message });
  }

  if (!isConnected) {
    return <ConnectButton />;
  }

  return (
    <Button
      size="xs"
      as="button"
      color="white"
      fontWeight="bold"
      borderRadius="md"
      border="1px"
      borderColor="white"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      _hover={{
        bgGradient: "linear(red.100 0%, orange.100 25%, yellow.100 50%)",
        color: "black",
      }}
      mt={12}
      disabled={isLoading || isSuccess}
      onClick={handleClaim}
    >
      {isLoading ? <Spinner size="xs" /> : `Claim`}
      {isSuccess && ` (Success)`}
    </Button>
  );
};
