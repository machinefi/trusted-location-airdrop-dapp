import { Card, CardHeader, CardBody, Heading, Center } from "@chakra-ui/react";

export const AirdropCard = ({
  hash,
  children,
}: {
  hash: string;
  children: React.ReactNode;
}) => {
  return (
    <Card
      as="article"
      maxW="sm"
      _hover={{
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        color: "white",
      }}
      boxShadow="inner"
    >
      <CardHeader>
        <Heading size="md" as="b">
          <Center>
            Air Drop {hash?.substring(0, 5)}..{hash?.substring(hash.length - 2)}
          </Center>
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default AirdropCard;
