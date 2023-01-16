import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { logicContractConfig } from "./hooksConfig"
import { useRouter } from "next/router";
import { VerifiedLocation } from '../types/VerifiedLocation';

export const useClaimDrop = ({ scaled_latitude, scaled_longitude, distance, from, to, devicehash, signature, isReadyToClaim }: VerifiedLocation & { isReadyToClaim: boolean }) => {
    const router = useRouter();
    const { config } = usePrepareContractWrite({
        ...logicContractConfig,
        functionName: 'claim',
        args: [
            scaled_latitude,
            scaled_longitude,
            distance,
            from,
            to,
            devicehash,
            signature
        ],
        enabled: isReadyToClaim
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({ ...config, onSuccess: () => router.push("/") })

    const { isLoading: isWaiting, isSuccess: isGood } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
    })


    return { data, isLoading: isLoading || isWaiting, isSuccess: isSuccess && isGood, claimAirdrop: write };
}