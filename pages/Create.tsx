import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import { Text, Button, Center, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { useContractReads, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { LogicContractAddress } from "../config/addresses"
import LogicContract from "../artifacts/contracts/Logic.sol/Logic.json"



export default function Create() {

    const [formInput, setFormInput] = useState({
        lat: null,
        long: null,
        max_distance: null,
        time_from: null,
        time_to: null,
        tokens_count: null
    })
    const { lat, long, max_distance, time_from, time_to } = formInput;
    const [tokens, setTokens] = useState(0);

    const logicContract = {
        address: LogicContractAddress,
        abi: LogicContract.abi,
    } 

    const { data: airdropFee } = useContractReads({
        contracts: [
            {
                ...logicContract,
                functionName: "calculateFee",
                args: [tokens],
                chainId: 4690,
            }
        ]
    })

    const { config } = usePrepareContractWrite({
        address: LogicContractAddress,
        abi: LogicContract.abi,
        functionName: 'addAirDrop',
        chainId: 4690,
        args: [
            scaleCoordinatesUp(Number(lat)), 
            scaleCoordinatesUp(Number(long)), 
            Number(max_distance), 
            _formatDate(time_from), 
            _formatDate(time_to), 
            tokens
        ],
        overrides: {
            value: Number(airdropFee?.toString()),
          },
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    const router = useRouter();

    useEffect(() => {
        console.log("feeResult", airdropFee?.toString())
        console.log("scaled lat", scaleCoordinatesUp(Number(lat)))
        console.log("write", write)
    }, [tokens])

    // format date in seconds
    function _formatDate(dateInput: Date) {
        const date = new Date(dateInput);
        const timestamp = date.getTime();
        return timestamp;
    }

    // format the coordinates to send to the contract
    function scaleCoordinatesUp(coordInput: number) { // send to the contract
        const result = Math.round(coordInput * Math.pow(10, 6))
        return result
    }



    async function submitForm() {


        // format data
        const timeFrom = _formatDate(time_from);
        const timeTo = _formatDate(time_to);
        const distance = Number(max_distance);
        const latitude = scaleCoordinatesUp(Number(lat));
        const longitude = scaleCoordinatesUp(Number(long));

        // get fee
        const fee = Number(airdropFee?.toString())

        // call the contract with formInput && postingFee
        // to be implemented


        // re-route home 
        // router.push("/");

    }

    return (
        <Container>
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
                    disabled={!write}
                    onClick={() => write?.()}
                >
                    Submit
                </Button>

            </FormControl>
        </Container>
    )
}