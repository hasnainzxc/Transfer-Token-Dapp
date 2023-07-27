import { Container, Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import TransferCard from "../components/TransferCard";
import Events from "../components/Events";

export default function TransferPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="1440px">
      <Flex
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
      )}
    </Container>
  );
}
