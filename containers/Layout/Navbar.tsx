import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";

const UserWallet = dynamic(() => import("../User/UserWallet"), { ssr: false });

export const Navbar = () => {
    return (
        <div>
             <Flex align="space-between" justify="center" gap={6} m={12}>
                <Text as='b'><Link href="/">Home</Link></Text>
                <Text as='b'><Link href="/MyDrops">My Drops</Link></Text>
                <Text as='b'><Link href="/Create">Create</Link></Text>
                <UserWallet />
            </Flex>
        </div>
    )
}
