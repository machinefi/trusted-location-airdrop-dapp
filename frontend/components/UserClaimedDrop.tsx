import { useContractRead, useAccount } from "wagmi";
import { LocationAirdrop } from "../config/contracts";
import AirdropCard from "./airdrop/AirdropCard";
import { PersonalDropCardBody } from "./airdrop/PersonalDropCardBody";

export const UserClaimedDrop = ({ hash }: { hash: string }) => {
  const { address } = useAccount();

  const { data: isClaimed } = useContractRead({
    ...LocationAirdrop,
    functionName: "claimedAirDrops",
    args: [address, hash],
    enabled: !!address && !!hash,
    onError(error) {
      console.log("Error", error);
    },
  });

  if (isClaimed) {
    return (
      <AirdropCard hash={hash}>
        <PersonalDropCardBody hash={hash} />
      </AirdropCard>
    );
  }

  return null;
};
