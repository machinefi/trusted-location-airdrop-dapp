import { Text } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { ConnectButton } from "./ConnectButton"


const UserWallet = () => {
    const { address, isConnected } = useAccount()

    return (
        <div>
            {
                isConnected
                    ?
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        as='b'
                    >{address?.substring(0, 5)}..{address?.substring(address.length - 2)}</Text>
                    :
                    <ConnectButton />
            }
        </div>
    )
}

export default UserWallet;