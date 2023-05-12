import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    IconProps,
    Icon,
    useColorModeValue,
    Select,
    useToast
  } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Header from '../components/Header';
import { useState } from 'react';
import api from '../services/apiClient';
import { Link } from 'react-router-dom';
  
  interface IData{

    firstName?: string | undefined
    lastName?: string | undefined
    email?: string | undefined
    username?: string | undefined
    password?: string | undefined
    passwordConfirmation?:string | undefined
    gender?: string | undefined
    birthDate?:string | undefined

  }

  const avatars = [
    {
      name: 'Ryan Florence',
      url: 'https://bit.ly/ryan-florence',
    },
    {
      name: 'Segun Adebayo',
      url: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'Kent Dodds',
      url: 'https://bit.ly/kent-c-dodds',
    },
    {
      name: 'Prosper Otemuyiwa',
      url: 'https://bit.ly/prosper-baba',
    },
    {
      name: 'Christian Nwamba',
      url: 'https://bit.ly/code-beast',
    },
  ];
  
  export default function SignUp() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [username, setUserName] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")


    const breakPointSizeAvatar = useBreakpointValue({ base: 'md', md: 'lg' })

    const breakPointMinW = useBreakpointValue({ base: '44px', md: '60px' })

    const breakPointMinH = useBreakpointValue({ base: '44px', md: '60px' })

    const [data,setData] = useState<IData>()

    const toast = useToast()


    function onHandleSubmit(){
      if(birthDate == "" || firstName == "" || gender == "" || lastName == "" || email == "" || password == "" || passwordConfirmation == "" || username == "" )
      {
        toast({
          title: 'Invalid fields',
          description: "one or more fields can not be empty",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position:"top-left"
        })
            
        return
      }
      

      if(passwordConfirmation !== password){
        toast({
          title: 'Invalid fields',
          description: "passwords must match",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position:"top-left"
        })
        return
      }
      
      api.post("/",{
        firstName,
        lastName,
        email,
        username,
        password,
        gender,
        birthDate
    })
      .then(()=>{
        toast({
          title: firstName + " created successfully" ,
          description: "you may log-in now",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position:"top-left"
        })
      })
      .catch((err)=> {

        console.log(err)
        toast({
          title: 'Erro',
          description: "could not create user",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position:"top-left"
        })

        return
      })

    }

    return (
      <Box position={'relative'}>
      <Header  />
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
              Estudantes do Secundário{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                &
              </Text>{' '}
              Professores
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={breakPointSizeAvatar}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={breakPointMinW}
                minHeight={breakPointMinH}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                TU
              </Flex>
            </Stack>
            <ColorModeSwitcher></ColorModeSwitcher>
          </Stack>
          <Stack
            bg={useColorModeValue('gray.100', 'gray.700')}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={useColorModeValue('gray.800', 'gray.50')}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Junte-se a nós 
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                   !
                </Text>
              </Heading>
              <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Aprenda matemática do jeito certo !
              </Text>
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
              <Text color={useColorModeValue('', '')} fontSize={{ base: 'md', sm: 'xl' }}>
                    Entrar na sua conta
                    {' '}
                    <Link to="/" ><Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text">
                        aqui
                    </Text></Link>
                </Text>
              <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Nome:
                </Text>
                <Input
                  placeholder="Firstname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  
                  onChange={(e)=>{
                    setFirstName(e.target.value)
                  }}
                />
                <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Apelido:
                </Text>
                <Input
                  placeholder="Firstname"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e)=>{
                    setLastName(e.target.value)
                  }}
                />

              < Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Username:
                </Text>
                <Input
                  placeholder="firstname"
                  bg={'gray.100'}
                  border={0}
                  type='tezt'
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={(e)=>{
                    setUserName(e.target.value)
                  }}
                />
                 
                 < Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                BirthDate:
                </Text>
                <Input
                  
                  bg={'gray.100'}
                  border={0}
                  type='date'
                  
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}

                  onChange={(e)=>{
                    setBirthDate(e.target.value)
                  }}

                />

                <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Genero:
                </Text>
                <Select
                  
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}

                  onChange={(e)=>{
                    setGender(e.target.value)
                  }}
                >
                  <option selected value={"M"} >Masculino</option>
                  <option value={"F"}>Feminino</option>
                  <option value={"O"}>Outro</option>
                </Select>
                <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Email:
                </Text>
                <Input
                  placeholder="firstname@lastname.io"
                  bg={'gray.100'}
                  border={0}
                  type='email'
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}

                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                />

                < Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Password:
                </Text>
                <Input
                  placeholder="firstname@lastname.io"
                  bg={'gray.100'}
                  border={0}
                  type='password'
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}

                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                />

              < Text color={useColorModeValue('gray.500', 'gray.200')} fontSize={{ base: 'sm', sm: 'md' }}>
                Password Confirmation:
                </Text>
                <Input
                  placeholder="firstname@lastname.io"
                  bg={'gray.100'}
                  border={0}
                  type='password'
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}

                  onChange={(e)=>{
                    setPasswordConfirmation(e.target.value)
                  }}
                />

              </Stack>
              <Button
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={onHandleSubmit}
                >
                Submit
              </Button>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
        />
      </Box>
    );
  }
  
  export const Blur = (props: IconProps) => {

    const breakPointW = useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })
    const breakPointZIndex = useBreakpointValue({ base: -1, md: -1, lg: 0 })
    return (
      <Icon
        width={breakPointW}
        zIndex={breakPointZIndex}
        height="560px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    );
  };