import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"
import { useRouter } from "next/router";
import { VerifiedLocation } from '../types/VerifiedLocation';

export const useClaimDrop = ({ scaled_latitude, scaled_longitude, distance, from, to, devicehash, signature, isReadyToClaim }: VerifiedLocation & {isReadyToClaim: boolean}) => {
    const router = useRouter();
    const { config } = usePrepareContractWrite({
        address: LogicContractAddress,
        abi: LogicContract.abi,
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

    const { data, isLoading, isSuccess, write } = useContractWrite({...config, onSuccess: () => router.push("/") })
    
    const {isLoading: isWaiting, isSuccess: isGood} = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
      })


    return { data, isLoading: isLoading || isWaiting, isSuccess: isSuccess && isGood, claimAirdrop: write };
}