import { useClaimDrop } from "../hooks/useClaimDrop";
import { Button, ButtonProps, Spinner } from "@chakra-ui/react";
import { VerifiedLocation } from "../types/VerifiedLocation";

type ClaimButtonProps = {
    isReadyToClaim: boolean,
    verifiedLocations: VerifiedLocation[],
}

export const ClaimButton = ({isReadyToClaim, verifiedLocations, ...rest} : ClaimButtonProps & ButtonProps) => {
    const { isLoading, isSuccess, isError, claimAirdrop } = useClaimDrop({
        scaled_latitude: isReadyToClaim ? verifiedLocations[0].scaled_latitude : 0,
        scaled_longitude: isReadyToClaim
            ? verifiedLocations[0].scaled_longitude
            : 0,
        distance: isReadyToClaim ? verifiedLocations[0].distance : 0,
        from: isReadyToClaim ? verifiedLocations[0].from : 0,
        to: isReadyToClaim ? verifiedLocations[0].to : 0,
        devicehash: isReadyToClaim ? verifiedLocations[0].devicehash : "",
        signature: isReadyToClaim ? verifiedLocations[0].signature : "",
        isReadyToClaim,
    });

    function handleClaim() {
        claimAirdrop?.()
    }

    if (isError) {
        return (
            <Button
            {...rest}
            isDisabled={true}
            >
                Unable to Claim
            </Button>
        )
    }

    return (
        <Button
            onClick={handleClaim}
            {...rest}
        >
            {isLoading ? <Spinner size="xs" /> : `Claim Your NFT`}
        </Button>
    )
}





