import { useSignMessage, useAccount } from "wagmi";
import { useState } from "react";
import { VerifiedLocation } from "../types/VerifiedLocation";
import { Airdrop } from "../types/Airdrop";
import { Button } from "@chakra-ui/react";
import { Location } from "../types/Location";
import { ConnectButton } from "./User/ConnectButton";
import { createSiweMessage, getLocationProof } from "../npm-package/";
import { ClaimButton } from "./ClaimButton";

export const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
  const { address, isConnected } = useAccount();

  const [verifiedLocations, setVerifiedLocations] = useState<
    VerifiedLocation[]
  >([]);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);

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

  function handleUnlock() {
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

    isReadyToClaim
      ?
      <ClaimButton isReadyToClaim={isReadyToClaim} verifiedLocations={verifiedLocations}
        mt={12}
      />
      :
      <Button
        mt={12}
        onClick={handleUnlock}
      >
        Unlock
      </Button>
  );
};
