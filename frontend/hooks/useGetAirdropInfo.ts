import { useContractRead } from "wagmi";
import { LocationAirdrop } from "../config/contracts";
import { useState } from "react";
import { Airdrop } from "../types/Airdrop";

export const useGetAirdropInfo = (hash: string) => {
  const [properDrop, setProperDrop] = useState<Airdrop | undefined>();

  useContractRead({
    ...LocationAirdrop,
    functionName: "airDrops",
    args: [hash],
    onSuccess: (airdrop: bigint[]) => {
      const properAirdrop: Airdrop = {
        lat: airdrop[0].toString(),
        long: airdrop[1].toString(),
        max_distance: airdrop[2].toString(),
        time_from: airdrop[3].toString(),
        time_to: airdrop[4].toString(),
        tokens_count: airdrop[5].toString(),
        tokens_minted: airdrop[6].toString(),
      };
      setProperDrop(properAirdrop);
    },
    enabled: !!hash,
  });

  return properDrop;
};
