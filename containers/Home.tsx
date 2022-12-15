import { Airdrop } from "../types/Airdrop";
import { Card, CardHeader, CardBody, Heading, Box, Text } from '@chakra-ui/react'
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
                            <Heading size='md'>Air Drop</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    {airdrop.title}
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {airdrop.description}
                                </Text>
                            </Box>
                        </CardBody>

                    </Card>
                ))
            }
        </Grid>
    )
}


