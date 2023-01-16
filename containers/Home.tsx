import { Grid } from '@chakra-ui/react'
import { AirdropCard } from './AirdropCard'
import { useContractRead } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"

export const Home = () => {

    const logicContract = {
        address: LogicContractAddress,
        abi: LogicContract.abi,
    }

    const { data: airdropHashes }: { data: string[] | undefined } = useContractRead({
        address: logicContract.address,
        abi: logicContract.abi,
        functionName: "getAllHashes",
        chainId: 4690,
        onSuccess: (data) => console.log("data", data)
    })

    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} m={24}>
            {
                airdropHashes?.map((hash) => <AirdropCard hash={hash} key={hash} />)
            }
            {
                !airdropHashes?.length && "No airdrops created yet"
            }
        </Grid>
    )
}

export default Home;






