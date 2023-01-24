import { Card, CardHeader, CardBody, Heading, Box, Text, Center } from '@chakra-ui/react'
import { useGetAirdropInfo } from '../hooks/useGetAirdropInfo'
import { formatDate } from '../utils/formatDate'
import { scaleCoordinatesDown } from '../utils/scaleCoordinates'

export const PersonalDropsCard = ({ hash }: { hash: string }) => {
    const myDrop = useGetAirdropInfo(hash)

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
