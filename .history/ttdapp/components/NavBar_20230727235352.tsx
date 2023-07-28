import { useState } from "react";
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
  const [isWalletConnected, setWalletConnected] = useState(false);

  // Function to handle wallet connection
  const handleConnectWallet = () => {
    // Implement your logic to connect the wallet here
    // For example, use a wallet provider like Metamask or other wallet connectors
    // and set `isWalletConnected` to `true` upon successful connection.
    setWalletConnected(true);
  };

  // Function to handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    onToggle();
  };

  return (
    <Container maxW={"1440px"} py={4}>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={handleMobileMenuToggle}
          />
        </Box>

        <Link href={"/"}>
          <Text fontWeight={"black"}>Transfer App</Text>
        </Link>

        <Box display={{ base: "none", md: "block" }}>
          {isWalletConnected && (
            <Flex flexDirection={"row"}>
              <Link href={"/transfer"}>
                <Text fontWeight="bold" mr={8} _hover={{ textDecoration: "underline" }}>
                  Transfer
                </Text>
              </Link>
              <Link href={"/claim"}>
                <Text fontWeight="bold" mr={8} _hover={{ textDecoration: "underline" }}>
                  Claim Token
                </Text>
              </Link>
              {address && (
                <Link href={`/profile/${address}`}>
                  <Text fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                    My Account
                  </Text>
                </Link>
              )}
            </Flex>
          )}
        </Box>
      </Flex>

      {(isOpen || !isWalletConnected) && (
        <Box mt={4} display={{ base: "block", md: "none" }}>
          {isWalletConnected ? (
            <Flex flexDirection={"column"} mt={4}>
              <Link href={"/transfer"}>
                <Text fontWeight="bold" mb={2} _hover={{ textDecoration: "underline" }}>
                  Transfer
                </Text>
              </Link>
              <Link href={"/claim"}>
                <Text fontWeight="bold" mb={2} _hover={{ textDecoration: "underline" }}>
                  Claim Token
                </Text>
              </Link>
              {address && (
                <Link href={`/profile/${address}`}>
                  <Text fontWeight="bold" mb={2} _hover={{ textDecoration: "underline" }}>
                    My Account
                  </Text>
                </Link>
              )}
            </Flex>
          ) : (
            <ConnectWallet />
          )}
        </Box>
      )}
    </Container>
  );
}
