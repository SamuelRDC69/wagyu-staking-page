import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Text, Flex, Avatar, Center, TagRightIcon, VStack, Heading, Select, Button, Tag,
  Stack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, DrawerFooter, Progress
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { Reorder } from 'framer-motion';
import LeaderboardEntry from './LeaderboardEntry';
import data from './data.json';  // Importing the data from data.json

export default function Leaderboard() {
  const [timeline, setTimeline] = useState('Lifetime');
  const [property, setProperty] = useState('dollarVolume');
  const [sortedData, setSortedData] = useState([]);

  // Sorting the data based on the property
  useEffect(() => {
    const sortData = () => {
      if (property === 'Funded') {
        setSortedData(sortArrayByProperty('noFundedLifetime'));
      } else {
        setSortedData(sortArrayByProperty('dollarVolumeLifetime'));
      }
    };
    sortData();
  }, [property]);

  const sortArrayByProperty = (prop) => {
    return [...data].sort((a, b) => b[`${prop}`] - a[`${prop}`]);
  };

  return (
    <>
      <Flex p={3} flexDir={'column'} w='250px'>
        {sortedData && (
          <>
            <Center>
              <Heading mb={5} as='em' size='md'>
                <Flex flexDir={'column'}>
                  <Center>
                    <Flex mb={3} alignItems='center' flexDir='column'>
                      <Progress mt='2px' width='100%' height={'2px'} colorScheme={'red'} size='xs' isIndeterminate />
                    </Flex>
                  </Center>
                </Flex>
              </Heading>
            </Center>
            <Flex mb={2} justify={'space-between'} flexDir='row'>
              <Button p={0} variant={'ghost'} size='xs' onClick={() => setProperty('dollarVolume')}>
                <Tag
                  borderRadius={'3xl'}
                  m={2}
                  fontSize='xs'
                  fontWeight={property === 'dollarVolume' ? 'bold' : 'normal'}
                  variant={property === 'dollarVolume' ? 'solid' : 'subtle'}
                >
                  Amount
                  {property === 'dollarVolume' && <TagRightIcon as={FiChevronDown} />}
                </Tag>
              </Button>
              <Button p={0} variant={'ghost'} size='xs' onClick={() => setProperty('Funded')}>
                <Tag
                  borderRadius={'3xl'}
                  m={2}
                  fontSize='xs'
                  fontWeight={property === 'Funded' ? 'bold' : 'normal'}
                  variant={property === 'Funded' ? 'solid' : 'subtle'}
                >
                  Quantity
                  {property === 'Funded' && <TagRightIcon as={FiChevronDown} />}
                </Tag>
              </Button>
            </Flex>
            <Flex p={2}>
              <Reorder.Group as='div' draggable={false} dragControls={false} dragListener={false} axis='y' values={sortedData}>
                {sortedData.map((row) => (
                  <Reorder.Item
                    as='div'
                    key={row.LO.Name}
                    dragListener={false}
                    draggable={false}
                    value={row}
                  >
                    <LeaderboardEntry key={row.LO.Name} row={row} property={property} timeline={timeline} />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
