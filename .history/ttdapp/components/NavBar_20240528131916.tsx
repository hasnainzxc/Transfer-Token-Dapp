import {
  Container,
  Flex,
  Text,
  Box,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Navbar() {
  const address = useAddress();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxW={"1440px"} py={4}>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <Text fontWeight={"black"}>Transfer App</Text>
        </Link>

        <Box display={{ base: "none", md: "block" }}>
          {address && (
            <Flex flexDirection={"row"}>
              <Link href={"/transfer"}>
                <Text mr={8}>Transfer</Text>
              </Link>
              <Link href={"/claim"}>
                <Text mr={8}>Claim Token</Text>
              </Link>
              <Link href={`/profile/${address}`}>
                <Text>My Account</Text>
              </Link>
            </Flex>
          )}
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
          />
        </Box>
      </Flex>

      <Box display={{ base: isOpen ? "block" : "none", md: "none" }}>
        {address && (
          <Flex flexDirection={"column"} mt={4}>
            <Link href={"/transfer"}>
              <Text mb={2}>Transfer</Text>
            </Link>
            <Link href={"/claim"}>
              <Text mb={2}>Claim Token</Text>
            </Link>
            <Link href={`/profile/${address}`}>
              <Text mb={2}>My Account</Text>
            </Link>
          </Flex>
        )}
      </Box>

      <ConnectWallet />
    </Container>
  );
}
