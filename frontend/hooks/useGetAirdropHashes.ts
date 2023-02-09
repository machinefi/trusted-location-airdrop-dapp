import { useContractRead } from "wagmi";
import { iotexTestnet } from "wagmi/chains";
import { LocationAirdrop } from "../config/contracts";

export const useGetAirdropHashes = () => {
  const { data: airdropHashes }: { data: string[] | undefined } =
    useContractRead({
      ...LocationAirdrop,
      functionName: "getAllHashes",
      chainId: iotexTestnet.id,
      onSuccess: (data) => console.log("data", data),
    });

  return { airdropHashes };
};
