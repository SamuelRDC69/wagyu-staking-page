// src/components/StakeControls.tsx
import { Button, Input, VStack, Tooltip, Progress, Box } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface StakeControlsProps {
  stakedAmount: string;
  setStakedAmount: Dispatch<SetStateAction<string>>;
  stakeTokens: () => void;
  claimRewards: () => void;
  unstakeTokens: () => void;
  isLoading: boolean;
}

const StakeControls: React.FC<StakeControlsProps> = ({
  stakedAmount,
  setStakedAmount,
  stakeTokens,
  claimRewards,
  unstakeTokens,
  isLoading,
}) => (
  <VStack spacing={4} width="100%" bg="gray.50" p={6} borderRadius="md" boxShadow="lg">
    <Input
      placeholder="Enter amount to stake"
      value={stakedAmount}
      onChange={(e) => setStakedAmount(e.target.value)}
      size="lg"
      focusBorderColor="blue.400"
      borderRadius="md"
    />
    <Tooltip label="Stake tokens to earn rewards" hasArrow>
      <Button colorScheme="green" size="lg" onClick={stakeTokens} isLoading={isLoading} _hover={{ bg: 'green.600' }}>
        Stake Tokens
      </Button>
    </Tooltip>
    <Tooltip label="Claim your earned rewards" hasArrow>
      <Button colorScheme="orange" size="lg" onClick={claimRewards} isLoading={isLoading} _hover={{ bg: 'orange.600' }}>
        Claim Rewards
      </Button>
    </Tooltip>
    <Tooltip label="Unstake tokens to withdraw" hasArrow>
      <Button colorScheme="red" size="lg" onClick={unstakeTokens} isLoading={isLoading} _hover={{ bg: 'red.600' }}>
        Unstake Tokens
      </Button>
    </Tooltip>
    <Box width="100%">
      <Progress size="xs" isIndeterminate={isLoading} colorScheme="blue" />
    </Box>
  </VStack>
);

export default StakeControls;
