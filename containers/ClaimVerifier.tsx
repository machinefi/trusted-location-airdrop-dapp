import { useSignMessage, useAccount } from 'wagmi'
import axios from "axios";
import { useEffect, useState } from "react";
import { useClaimDrop } from "../hooks/useClaimDrop";
import { VerifiedLocation } from "../types/VerifiedLocation";
import moment from "moment";
import { Airdrop } from "../types/Airdrop";
import { SiweMessage } from "siwe";
import { iotexTestnet } from "wagmi/chains";
import { Button, Spinner } from '@chakra-ui/react'
import { Location } from "../types/Location";
import { ConnectButton } from "./User/ConnectButton";
import { formatDate } from "../utils/formatDate";
import { scaleCoordinatesDown } from "../utils/scaleCoordinates";

const GEOSTREAM_API = "https://geo-test.w3bstream.com/api/pol";

function createSiweMessage(
    address: string,
    latitude: string,
    longitude: string,
    distance: string,
    from: string,
    to: string
) {
    const message = new SiweMessage({
        domain: globalThis.location.host,
        address: address,
        statement: `The application will know if you were located in the following region with latitude: ${scaleCoordinatesDown(Number(latitude))}, longitude: ${scaleCoordinatesDown(Number(longitude))}, and within a maximum distance of ${Number(distance)} meters, between ${formatDate(Number(from))}, and ${formatDate(Number(to))}`,
        uri: globalThis.location.origin,
        version: "1",
        chainId: iotexTestnet.id,
        expirationTime: moment().add(5, "minutes").toISOString(),
    })
    return message.prepareMessage();
}

export const ClaimVerifier = ({ airdrop }: { airdrop: Airdrop }) => {
    const { address, isConnected } = useAccount()

    const [verifiedLocations, setVerifiedLocations] = useState<VerifiedLocation[]>([]);
    const [isReadyToClaim, setIsReadyToClaim] = useState(false);

    const { isLoading, isSuccess, claimAirdrop } = useClaimDrop({
        scaled_latitude: isReadyToClaim ? verifiedLocations[0].scaled_latitude : 0,
        scaled_longitude: isReadyToClaim ? verifiedLocations[0].scaled_longitude : 0,
        distance: isReadyToClaim ? verifiedLocations[0].distance : 0,
        from: isReadyToClaim ? verifiedLocations[0].from : 0,
        to: isReadyToClaim ? verifiedLocations[0].to : 0,
        devicehash: isReadyToClaim ? verifiedLocations[0].devicehash : "",
        signature: isReadyToClaim ? verifiedLocations[0].signature : "",
        isReadyToClaim
    })

    useEffect(() => {
        if (isReadyToClaim) {
            setTimeout(() => {
                claimAirdrop?.()
            }, 8000)
        }
    }, [isReadyToClaim])

    const locations: Location[] = [
        {
            scaled_latitude: Number(airdrop.lat),
            scaled_longitude: Number(airdrop.long),
            distance: Number(airdrop.max_distance),
            from: airdrop.time_from,
            to: airdrop.time_to
        }
    ]

    const { signMessage } = useSignMessage({
        onSuccess: async (data, variables) => {
            await queryPolAPI(locations, address as `0x${string}`, data, variables.message)
        }
    })

    async function queryPolAPI(
        locations: Location[],
        address: string,
        signature: string,
        message: string | Uint8Array
    ) {
        const body = {
            signature,
            message,
            owner: address,
            locations,
        };
        console.log(`Querying GeoStream API with body: `, body);
        console.log(`Querying GeoStream API with endpoint: `, GEOSTREAM_API);

        const response = await axios.post(GEOSTREAM_API, body).catch((error) => {
            console.log(`Querying GeoStream API failed with error: ${error}.`);
            console.log("Endpoint: ", GEOSTREAM_API);
            console.log("Body: ", body);
        });
        console.log(`Query result.`, response);
        if (typeof response === "object" && response.data.result.data.length > 0) {
            setVerifiedLocations([...response.data.result.data])
            setIsReadyToClaim(true)
        } else {
            setVerifiedLocations([])
            setIsReadyToClaim(false)
        }
    }

    function handleClaim() {
        if (!address) return
        let message = createSiweMessage(
            address,
            airdrop.lat,
            airdrop.long,
            airdrop.max_distance,
            airdrop.time_from,
            airdrop.time_to
        );
        signMessage({ message })
    }

    if (!isConnected) {
        return <ConnectButton />
    }

    return (
        <Button
            size='xs'
            as='button'
            color='white'
            fontWeight='bold'
            borderRadius='md'
            border='1px'
            borderColor='white'
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            _hover={{
                bgGradient: 'linear(red.100 0%, orange.100 25%, yellow.100 50%)',
                color: 'black'
            }}
            mt={12}
            disabled={isLoading || isSuccess}
            onClick={handleClaim}
        >
            {
                isLoading ? <Spinner size='xs' /> : `Claim`
            }
            {
                isSuccess && ` (Success)`
            }
        </Button>
    )
}
