import { Button, Text } from "@chakra-ui/react"
import { useAccount, useConnect, useEnsName } from "wagmi"

const UserWallet = () => {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()

    return (
        <div>
            {
                isConnected
                    ?
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        as='b'
                    >{address?.substring(0, 5)}..{address?.substring(address.length-2)}</Text>
                    :
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
            }
        </div>
    )
}

export default UserWallet;