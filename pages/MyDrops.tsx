import { Text, Center, Card, CardBody } from '@chakra-ui/react'
import { myAirdrops } from "../airdrops";
import { Airdrop } from "../types/Airdrop";
import { PersonalDrops } from '../containers/PersonalDrops';

interface Homeprops {
    myAirdrops: Airdrop[]
}

export default function MyDrops({ myAirdrops }: Homeprops) {
    return (
        <div>
            {
                myAirdrops.length > 0
                    ?
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
                        <PersonalDrops airdrops={myAirdrops} />
                    </div>
                    :
                    <div>
                        <Center>
                            <Card
                                bgGradient='linear(to-l, #7928CA, #FF0080)'
                                align='center'
                                mt={24}
                            >
                                <CardBody>
                                    <Text

                                        fontSize='2xl'
                                        color='white'
                                        as='b'
                                    >You don't have any Airdrops yet</Text>
                                </CardBody>
                            </Card>

                        </Center>
                    </div>

            }

        </div>
    )
}

export function getStaticProps() {
    return {
        props: {
            myAirdrops
        }
    }
}