import Link from "next/link";
import { Flex, Text, Box } from "@chakra-ui/react"
import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const Navbar = () => {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    return (
        <div>
            {
                isConnected
                    ?
                    <Flex align="space-between" justify="center" gap={6} m={12}>
                        <Text as='b'><Link href="/">Home</Link></Text>
                        <Text as='b'><Link href="/myDrops">My Drops</Link></Text>
                        <Text as='b'><Link href="/create">Create</Link></Text>
                        <Text
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            bgClip='text'
                            as='b'
                        >{ensName ?? address?.substring(0, 5)}..{address?.substring(address.length-2)}</Text>
                    </Flex>
                    :
                    <Flex align="space-between" justify="center" gap={6} m={12}>
                        <Text as='b'><Link href="/">Home</Link></Text>
                        <Text as='b'><Link href="/myDrops">My Drops</Link></Text>
                        <Text as='b'><Link href="/create">Create</Link></Text>
                        <Button
                            size='xs'
                            as='button'
                            color='white'
                            fontWeight='bold'
                            borderRadius='md'
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            _hover={{
                                bgGradient:'linear(red.100 0%, orange.100 25%, yellow.100 50%)',
                                color: 'black'
                            }}
                            onClick={() => connect()}

                        >
                            Connect
                        </Button>
                    </Flex>

            }
        </div>
    )
}
