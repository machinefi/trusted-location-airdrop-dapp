import { Text, Center } from '@chakra-ui/react'
import { myAirdrops } from "../airdrops";
import { Airdrop } from "../types/Airdrop";
import { Home } from "../containers/Home";

interface Homeprops {
    myAirdrops: Airdrop[]
}

export default function MyDrops({ myAirdrops }: Homeprops) {
    return (
        <div>
            <Center>
                <Text
                    fontSize='4xl'
                    mb={12}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    as='b'
                >
                    My Airdrops</Text>
            </Center>

            <Home airdrops={myAirdrops} />
        </div>
    )
}

export function getStaticProps() { // run server side 
    return {
        props: {
            myAirdrops
        }
    }
}