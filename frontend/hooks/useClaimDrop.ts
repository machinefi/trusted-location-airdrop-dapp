import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { LocationAirdrop } from "../config/contracts";
import { useRouter } from "next/router";
import { VerifiedLocation } from "../types/VerifiedLocation";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";

export const useClaimDrop = ({
  scaled_latitude,
  scaled_longitude,
  distance,
  from,
  to,
  devicehash,
  signature,
  isReadyToClaim,
}: VerifiedLocation & { isReadyToClaim: boolean }) => {
  const router = useRouter();
  const { config, isError: isPrepareError } = usePrepareContractWrite({
    ...LocationAirdrop,
    functionName: "claim",
    args: [
      scaled_latitude,
      scaled_longitude,
      distance,
      from,
      to,
      devicehash,
      signature,
    ],
    enabled: isReadyToClaim,
    overrides: {
      value: ethers.utils.parseEther("2"),
    },
    onError: (error) => console.log("error", error),
  });

  const { data, isLoading, isSuccess, isError: isWriteError, write } = useContractWrite({
    ...config,
    onSuccess: () => router.push("/"),
  });
  const toast = useToast();
  const { isLoading: isWaiting, isSuccess: isGood, isError: isWaitError } = useWaitForTransaction({
    confirmations: 1,
    hash: data?.hash,
    onSuccess: () => toast({ title: "successful claim", status: "success" }),
  });

  return {
    data,
    isLoading: isLoading || isWaiting,
    isSuccess: isSuccess && isGood,
    isError: isWaitError || isPrepareError || isWriteError,
    claimAirdrop: write,
  };
};
