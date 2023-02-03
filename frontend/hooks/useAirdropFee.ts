import { iotexTestnet } from "@wagmi/chains";
import { useContractRead } from "wagmi";
import { LocationAirdrop } from "../config/contracts";

export const useAirdropFee = (tokens: number) => {
  const { data: airdropFee }: { data: bigint | undefined } = useContractRead({
    ...LocationAirdrop,
    functionName: "calculateFee",
    args: [tokens],
    chainId: iotexTestnet.id,
    enabled: !!tokens,
  });

  return airdropFee;
};
