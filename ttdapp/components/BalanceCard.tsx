import { Card, Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAddress, useContract, useContractEvents, useContractMetadata, useTokenBalance } from "@thirdweb-dev/react";

type Props = {
  tokenAddress: string;
};

export default function BalanceCard({ tokenAddress }: Props) {
  const address = useAddress();

  const { contract } = useContract(tokenAddress);

  const { data: contractMetadata, isLoading: isContractMetadataLoading } = useContractMetadata(contract);

  const { data: tokenBalance, isLoading: isTokenBalanceLoading } = useTokenBalance(contract, address);

  const { data: events, isLoading: isEventsLoading } = useContractEvents(contract, "get");

  const stackSpacing = useBreakpointValue({ base: 2, md: 4 });
  const cardPadding = useBreakpointValue({ base: 2, md: 4 });

  return (
    <Card p={cardPadding} width="100%" height="100%" borderWidth={2} borderColor="gray.100">
      {!isContractMetadataLoading ? (
        <Stack textAlign="center" spacing={stackSpacing}>
          <Text fontWeight="bold" fontSize="2xl">
            {contractMetadata.symbol}
          </Text>
          <Text>Balance:</Text>
          {!isTokenBalanceLoading ? (
            <Text fontSize="3xl" fontWeight="bold">
              {tokenBalance?.displayValue}
            </Text>
          ) : (
            <Spinner />
          )}
        </Stack>
      ) : (
        <Spinner />
      )}
    </Card>
  );
}
