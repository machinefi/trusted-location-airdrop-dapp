import { useSignMessage, useAccount } from "wagmi";
import { useRef, useState } from "react";
import { VerifiedLocation } from "../types/VerifiedLocation";
import { Airdrop } from "../types/Airdrop";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "./User/ConnectButton";
import { ClaimButton } from "./ClaimButton";
import { GeolocationVerifier } from "@nick-iotex/g3o";

export const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
  const g3o = useRef<GeolocationVerifier>(new GeolocationVerifier());
  const { address, isConnected } = useAccount();

  const [verifiedLocations, setVerifiedLocations] = useState<
    VerifiedLocation[]
  >([]);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);
  const [verificationUnsuccessful, setVerificationUnsuccessful] = useState(false);

  const { signMessage } = useSignMessage({
    onSuccess: async (data) => {
      g3o.current.signature = data;
      const verifiedLocations = await g3o.current.verifyLocation();
      if (!!verifiedLocations && verifiedLocations.length > 0) {
        setVerifiedLocations([...verifiedLocations]);
        setIsReadyToClaim(true);
      } else {
        setVerifiedLocations([]);
        setIsReadyToClaim(false);
        setVerificationUnsuccessful(true);
      }
    },
  });

  function handleUnlock() {
    if (!address) return;
    g3o.current.scaledLocation = {
      scaled_latitude: Number(airdrop.lat), 
      scaled_longitude: Number(airdrop.long),
      distance: Number(airdrop.max_distance),
      from: Number(airdrop.time_from),
      to: Number(airdrop.time_to),
    };

    const message = g3o.current.generateSiweMessage({
      address,
      domain: globalThis.location.host,
      uri: globalThis.location.origin,
    });
    signMessage({ message });
  }

  if (!isConnected) {
    return <ConnectButton />;
  }

  return isReadyToClaim ? (
    <ClaimButton
      isReadyToClaim={isReadyToClaim}
      verifiedLocations={verifiedLocations}
      mt={12}
      size={'xs'}
    />
  ) : (
    <Button size={'xs'} mt={12} onClick={handleUnlock}>
      {verificationUnsuccessful ? "Verification Unsuccessful" : "Unlock"}
    </Button>
  );
};
