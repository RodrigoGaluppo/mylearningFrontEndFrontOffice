import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    useColorMode,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
  
  const IMAGE =
    '/Images/formulas-white.svg'
  export default function CardModule() {
    return (
      <Center py={6}>
        <Link to="/lesson" >
        
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
         
          >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={IMAGE}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Matematica A 10 Ano
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
             Funçoes
            </Heading>
            
          </Stack>
        </Box>
        
        </Link>
      </Center>
    );
  }