import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import { Text, Button, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useDebounce } from 'use-debounce'
import { usePrepareSendTransaction, useContractRead } from 'wagmi'
import { utils } from 'ethers'
import { LocationNFTAddress, LogicContractAddress } from "../config/addresses"
import LocationNFT from "../artifacts/contracts/LocationNFT.sol/LocationNFT.json";
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"



export default function Create() {

    const [tokens, setTokens] = useState(0);
    const contractRead = useContractRead({
        address: LogicContractAddress,
        abi: LogicContract.abi,
        functionName: 'calculateFee',
        args: [1],
        chainId: 4690,
        onError: ((error)=> {
            console.log("read-hook error", error)
            console.log("tokens", tokens)
        })
    })

    useEffect(()=> {
        console.log("feeResult", contractRead)
        console.log("logic abi", LogicContract.abi)
    }, [])

    const router = useRouter();

    const [formInput, setFormInput] = useState({
        lat: null,
        long: null,
        max_distance: null,
        time_from: null,
        time_to: null,
        tokens_count: null
    })

    function _formatDate(dateInput: Date) {
        const date = new Date(dateInput);
        const timestamp = date.getTime();
        return timestamp;
    }

    function scaleCoordinatesUp(coordInput: number) { // send to the contract
        const result = Math.round(coordInput * Math.pow(10, 6))
        return result
    }

    function scaleCoordinatesDown(coordInput: number) { // receive from the contract
        const result = coordInput / Math.pow(10, 6)
        return result
    }

    async function submitForm() {
        const { lat, long, max_distance, time_from, time_to, tokens_count } = formInput;

        // format lat long and dates
        const timeFrom = _formatDate(time_from);
        const timeTo = _formatDate(time_to);

        // get fee
        const data = await contractRead.data
        console.log("data", data)

        // call the contract with formInput && postingFee

        router.push("/");

    }

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
                <Input type='number' placeholder='-41.123456' onChange={(e) => setFormInput({ ...formInput, lat: e.target.value })} />
                <FormHelperText mb={6} >Enter a value between -90 and 90</FormHelperText>
                <FormLabel>Longitude</FormLabel>
                <Input type='number' placeholder='-12.123456' onChange={(e) => setFormInput({ ...formInput, long: e.target.value })} />
                <FormHelperText mb={6} >Enter a value between -180 and 180</FormHelperText>
                <FormLabel>Max Distance (meters)</FormLabel>
                <Input type='number' mb={4} placeholder='200' onChange={(e) => setFormInput({ ...formInput, max_distance: e.target.value })} />

                <FormLabel>Time From</FormLabel>
                <Input type='date' mb={4} onChange={(e) => setFormInput({ ...formInput, time_from: e.target.value })} />

                <FormLabel>Time To</FormLabel>
                <Input type='date' mb={4} onChange={(e) => setFormInput({ ...formInput, time_to: e.target.value })} />

                <FormLabel>Tokens Count</FormLabel>
                <Input type='number' placeholder='7' onChange={(e) => {
                    setFormInput({ ...formInput, tokens_count: e.target.value })
                    setTokens(Number(e.target.value))
                }} />
                <FormHelperText mb={6} >Specify how many tokens you would like to create for this Airdrop</FormHelperText>

                <Button
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
                    mb={12}
                    onClick={submitForm}
                >
                    Submit
                </Button>

            </FormControl>
        </div>
    )
}