import { Grid } from "@chakra-ui/react";
import { AirdropCard } from "./airdrop/AirdropCard";
import { useGetAirdropHashes } from "../hooks/useGetAirdropHashes";
import { AiropCardBody } from "./airdrop/AirdropCardBody";

export const Home = () => {
  const { airdropHashes } = useGetAirdropHashes();

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} m={24}>
      {airdropHashes?.map((hash) => (
        <AirdropCard hash={hash} key={hash}>
          <AiropCardBody hash={hash} />
        </AirdropCard>
      ))}
      {!airdropHashes?.length && "No airdrops created yet"}
    </Grid>
  );
};

export default Home;
