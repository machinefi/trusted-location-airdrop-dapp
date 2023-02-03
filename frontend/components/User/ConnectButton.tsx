import { Button, ButtonGroup } from "@chakra-ui/react";
import { useConnect } from "wagmi";

export const ConnectButton = () => {
  const { connect, connectors } = useConnect();

  return (
    <ButtonGroup>
      {connectors.map((connector) => (
        <Button key={connector.id} onClick={() => connect({ connector })}>
          Connect
        </Button>
      ))}
    </ButtonGroup>
  );
};
