import { Airdrop } from "../types/Airdrop";
import { Card, CardHeader, CardBody, Heading, Box, Text, Button, color } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'

interface Homeprops {
    airdrops: Airdrop[]
}

export const Home = ({ airdrops }: Homeprops) => {

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
                            >Air Drop</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    {airdrop.title}
                                </Heading>
                                <Text pt='2' fontSize='sm' noOfLines={3}>
                                    {airdrop.description}
                                </Text>
                                <Button
                                    size='xs'
                                    as='button'
                                    color='white'
                                    fontWeight='bold'
                                    borderRadius='md'
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    _hover={{
                                        background: 'white',
                                        color: 'black'
                                    }}
                                    mt={12}

                                >
                                    Claim
                                </Button>
                            </Box>
                        </CardBody>

                    </Card>
                ))
            }
        </Grid>
    )
}


