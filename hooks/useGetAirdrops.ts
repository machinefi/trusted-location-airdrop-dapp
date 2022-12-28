import { useContractReads } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"

export const useGetAirdrops = () => {

    const logicContract = {
        address: LogicContractAddress,
        abi: LogicContract.abi,
    }

    const { data: airdropHashes } = useContractReads({
        contracts: [
            {
                ...logicContract,
                functionName: "airDropsHashes",
                chainId: 4690,
            }
        ]
    })

    return { hashes: airdropHashes } ;

}