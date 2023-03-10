import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  Button,
  Center,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAirdropCreate } from "../hooks/useAirdropCreate";
import { useAirdropFee } from "../hooks/useAirdropFee";

export default function Create() {
  const [formInput, setFormInput] = useState({
    lat: 0,
    long: 0,
    max_distance: 0,
    time_from: 0,
    time_to: 0,
    tokens_count: 0,
  });

  const [tokens, setTokens] = useState(0);

  const airdropFee = useAirdropFee(tokens);

  const { createAirdrop, isLoading } = useAirdropCreate({
    ...formInput,
    airdropFee: Number(airdropFee?.toString()),
  });

  const isValidInput = true;

  return (
    <Container>
      <Center>
        <Text
          fontSize="4xl"
          mb={6}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          as="b"
        >
          Create an Airdrop
        </Text>
      </Center>

      <FormControl isRequired>
        <FormLabel>Latitude</FormLabel>
        <Input
          type="number"
          placeholder="-41.123456"
          onChange={(e) =>
            setFormInput({ ...formInput, lat: Number(e.target.value) })
          }
        />
        <FormHelperText mb={6}>Enter a value between -90 and 90</FormHelperText>
        <FormLabel>Longitude</FormLabel>
        <Input
          type="number"
          placeholder="-12.123456"
          onChange={(e) =>
            setFormInput({ ...formInput, long: Number(e.target.value) })
          }
        />
        <FormHelperText mb={6}>
          Enter a value between -180 and 180
        </FormHelperText>
        <FormLabel>Max Distance (meters)</FormLabel>
        <Input
          type="number"
          mb={4}
          placeholder="200"
          onChange={(e) =>
            setFormInput({ ...formInput, max_distance: Number(e.target.value) })
          }
        />

        <FormLabel>Time From</FormLabel>
        <Input
          type="date"
          mb={4}
          onChange={(e) =>
            setFormInput({
              ...formInput,
              time_from: Date.parse(e.target.value),
            })
          }
        />

        <FormLabel>Time To</FormLabel>
        <Input
          type="date"
          mb={4}
          onChange={(e) =>
            setFormInput({ ...formInput, time_to: Date.parse(e.target.value) })
          }
        />

        <FormLabel>Tokens Count</FormLabel>
        <Input
          type="number"
          placeholder="7"
          onChange={(e) => {
            setFormInput({
              ...formInput,
              tokens_count: Number(e.target.value),
            });
            setTokens(Number(e.target.value));
          }}
        />
        <FormHelperText mb={6}>
          Specify how many tokens you would like to create for this Airdrop
        </FormHelperText>

        <Button
          mb={12}
          size={'xs'}
          disabled={isLoading || !createAirdrop || !isValidInput}
          onClick={() => createAirdrop?.()}
        >
          {isLoading ? <Spinner size="xs" /> : `Submit`}
        </Button>
      </FormControl>
    </Container>
  );
}
