import { useSignMessage, useAccount } from "wagmi";
import { useRef, useState } from "react";
import { VerifiedLocation } from "../types/VerifiedLocation";
import { Airdrop } from "../types/Airdrop";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "./User/ConnectButton";
import { ClaimButton } from "./ClaimButton";
import { GeolocationVerifier } from "@w3bstream/geolocation-light";

export const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
  const geolocation = useRef<GeolocationVerifier>(new GeolocationVerifier());
  const { address, isConnected } = useAccount();

  const [verifiedLocations, setVerifiedLocations] = useState<
    VerifiedLocation[]
  >([]);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);
  const [verificationUnsuccessful, setVerificationUnsuccessful] = useState(false);

  async function sendQuery() {
    const verifiedLocations = await geolocation.current.verifyLocation();
    if (!!verifiedLocations && verifiedLocations.length > 0) {
      setVerifiedLocations([...verifiedLocations]);
      setIsReadyToClaim(true);
    } else {
      setVerifiedLocations([]);
      setIsReadyToClaim(false);
      setVerificationUnsuccessful(true);
    }
  }

  const { signMessage } = useSignMessage({
    onSuccess: (data) => {
      geolocation.current.signature = data;
      sendQuery()
    }
  });

  function handleUnlock() {
    if (!address) return;
    geolocation.current.scaledLocation = {
      scaled_latitude: Number(airdrop.lat),
      scaled_longitude: Number(airdrop.long),
      distance: Number(airdrop.max_distance),
      from: Number(airdrop.time_from),
      to: Number(airdrop.time_to),
    };

    const message = geolocation.current.generateSiweMessage({
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
      {verificationUnsuccessful ? "Proof Not Found" : "Get Proof"}
    </Button>
  );
};
