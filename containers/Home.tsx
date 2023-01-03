import { Airdrop } from "../types/Airdrop";
import { Card, CardHeader, CardBody, Heading, Box, Text, Button, Center } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'
import { useContractReads, useAccount } from 'wagmi'
import { iotexTestnet } from "wagmi/chains";
import { useRouter } from "next/router";
import { useSignMessage } from 'wagmi'

interface Homeprops {
    airdrops: Airdrop[]
}

export const Home = ({ airdrops }: Homeprops) => {

    // format the coordinates received from the contract
    function scaleCoordinatesDown(coordInput: number) {
        const result = coordInput / Math.pow(10, 6)
        return result
    }

    function formatDate(input: number) {
        let date = new Date(input * 1000).toLocaleDateString()
        return date;
    }



    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} m={24}>
            {
                airdrops?.map((airdrop, i) => (
                    <Card
                        key={i}
                        maxW='sm'
                        _hover={{
                            bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                            color: 'white'
                        }}
                        boxShadow='inner'
                    >
                        <CardHeader>
                            <Heading
                                size='md'
                                as='b'
                            >
                                <Center>
                                    Air Drop {i}
                                </Center>
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Tokens Left: {Number(airdrop.tokens_count) - Number(airdrop.tokens_minted)} of {airdrop.tokens_count}
                                </Heading>

                                <Text pt='2' fontSize='sm' textTransform='uppercase' >
                                    Latitude: {scaleCoordinatesDown(Number(airdrop.lat))}
                                </Text>
                                <Text pt='2' fontSize='sm' textTransform='uppercase' >
                                    Longitude: {scaleCoordinatesDown(Number(airdrop.long))}
                                </Text>
                                <Text pt='2' fontSize='sm' textTransform='uppercase' >
                                    Distance: {airdrop.max_distance} meters
                                </Text>
                                <Text pt='2' fontSize='sm' textTransform='uppercase' >
                                    From: {formatDate(Number(airdrop.time_from))}
                                </Text>
                                <Text pt='2' fontSize='sm' textTransform='uppercase' >
                                    To: {formatDate(Number(airdrop.time_to))}
                                </Text>

                                <Center>
                                    <ClaimVerifier airdrop={airdrop} />
                                </Center>

                            </Box>
                        </CardBody>

                    </Card>
                ))
            }
        </Grid>
    )
}


const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
    const router = useRouter()
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, signMessage } = useSignMessage({
        onSuccess: async (data, variables) => {
            const response = await fetch(`https://geo-test.w3bstream.com/api/pol`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "signature": data,
                    "message": variables.message,
                    "owner": address,
                    "locations": [
                        {
                            "scaled_latitude": Number(airdrop.lat),
                            "scaled_longitude": Number(airdrop.long),
                            "distance": airdrop.max_distance,
                            "from": Number(airdrop.time_from),
                            "to": Number(airdrop.time_to)
                        }
                    ]
                })
            })
            console.log("response", await response.json())
            console.log("data", data)
            console.log("variables", variables)
        },
    })

    async function handleClaim() {
        const message = JSON.stringify({
            domain: `http://localhost:3000/`,
            address: address,
            statement: `Sign in Location Based NFT The application will know if you were located in one of the following regions in the time range below:${Number(airdrop.lat)}, ${Number(airdrop.long)}, ${airdrop.max_distance}, ${Number(airdrop.time_from)}, ${Number(airdrop.time_to)}  `,
            uri: `http://localhost:3000${router.asPath}`,
            version: "1",
            chainId: iotexTestnet.id,
            expirationTime: Date.now().toString()
        });
        signMessage({ message })
    }

    return (
        <Button
            size='xs'
            as='button'
            color='white'
            fontWeight='bold'
            borderRadius='md'
            border='1px'
            borderColor='white'
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            _hover={{
                bgGradient: 'linear(red.100 0%, orange.100 25%, yellow.100 50%)',
                color: 'black'
            }}
            mt={12}
            onClick={() => handleClaim()}
        >
            Claim
        </Button>
    )
}


