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

    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {
                airdrops.map((airdrop) => (
                    <Card
                        key={airdrop.id}
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
                                    Air Drop {airdrop.id}
                                </Center>
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>

                                    {airdrop.title}
                                </Heading>

                                <Text pt='2' fontSize='sm' noOfLines={3}>
                                    {airdrop.description}
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


