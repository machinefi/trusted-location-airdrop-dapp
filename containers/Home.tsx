import { Grid } from '@chakra-ui/react'
import { AirdropCard } from './AirdropCard'
import { useGetAirdropHashes } from '../hooks/useGetAirdropHashes'

export const Home = () => {

    const { airdropHashes } = useGetAirdropHashes()

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






