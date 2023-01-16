import { Card, CardHeader, CardBody, Heading, Box, Text, Button, Center } from '@chakra-ui/react'
import { useContractRead } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"
import { ClaimVerifier } from './ClaimVerifier'
import { useEffect, useState } from 'react'
import { Airdrop } from "../types/Airdrop";

export const AirdropCard = ({ hash }: { hash: string }) => {

    const [properDrop, setProperDrop] = useState<Airdrop | undefined>()

    const logicContract = {
        address: LogicContractAddress,
        abi: LogicContract.abi,
    }

    useContractRead({
        ...logicContract,
        functionName: "airDrops",
        args: [hash], 
        onSuccess: (airdrop)=> {
            const properAirdrop:Airdrop = {
                lat: airdrop[0].toString(),
                long: airdrop[1].toString(),
                max_distance: airdrop[2].toString(),
                time_from: airdrop[3].toString(),
                time_to: airdrop[4].toString(),
                tokens_count: airdrop[5].toString(),
                tokens_minted: airdrop[6].toString(),
            }
            setProperDrop(properAirdrop)
        }
    })

    // format the coordinates received from the contract
    function scaleCoordinatesDown(coordInput: number) {
        const result = coordInput / Math.pow(10, 6)
        return result
    }

    // format date
    function formatDate(input: number) {
        let date = new Date(input * 1000).toLocaleDateString()
        return date;
    }

    useEffect(()=> {
        console.log("data", properDrop)
    }, [properDrop])

    return (
        <Card
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
                        Air Drop 
                    </Center>
                </Heading>
            </CardHeader>
            {/* <CardBody>
                <Box>

                    <Heading size='xs' textTransform='uppercase'>
                        Tokens Left: {properDrop ? `${Number(properDrop.tokens_count) - Number(properDrop.tokens_minted)} of ${properDrop.tokens_count}` : `loading`}
                    </Heading>

                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Latitude: {properDrop ? scaleCoordinatesDown(Number(properDrop.lat)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Longitude: {properDrop ? scaleCoordinatesDown(Number(properDrop.long)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Distance: {properDrop ? `${properDrop.max_distance} meters` : `loading`}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        From: {properDrop ? formatDate(Number(properDrop.time_from)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        To: {properDrop ? formatDate(Number(properDrop.time_to)) : "loading"}
                    </Text>

                    <Center>
                        <ClaimVerifier airdrop={airdrop} />
                    </Center>

                </Box>
            </CardBody> */}

        </Card>
    )
}

export default AirdropCard;
