import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { logicContractConfig } from "./hooksConfig"
import { useRouter } from "next/router";

type AirdropCreateProps = {
    lat: number,
    long: number,
    max_distance: number,
    time_from: number,
    time_to: number,
    tokens_count: number,
    airdropFee: number,
}

export const useAirdropCreate = ({ lat, long, max_distance, time_from, time_to, tokens_count, airdropFee }: AirdropCreateProps) => {
    const router = useRouter();
    const { config } = usePrepareContractWrite({
        ...logicContractConfig,
        functionName: 'addAirDrop',
        args: [
            scaleCoordinatesUp(Number(lat)),
            scaleCoordinatesUp(Number(long)),
            Number(max_distance),
            _formatDate(time_from),
            _formatDate(time_to),
            tokens_count
        ],
        overrides: {
            value: Number(airdropFee?.toString()),
        },
        enabled: !!lat && !!long && !!max_distance && !!time_from && !!time_to && !!tokens_count && !!airdropFee
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({ ...config, onSuccess: () => router.push("/") })

    return { data, isLoading, isSuccess, createAirdrop: write };
}

// format date in seconds
function _formatDate(dateInput: number) {
    // const date = new Date(dateInput);
    const timestamp = dateInput / 1000;
    return timestamp;
}

// format the coordinates to send to the contract
function scaleCoordinatesUp(coordInput: number) { // send to the contract
    const result = Math.round(coordInput * Math.pow(10, 6))
    return result
}