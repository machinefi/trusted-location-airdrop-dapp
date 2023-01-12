import { Card, CardHeader, CardBody, Heading, Box, Text, Button, Center } from '@chakra-ui/react'
import { useContractRead } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"
import { ClaimVerifier } from './ClaimVerifier'
import { useEffect, useState } from 'react'

export const AirdropCard = ({ hash }: { hash: string }) => {

    const logicContract = {
        address: LogicContractAddress,
        abi: LogicContract.abi,
    }

    const { data: airdrop } = useContractRead({
        ...logicContract,
        functionName: "airDrops",
        args: [hash], 
        // onSuccess: (airdrop)=> {
        //     const proper = {

        //     }
        //     setProper(proper)
        // }
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
        console.log("data", airdrop)
    }, [airdrop])

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
                        Tokens Left: {airdrop ? `${Number(airdrop.tokens_count) - Number(airdrop.tokens_minted)} of ${airdrop.tokens_count}` : `loading`}
                    </Heading>

                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Latitude: {airdrop ? scaleCoordinatesDown(Number(airdrop.lat)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Longitude: {airdrop ? scaleCoordinatesDown(Number(airdrop.long)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        Distance: {airdrop ? `${airdrop.max_distance} meters` : `loading`}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        From: {airdrop ? formatDate(Number(airdrop.time_from)) : "loading"}
                    </Text>
                    <Text pt='2' fontSize='sm' textTransform='uppercase' >
                        To: {airdrop ? formatDate(Number(airdrop.time_to)) : "loading"}
                    </Text>

                    <Center>
                        <ClaimVerifier airdrop={airdrop} />
                    </Center>

                </Box>
            </CardBody> */}

        </Card>
    )
}