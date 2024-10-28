// src/components/StakeControls.tsx
import { Button, Input, VStack } from '@chakra-ui/react';
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
  <VStack spacing={3} align="stretch">
    <Input
      placeholder="Amount to stake"
      value={stakedAmount}
      onChange={(e) => setStakedAmount(e.target.value)}
      mb={3}
    />
    <Button colorScheme="green" onClick={stakeTokens} isLoading={isLoading}>
      Stake Tokens
    </Button>
    <Button colorScheme="orange" onClick={claimRewards} isLoading={isLoading}>
      Claim Rewards
    </Button>
    <Button colorScheme="red" onClick={unstakeTokens} isLoading={isLoading}>
      Unstake Tokens
    </Button>
  </VStack>
);

export default StakeControls;
