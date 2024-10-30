// src/components/Navigation/PoolSelector.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { PoolContext } from '../../contexts/PoolContext';
import useMockPools from '../../hooks/useMockPools';

interface Pool {
  id: string;
  name: string;
}

const PoolSelector: React.FC = () => {
  const { selectedPool, setSelectedPool } = useContext(PoolContext) || {};
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    // Using mock pools data
    const fetchPools = async () => {
      const data = await useMockPools();
      setPools(data);
    };

    fetchPools();
  }, []);

  const handlePoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPool?.(event.target.value);
    // TODO: Update context or state with the selected pool
  };

  return (
    <Select
      placeholder="Select Pool"
      value={selectedPool || ''}
      onChange={handlePoolChange}
      mb={4}
    >
      {pools.map((pool) => (
        <option key={pool.id} value={pool.id}>
          {pool.name}
        </option>
      ))}
    </Select>
  );
};

export default PoolSelector;
