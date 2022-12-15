import { Text, Center } from '@chakra-ui/react'
import { airdrops } from "../airdrops";
import { Airdrop } from "../types/Airdrop";
import { Home } from "../containers/Home";

interface Homeprops {
    airdrops: Airdrop[]
}

export default function MyDrops({ airdrops }: Homeprops) {
    return (
        <div>
            <Center>
                <Text
                    fontSize='4xl'
                    mb={6}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    as='b'
                >
                    My Airdrops</Text>
            </Center>

            <Home airdrops={airdrops} />
        </div>
    )
}

export function getStaticProps() { // run server side 
    return {
        props: {
            airdrops
        }
    }
}