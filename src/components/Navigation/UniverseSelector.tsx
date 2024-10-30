// src/components/Navigation/UniverseSelector.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { UserContext } from '../../contexts/UserContext';
import useMockUniverses from '../../hooks/useMockUniverses';

interface Universe {
  id: string;
  name: string;
}

const UniverseSelector: React.FC = () => {
  const { session } = useContext(UserContext);
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [selectedUniverse, setSelectedUniverse] = useState<string>('');

  useEffect(() => {
    if (!session) {
      return;
    }

    // Using mock universes data
    const fetchUniverses = async () => {
      const data = await useMockUniverses(session);
      setUniverses(data);
    };

    fetchUniverses();
  }, [session]);

  const handleUniverseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUniverse(event.target.value);
    // TODO: Update context or state with the selected universe
  };

  return (
    <Select
      placeholder="Select Universe"
      value={selectedUniverse}
      onChange={handleUniverseChange}
      mb={4}
    >
      {universes.map((universe) => (
        <option key={universe.id} value={universe.id}>
          {universe.name}
        </option>
      ))}
    </Select>
  );
};

export default UniverseSelector;
