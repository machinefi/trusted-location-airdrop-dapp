import { Box } from "@chakra-ui/react";
import { useGetAirdropInfo } from "../../hooks/useGetAirdropInfo";
import { AirdropInfo } from "./AirdropInfo";

export const PersonalDropCardBody = ({ hash }: { hash: string }) => {
  const myDrop = useGetAirdropInfo(hash);

  if (!myDrop) {
    return null;
  }

  return (
    <Box>
      <AirdropInfo airdrop={myDrop} />
    </Box>
  );
};
