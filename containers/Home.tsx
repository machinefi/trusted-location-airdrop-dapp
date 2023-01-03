import { Airdrop } from "../types/Airdrop";
import { Card, CardHeader, CardBody, Heading, Box, Text, Button, Center } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'

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

    async function handleClaim() {
        const response = await fetch(`https://geo-test.w3bstream.com/api/pol`, {
            method: "POST",
            // headers: {
            //     "content-type": "application/json"
            // },
            body: JSON.stringify({
                "signature": "string",
                "message": "string",
                "owner": "0x954a4668f429C1A651aa8E0dF08C586B1272AEF6",
                "locations": [
                    {
                        "scaled_latitude": 4131637,
                        "scaled_longitude": 10168213,
                        "distance": 1000,
                        "from": 1669703481,
                        "to": 1669706481
                    }
                ]
            })
        })
        console.log("response", response)
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
                                        onClick={()=> handleClaim()}
                                    >
                                        Claim
                                    </Button>
                                </Center>

                            </Box>
                        </CardBody>

                    </Card>
                ))
            }
        </Grid>
    )
}


// interface Homeprops {
//     airdrops: Airdrop[]
// }

// export const Home = ({ airdrops }: Homeprops) => {

//     // format the coordinates received from the contract
//     function scaleCoordinatesDown(coordInput: number) { 
//         const result = coordInput / Math.pow(10, 6)
//         return result
//     }

//     return (
//         <Grid templateColumns='repeat(3, 1fr)' gap={6} m={24}>
//             {
//                 airdrops.map((airdrop) => (
//                     <Card
//                         key={airdrop.id}
//                         maxW='sm'
//                         _hover={{
//                             bgGradient: 'linear(to-l, #7928CA, #FF0080)',
//                             color: 'white'
//                         }}
//                         boxShadow='inner'
//                     >
//                         <CardHeader>
//                             <Heading
//                                 size='md'
//                                 as='b'
//                             >
//                                 <Center>
//                                     Air Drop {airdrop.id}
//                                 </Center>
//                             </Heading>
//                         </CardHeader>
//                         <CardBody>
//                             <Box>
//                                 <Heading size='xs' textTransform='uppercase'>

//                                     {airdrop.title}
//                                 </Heading>

//                                 <Text pt='2' fontSize='sm' noOfLines={3}>
//                                     {airdrop.description}
//                                 </Text>
//                                 <Center>
//                                     <Button
//                                         size='xs'
//                                         as='button'
//                                         color='white'
//                                         fontWeight='bold'
//                                         borderRadius='md'
//                                         border='1px'
//                                         borderColor='white'
//                                         bgGradient='linear(to-l, #7928CA, #FF0080)'
//                                         _hover={{
//                                             bgGradient: 'linear(red.100 0%, orange.100 25%, yellow.100 50%)',
//                                             color: 'black'
//                                         }}
//                                         mt={12}
//                                     >
//                                         Claim
//                                     </Button>
//                                 </Center>

//                             </Box>
//                         </CardBody>

//                     </Card>
//                 ))
//             }
//         </Grid>
//     )
// }


