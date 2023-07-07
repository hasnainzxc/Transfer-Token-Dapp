import { Card, Flex, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

type Props = {
  step: string;
  title: string;
  description: string;
};

export default function FeatureCard({ step, title, description }: Props) {
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const textSize = useBreakpointValue({ base: "lg", md: "xl" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Card px={8} py={10}>
      <Stack spacing={8}>
        <Flex flexDirection={flexDirection} alignItems="center">
          <Text fontSize="lg" mr={4}>{step}</Text>
          <Heading fontSize={headingSize}>{title}</Heading>
        </Flex>
        <Text fontSize={textSize} ml={{ base: 0, md: 10 }}>{description}</Text>
      </Stack>
    </Card>
  );
}
