import { Card, CardHeader, CardBody, Heading, Box, Text, Center } from '@chakra-ui/react'
import { useGetAirdropInfo } from '../hooks/useGetAirdropInfo'

export const PersonalDropsCard = ({ hash }: { hash: string }) => {
    const myDrop = useGetAirdropInfo(hash)
   
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
        <Card
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
                        Air Drop
                    </Center>
                </Heading>
            </CardHeader>
            <CardBody>
                <Box>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Latitude: {myDrop ? scaleCoordinatesDown(Number(myDrop.lat)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Longitude: {myDrop ? scaleCoordinatesDown(Number(myDrop.long)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Distance: {myDrop ? `${myDrop.max_distance} meters` : `loading`}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        From: {myDrop ? formatDate(Number(myDrop.time_from)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        To: {myDrop ? formatDate(Number(myDrop.time_to)) : "loading"}
                    </Text>
                </Box>
            </CardBody>

        </Card>

    )
}

// import { Airdrop } from "../types/Airdrop";
// import { Card, CardHeader, CardBody, Heading, Box, Text, Center } from '@chakra-ui/react'
// import { Grid } from '@chakra-ui/react'

// interface Homeprops {
//     airdrops: Airdrop[]
// }

// export const PersonalDropsCard = ({ airdrops }: Homeprops) => {

//     // format the coordinates received from the contract
//     function scaleCoordinatesDown(coordInput: number) {
//         const result = coordInput / Math.pow(10, 6)
//         return result
//     }

//     function formatDate(input: number) {
//         let date = new Date(input * 1000).toLocaleDateString()
//         return date;
//     }

//     return (
//         <Grid templateColumns='repeat(3, 1fr)' gap={6} m={24}>
//             {
//                 airdrops?.map((airdrop, i) => (
//                     <Card
//                         key={i}
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
//                                     Air Drop {i}
//                                 </Center>
//                             </Heading>
//                         </CardHeader>
//                         <CardBody>
//                             <Box>
//                                 <Text pt='2' fontSize='sm' textTransform='uppercase' >
//                                     Latitude: {scaleCoordinatesDown(Number(airdrop.lat))}
//                                 </Text>
//                                 <Text pt='2' fontSize='sm' textTransform='uppercase' >
//                                     Longitude: {scaleCoordinatesDown(Number(airdrop.long))}
//                                 </Text>
//                                 <Text pt='2' fontSize='sm' textTransform='uppercase' >
//                                     Distance: {airdrop.max_distance} meters
//                                 </Text>
//                                 <Text pt='2' fontSize='sm' textTransform='uppercase' >
//                                     From: {formatDate(Number(airdrop.time_from))}
//                                 </Text>
//                                 <Text pt='2' fontSize='sm' textTransform='uppercase' >
//                                     To: {formatDate(Number(airdrop.time_to))}
//                                 </Text>
//                             </Box>
//                         </CardBody>

//                     </Card>
//                 ))
//             }
//         </Grid>
//     )
// }