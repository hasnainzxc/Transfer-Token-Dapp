import { Box, Button, Heading, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Navbar() {
  const address = useAddress();
  const { isOpen, onToggle } = useDisclosure();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

        <IconButton
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          icon={mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={handleMobileMenuToggle}
        />

        <Box
          display={{ base: mobileMenuOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
          width={{ base: "100%", md: "auto" }}
          position={{ base: "fixed", md: "static" }}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={999}
          bg="white"
        >
          <Stack
            direction="column"
            spacing={4}
            align="center"
            pt={20} // Adjust the padding top value as needed
          >
            {address && (
              <>
                <Link href={"/transfer"} passHref>
                  <Button as="a" variant="link" onClick={handleMobileMenuToggle}>
                    Transfer
                  </Button>
                </Link>
                <Link href={"/claim"} passHref>
                  <Button as="a" variant="link" onClick={handleMobileMenuToggle}>
                    Claim Token
                  </Button>
                </Link>
                <Link href={`/profile/${address}`} passHref>
                  <Button as="a" variant="link" onClick={handleMobileMenuToggle}>
                    My Account
                  </Button>
                </Link>
              </>
            )}
            <ConnectWallet
              btnProps={{
                size: "sm",
                variant: "solid",
                colorScheme: "teal",
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
