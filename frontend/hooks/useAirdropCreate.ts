import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { LocationAirdrop } from "../config/contracts";
import { useRouter } from "next/router";
import { scaleCoordinatesUp } from "../utils/scaleCoordinates";
import { millisecondsToSeconds } from "../utils/formatDate";
import { Geolocation } from "@w3bstream/geolocation-light";

type AirdropCreateProps = {
  lat: number;
  long: number;
  max_distance: number;
  time_from: number;
  time_to: number;
  tokens_count: number;
  airdropFee: number;
};

export const useAirdropCreate = ({
  lat,
  long,
  max_distance,
  time_from,
  time_to,
  tokens_count,
  airdropFee,
}: AirdropCreateProps) => {
  const router = useRouter();
  const { config } = usePrepareContractWrite({
    ...LocationAirdrop,
    functionName: "addAirDrop",
    args: [
      Geolocation.scaleCoordinatesUp(Number(lat)),
      Geolocation.scaleCoordinatesUp(Number(long)),
      Number(max_distance),
      millisecondsToSeconds(time_from),
      millisecondsToSeconds(time_to),
      tokens_count,
    ],
    overrides: {
      value: Number(airdropFee?.toString()),
    },
    enabled:
      !!lat &&
      !!long &&
      !!max_distance &&
      !!time_from &&
      !!time_to &&
      !!tokens_count &&
      !!airdropFee,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess: () => router.push("/"),
  });

  return { data, isLoading, isSuccess, createAirdrop: write };
};
