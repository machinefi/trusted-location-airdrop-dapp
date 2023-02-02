import { useContractRead } from "wagmi";
import { locationAirdrop } from "./hooksConfig";

export const useGetAirdropHashes = () => {
  const { data: airdropHashes }: { data: string[] | undefined } =
    useContractRead({
      ...locationAirdrop,
      functionName: "getAllHashes",
      chainId: 4690,
      onSuccess: (data) => console.log("data", data),
    });

  return { airdropHashes };
};
