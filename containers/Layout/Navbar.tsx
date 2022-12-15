import Link from "next/link";
import { Flex } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

export const Navbar = () => {
    return (
        <Flex align="space-between" justify="end" gap={6} m={12}>
            <Text as='b'><Link href="/">Home</Link></Text>
            <Text as='b'><Link href="/MyDrops">My Drops</Link></Text>
            <Text as='b'><Link href="/Create">Create</Link></Text>
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

            >
                Connect
            </Button>
        </Flex>
    )
}