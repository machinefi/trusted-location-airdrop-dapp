import { useContractRead } from "wagmi";
import { LocationAirdrop } from "../config/contracts";
import { useState } from "react";
import { Airdrop } from "../types/Airdrop";

export const useGetAirdropInfo = (hash: string) => {
  const [airdrop, setAirdropDrop] = useState<Airdrop | undefined>();

  useContractRead({
    ...LocationAirdrop,
    functionName: "airDrops",
    args: [hash],
    onSuccess: (rawAirdrop: bigint[]) => {
      const properAirdrop = parseDrop(rawAirdrop);
      setAirdropDrop(properAirdrop);
    },
    enabled: !!hash,
  });

  return airdrop;
};

const parseDrop = (airdrop: bigint[]): Airdrop => ({
  lat: airdrop[0].toString(),
  long: airdrop[1].toString(),
  max_distance: airdrop[2].toString(),
  time_from: airdrop[3].toString(),
  time_to: airdrop[4].toString(),
  tokens_count: airdrop[5].toString(),
  tokens_minted: airdrop[6].toString(),
});
