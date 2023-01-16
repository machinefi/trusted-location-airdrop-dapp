import { useContractRead } from 'wagmi'
import { logicContractConfig } from "./hooksConfig"

export const useGetAirdropHashes = () => {

    const { data: airdropHashes }: { data: string[] | undefined } = useContractRead({
        ...logicContractConfig,
        functionName: "getAllHashes",
        chainId: 4690,
        onSuccess: (data) => console.log("data", data)
    })

    return { airdropHashes }
} 