import { Grid } from '@chakra-ui/react'
import { AirdropCard } from './AirdropCard'

export const Home = ({ airdropsHashes }: { airdropsHashes: string[] }) => {

    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} m={24}>
            {
                airdropsHashes.map((hash) => <AirdropCard hash={hash} key={hash}/>)
            }
            {
                !airdropsHashes.length && "No airdrops created yet"
            }
        </Grid>
    )
}






