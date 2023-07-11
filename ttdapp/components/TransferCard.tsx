import { Box, Card, Flex, Heading, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/Home.module.css";

export default function TransferCard() {
  const address = useAddress();

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);

  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } = useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
  });

  const [selectedToken, setSelectedToken] = useState("");

  const handleChange = (event: any, name: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleTokenSelection = (tokenAddress: string) => {
    setSelectedToken(tokenAddress);
  };

  const stackSpacing = useBreakpointValue({ base: 4, md: 8 });
  const cardWidth = useBreakpointValue({ base: "100%", md: "50%" });

  return (
    <Card w={cardWidth} p={stackSpacing}>
      <Stack spacing={stackSpacing}>
        <Heading>Transfer:</Heading>

        <Text fontWeight="bold">Select Token:</Text>
        <Flex flexDirection="row" mt={4}>
          {!isVerifiedTokensLoading &&
            verifiedTokens.map((token: string) => (
              <Box
                key={token}
                onClick={() => handleTokenSelection(token)}
                className={styles.tokenButton}
              >
                <TokenSelection tokenAddress={token} isSelected={selectedToken === token} />
              </Box>
            ))}
        </Flex>

        <TokenBalance tokenAddress={selectedToken} />

        <Text fontWeight="bold">Send To:</Text>
        <Input
          placeholder="0x0000000"
          type="text"
          value={formData.receiver}
          onChange={(event) => handleChange(event, "receiver")}
        />
        <Text fontWeight="bold">Amount:</Text>
        <Input
          placeholder="0.0"
          type="number"
          value={formData.amount}
          onChange={(event) => handleChange(event, "amount")}
        />
        <Text fontWeight="bold">Message:</Text>
        <Input
          placeholder="Add short message here."
          type="text"
          value={formData.message}
          onChange={(event) => handleChange(event, "message")}
        />
       
      </Stack>
    </Card>
  );
}
