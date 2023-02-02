import { useContractRead } from "wagmi";
import { LocationAirdrop } from "../config/contracts";

export const useGetAirdropHashes = () => {
  const { data: airdropHashes }: { data: string[] | undefined } =
    useContractRead({
      ...LocationAirdrop,
      functionName: "getAllHashes",
      chainId: 4690,
      onSuccess: (data) => console.log("data", data),
    });

  return { airdropHashes };
};
