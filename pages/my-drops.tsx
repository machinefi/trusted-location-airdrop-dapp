import { Text, Center, Card, CardBody } from '@chakra-ui/react'
import { myAirdrops } from "../airdrops";
import { Airdrop } from "../types/Airdrop";
import { PersonalDrops } from '../containers/PersonalDrops';
import { useContractReads, useAccount } from 'wagmi'
import { logicContractConfig } from '../hooks/hooksConfig';
import { useEffect } from 'react';

interface Homeprops {
    myAirdrops: Airdrop[]
}

export default function MyDrops({ myAirdrops }: Homeprops) {
    const { address, isConnecting, isDisconnected } = useAccount()

    const { data: airdropHashes } = useContractReads({

        contracts: [
            {
                ...logicContractConfig,
                functionName: "getAllHashes",
                chainId: 4690,
            }
        ]
    })

    const hashes: any = airdropHashes?.[0];

    const myHashes = hashes?.forEach((drop) => {
        let result: any = []
        const { data: isMyAirdrop } = useContractReads({
            contracts: [
                {
                    ...logicContractConfig,
                    functionName: "claimedAirDrops",
                    chainId: 4690,
                    args: [address, drop]
                }
            ]
        })

        if (isMyAirdrop?.[0]) {
            result.push(drop)
        }
        return result
    });

    myHashes?.forEach((drop) => {
        let result: any = []
        const { data: Airdrop } = useContractReads({
            contracts: [
                {
                    ...logicContractConfig,
                    functionName: "airDrops",
                    chainId: 4690,
                    args: [drop]
                }
            ]
        })
        result.push(Airdrop?.[0])
    });

    const myDrops = myHashes?.map((drop) => {
        const data = {
            lat: drop?.[0].toString(),
            long: drop?.[1].toString(),
            max_distance: drop?.[2].toString(),
            time_from: drop?.[3].toString(),
            time_to: drop?.[4].toString(),
            tokens_count: drop?.[5].toString(),
            tokens_minted: drop?.[6].toString()
        }
        return data
    })

    useEffect(() => {
        console.log("address", address)
        console.log("myDrops", myDrops)
    }, [])


    return (
        <div>
            {
                myDrops?.length > 0
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
                        <PersonalDrops airdrops={myDrops} />
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
                                    >You don&apos;t have any Airdrops yet</Text>
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