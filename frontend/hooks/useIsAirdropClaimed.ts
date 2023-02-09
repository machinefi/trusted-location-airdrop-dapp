import { useAccount, useContractRead } from "wagmi";
import { LocationAirdrop } from "../config/contracts";

export const useIsAirdropClaimed = (hash: string): boolean | undefined => {
  const { address } = useAccount();

  const { data: isClaimed }: { data: boolean | undefined } = useContractRead({
    ...LocationAirdrop,
    functionName: "claimedAirDrops",
    args: [address, hash],
    enabled: !!address && !!hash,
    onError(error) {
      console.log("Error", error);
    },
  });

  return isClaimed;
};
