import { Text, Center } from "@chakra-ui/react";
import { useGetAirdropHashes } from "../hooks/useGetAirdropHashes";
import { Grid } from "@chakra-ui/react";
import { UserClaimedDrop } from "../components/UserClaimedDrop";

export default function MyDrops() {
  const { airdropHashes } = useGetAirdropHashes();

  if (typeof window === undefined) return null;

  return (
    <div>
      <Center>
        <Text
          fontSize="4xl"
          mb={12}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          as="b"
        >
          My Airdrops
        </Text>
      </Center>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} m={24}>
        {airdropHashes?.map((hash) => (
          <UserClaimedDrop hash={hash} key={hash} />
        ))}
      </Grid>
    </div>
  );
}
