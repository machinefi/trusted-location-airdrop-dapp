import { useContractRead, useAccount } from 'wagmi'
import { logicContractConfig } from '../hooks/hooksConfig'
import { PersonalDropsCard } from "./PersonalDropsCard";

export const UserClaimedDrop = ({ hash }: { hash: string }) => {

    const { address } = useAccount()

    const { data: isClaimed } = useContractRead({
        ...logicContractConfig,
        functionName: "claimedAirDrops",
        args: [address, hash],
        enabled: !!address && !!hash,
        onError(error) {
            console.log('Error', error)
        },
    })

    if (isClaimed) {
        return <PersonalDropsCard hash={hash} />
    }

    return null
}