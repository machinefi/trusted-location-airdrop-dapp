import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import { Text, Button, Center } from '@chakra-ui/react'


export default function Create() {

    return (
        <div>
            <Center>
                <Text
                    fontSize='4xl'
                    mb={6}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    as='b'
                >Create an Airdrop</Text>
            </Center>

            <FormControl isRequired>
                <FormLabel>Latitude</FormLabel>
                <Input type='number' mb={4} placeholder='41.40338, 2.17403' />

                <FormLabel>Longitude</FormLabel>
                <Input type='number' mb={4} placeholder='41.40338, 2.17403' />

                <FormLabel>Max Distance (meters)</FormLabel>
                <Input type='number' mb={4} placeholder='200' />

                <FormLabel>Time From</FormLabel>
                <Input type='date' mb={4} />

                <FormLabel>Time To</FormLabel>
                <Input type='date' mb={4} />

                <FormLabel>Tokens Count</FormLabel>
                <Input type='number' placeholder='7' />
                <FormHelperText mb={6} >Specify how many tokens you would like to create</FormHelperText>

                <Button
                    size='xs'
                    as='button'
                    color='white'
                    fontWeight='bold'
                    borderRadius='md'
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    _hover={{
                        bgGradient: 'linear(to-r, red.500, yellow.500)',
                    }}
                    mb={12}
                >
                    Connect
                </Button>

            </FormControl>
        </div>
    )
}