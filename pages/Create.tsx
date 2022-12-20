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
import { usePrepareSendTransaction } from 'wagmi'
import { utils } from 'ethers'
import { LocationNFTAddress, LogicContractAddress } from "../config/addresses"
import LocationNFT from "../artifacts/contracts/LocationNFT.sol/LocationNFT.json";
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"



export default function Create() {

    const router = useRouter();
    const [postingFee, setPostingFee] = useState(null);
    const [formInput, setFormInput] = useState({
        lat: null,
        long: null,
        max_distance: null,
        time_from: null,
        time_to: null,
        tokens_count: null
    })

    function _calculateFee(tokens_count: number) {
        // formula: BASE_FEE*(1+ K*log(NFT_COUNT))
        const fee = tokens_count * 5; // Need to apply the actual formula 
        setPostingFee(fee);
    }

    function _formatDate(dateInput: Date) {
        const date = new Date(dateInput);
        const milliseconds = date.getTime();
        return milliseconds;
    }

    async function submitForm() {
        const { lat, long, max_distance, time_from, time_to, tokens_count } = formInput;

        // format lat long and dates
        const timeFrom = _formatDate(time_from);
        const timeTo = _formatDate(time_to);

        // get fee
        const fee = _calculateFee(tokens_count);

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
                <Input type='number' mb={4} placeholder='41.40338, 2.17403' onChange={(e) => setFormInput({ ...formInput, lat: e.target.value })} />

                <FormLabel>Longitude</FormLabel>
                <Input type='number' mb={4} placeholder='41.40338, 2.17403' onChange={(e) => setFormInput({ ...formInput, long: e.target.value })} />

                <FormLabel>Max Distance (meters)</FormLabel>
                <Input type='number' mb={4} placeholder='200' onChange={(e) => setFormInput({ ...formInput, max_distance: e.target.value })} />

                <FormLabel>Time From</FormLabel>
                <Input type='date' mb={4} onChange={(e) => setFormInput({ ...formInput, time_from: e.target.value })} />

                <FormLabel>Time To</FormLabel>
                <Input type='date' mb={4} onChange={(e) => setFormInput({ ...formInput, time_to: e.target.value })} />

                <FormLabel>Tokens Count</FormLabel>
                <Input type='number' placeholder='7' onChange={(e) => setFormInput({ ...formInput, tokens_count: e.target.value })} />
                <FormHelperText mb={6} >Specify how many tokens you would like to create</FormHelperText>

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
                    mb={12}
                    onClick={submitForm}
                >
                    Submit
                </Button>

            </FormControl>
        </div>
    )
}