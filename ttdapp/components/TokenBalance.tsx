import { Box, Skeleton, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

type Props = {
  tokenAddress: string;
};

export default function TokenBalance({ tokenAddress }: Props) {
  const address = useAddress();
  const { contract } = useContract(tokenAddress);
  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
  } = useTokenBalance(contract, address);

  const showSkeleton = useBreakpointValue({ base: true, md: false });

  return (
    <Box mt={4}>
      {!isTokenBalanceLoading ? (
        <Text>Balance: {tokenBalance?.displayValue}</Text>
      ) : (
        showSkeleton && <Skeleton height="20px" width="80px" />
      )}
    </Box>
  );
}
