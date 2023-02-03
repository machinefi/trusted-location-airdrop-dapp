import { Box, Center, Heading } from "@chakra-ui/react";
import { useGetAirdropInfo } from "../../hooks/useGetAirdropInfo";
import { ClaimVerifier } from "../ClaimVerifier";
import { AirdropInfo } from "./AirdropInfo";

export const AiropCardBody = ({ hash }: { hash: string }) => {
  const airdrop = useGetAirdropInfo(hash);

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Tokens Left:{" "}
        {airdrop
          ? `${
              Number(airdrop.tokens_count) - Number(airdrop.tokens_minted)
            } of ${airdrop.tokens_count}`
          : `loading`}
      </Heading>

      {airdrop && <AirdropInfo airdrop={airdrop} />}

      <Center>{!!airdrop && <ClaimVerifier airdrop={airdrop} />}</Center>
    </Box>
  );
};
