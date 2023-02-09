import { useIsAirdropClaimed } from "../hooks/useIsAirdropClaimed";
import AirdropCard from "./airdrop/AirdropCard";
import { PersonalDropCardBody } from "./airdrop/PersonalDropCardBody";

export const UserClaimedDrop = ({ hash }: { hash: string }) => {
  const isClaimed = useIsAirdropClaimed(hash);

  if (!isClaimed) {
    return null;
  }

  return (
    <AirdropCard hash={hash}>
      <PersonalDropCardBody hash={hash} />
    </AirdropCard>
  );
};
