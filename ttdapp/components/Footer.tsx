import { Container, Divider, Text, useBreakpointValue } from "@chakra-ui/react";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW={"100%"} mt={20} height={isMobile ? "auto" : "100px"}>
      <Divider />
      <Container maxW={"1440px"} py={8}>
        <Text textAlign={isMobile ? "center" : "left"}>{isMobile ? "Footer" : "Footer Text"}</Text>
      </Container>
    </Container>
  );
}
