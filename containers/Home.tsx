import { Airdrop } from "../types/Airdrop";
import { Card, CardHeader, CardBody, Heading, Box, Text, Button, Center } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'
import { useContractReads, useAccount } from 'wagmi'
import { iotexTestnet } from "wagmi/chains";
import { useRouter } from "next/router";
import { useSignMessage } from 'wagmi'
import { SiweMessage } from "siwe";
import axios from "axios";
import moment from "moment";

interface Homeprops {
    airdrops: Airdrop[]
}

const GEOSTREAM_API = "https://geo-test.w3bstream.com/api/pol";

// format the coordinates received from the contract
function scaleCoordinatesDown(coordInput: number) {
    const result = coordInput / Math.pow(10, 6)
    return result
}

// format date
function formatDate(input: number) {
    let date = new Date(input * 1000).toLocaleDateString()
    return date;
}

export const Home = ({ airdrops }: Homeprops) => {

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

function createSiweMessage(
    address: string,
    latitude: string,
    longitude: string,
    distance: string,
    from: string,
    to: string
) {
    const message = new SiweMessage({
        domain: globalThis.location.host,
        address: address,
        statement: `The application will know if you were located in the following region with latitude: ${scaleCoordinatesDown(Number(latitude))}, longitude: ${scaleCoordinatesDown(Number(longitude))}, and within a maximum distance of ${Number(distance)} meters, between ${formatDate(Number(from))}, and ${formatDate(Number(to))}`,
        uri: globalThis.location.origin,
        version: "1",
        chainId: iotexTestnet.id,
        expirationTime: moment().add(5, "minutes").toISOString(),
    })
    return message.prepareMessage();
}


const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
    const router = useRouter()
    const { address, isConnecting, isDisconnected } = useAccount()
    // const { data, signMessage } = useSignMessage({
    //     onSuccess: async (data, variables) => {
    //         const response = await fetch(`https://geo-test.w3bstream.com/api/pol`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 "signature": data,
    //                 "message": variables.message,
    //                 "owner": address,
    //                 "locations": [
    //                     {
    //                         "scaled_latitude": Number(airdrop.lat),
    //                         "scaled_longitude": Number(airdrop.long),
    //                         "distance": airdrop.max_distance,
    //                         "from": Number(airdrop.time_from),
    //                         "to": Number(airdrop.time_to)
    //                     }
    //                 ]
    //             })
    //         })

    //         // reproduce body just for logging it (will be erased later)
    //         const body = JSON.stringify({
    //             "signature": data,
    //             "message": variables.message,
    //             "owner": address,
    //             "locations": [
    //                 {
    //                     "scaled_latitude": Number(airdrop.lat),
    //                     "scaled_longitude": Number(airdrop.long),
    //                     "distance": airdrop.max_distance,
    //                     "from": Number(airdrop.time_from),
    //                     "to": Number(airdrop.time_to)
    //                 }
    //             ]
    //         })


    //         console.log("response", await response.json())
    //         console.log("data", data)
    //         console.log("variables", variables)
    //         console.log("body", body)
    //     },
    // })

    // async function handleClaim() {
    //     const message = JSON.stringify({
    // domain:  globalThis.location.host,
    // address: address,
    // statement: `The application will know if you were located in the following region with latitude: ${Number(airdrop.lat)}, longitude: ${Number(airdrop.long)}, and within a maximum distance of: ${Number(airdrop.max_distance)} meters, within the time range from: ${Number(airdrop.time_from)}, to: ${Number(airdrop.time_to)}`,
    // uri: globalThis.location.origin,
    // version: "1",
    // chainId: iotexTestnet.id,
    // expirationTime: (Date.now() + 60000).toString() // expiration in 1 minute
    //     });
    //     signMessage({ message })
    // }

    const locations = [
        {
            scaled_latitude: Number(airdrop.lat),
            scaled_longitude: Number(airdrop.long),
            distance: Number(airdrop.max_distance),
            from: airdrop.time_from,
            to: airdrop.time_to
        }
    ]

    const { data, signMessage } = useSignMessage({
        onSuccess: async (data, variables) => {
            console.log("locations: ", locations)
            console.log("address: ", address)
            console.log("signature: ", data)
            console.log("message: ", variables.message)
            const response = await QueryPolAPI(locations, address, data, variables.message)
            console.log("response", response)
        }
    })

    async function QueryPolAPI(
        locations,
        address: string,
        signature: string,
        message: string | Uint8Array
    ) {
        const body = {
            signature,
            message,
            owner: address,
            locations,
        };
        console.log(`Querying GeoStream API with body: `, body);
        console.log(`Querying GeoStream API with endpoint: `, GEOSTREAM_API);

        const response = await axios.post(GEOSTREAM_API, body).catch((error) => {
            console.log(`Querying GeoStream API failed with error: ${error}.`);
            console.log("Endpoint: ", GEOSTREAM_API);
            console.log("Body: ", body);
        });
        console.log(`Query result.`, response);
        if (typeof response === "object") {
            return response.data.result.data;
        }
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
            onClick={() => {
                let message = createSiweMessage(
                    address,
                    airdrop.lat,
                    airdrop.long,
                    airdrop.max_distance,
                    airdrop.time_from,
                    airdrop.time_to
                );
                signMessage({ message })
            }}
        >
            Claim
        </Button>
    )
}


