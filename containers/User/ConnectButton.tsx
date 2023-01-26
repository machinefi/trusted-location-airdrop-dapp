import { Button, ButtonGroup } from "@chakra-ui/react"
import { useConnect } from "wagmi"

export const ConnectButton = () => {
    const { connect, connectors } = useConnect()

    return (
        <ButtonGroup>
            {
                connectors.map((connector) => (
                    <Button
                        key={connector.id}
                        size='xs'
                        as='button'
                        color='white'
                        fontWeight='bold'
                        borderRadius='md'
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        _hover={{
                            bgGradient: 'linear(red.100 0%, orange.100 25%, yellow.100 50%)',
                            color: 'black'
                        }}
                        onClick={() => connect({ connector })}
                    >
                        Connect
                    </Button>
                ))
            }
        </ButtonGroup>
    )

}
