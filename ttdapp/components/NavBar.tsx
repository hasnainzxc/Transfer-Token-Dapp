import { Box, Button, Heading, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const address = useAddress();
  const { isOpen, onToggle } = useDisclosure();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  const handleConnectWallet = async () => {
    try {
      // Code to connect wallet using MetaMask or other provider
      // ...

      // Example: Triggering eth_requestAccounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Continue with wallet connection logic
      // ...
    } catch (error) {
      console.error("Wallet Connection Error:", error);
    }
  };

  return (
    <Box bg="white" py={4} boxShadow="sm">
      <Box
        mx="auto"
        px={{ base: 4, md: 8 }}
        maxW="7xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md" fontWeight="black">
          <Link href={"/"} passHref>
            <Button as="a" variant="link">
              Transfer App
            </Button>
          </Link>
        </Heading>

        <Box zIndex={999} cursor="pointer" onClick={handleMobileMenuToggle}>
          <IconButton
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            icon={mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ base: "block", md: "none" }}
          />
        </Box>

        {/* Display links in the middle for web view */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          display={{ base: mobileMenuOpen ? "flex" : "none", md: "flex" }}
          align="center"
        >
          {address && (
            <>
              <Link href={"/transfer"} passHref>
                <Button as="a" variant="link" onClick={handleMobileMenuClose}>
                  Transfer
                </Button>
              </Link>
              <Link href={"/claim"} passHref>
                <Button as="a" variant="link" onClick={handleMobileMenuClose}>
                  Claim Token
                </Button>
              </Link>
              <Link href={`/profile/${address}`} passHref>
                <Button as="a" variant="link" onClick={handleMobileMenuClose}>
                  My Account
                </Button>
              </Link>
            </>
          )}

          {/* Render ConnectWallet in both mobile and web view */}
          <ConnectWallet
            btnProps={{
              size: "sm",
              variant: "solid",
              colorScheme: "teal",
              onClick: handleConnectWallet,
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
