import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    SimpleGrid,
    List,
    ListIcon,
    ListItem,
    useToast,
    Button,
  } from '@chakra-ui/react';
import { FiCheck, FiCheckCircle } from 'react-icons/fi';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useEffect, useState } from 'react';
import api from '../services/apiClient';
import Loader from '../components/Loader';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
  
interface ILesson {
    id: string;
    title: string
    description:string
    resourceLessons:IResourceLesson[]
    textLessons:ITextLesson[]
    videolessons:IVideoLesson[]
    
  }

interface IResourceLesson{
    id:number
    title:string
    link:string
}

interface IVideoLesson{
    id:number
    title:string
    url:string
}

interface ITextLesson{
    id:number
    title:string
    content:string
}


export default function Lesson(){

    const { id } = useParams() // course id from route
    const { token } = useAuth()

    const [lesson,setLesson] = useState<ILesson>()

    const [isAccomplished, setIsAccomplished] = useState<boolean>()

    const toast = useToast()

    const {user} = useAuth()
    const [isLoading,setIsLoading] = useState(false)

    const handleAccomplishLesson = ()=>{
        setIsLoading(true)
        if(!isAccomplished){
            
            api.post(`lesson`,{
                id:lesson?.id
            },{ headers: {"Authorization" : `Bearer ${token}`}})
            .then((res)=>{
                setIsLoading(false)
                setIsAccomplished(!isAccomplished)
            })
            .catch((err)=>{
                    console.log(err);
                    setIsLoading(false)
                    
            })
        }
        else{
            api.delete(`lesson/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
            .then((res)=>{
                setIsLoading(false)
                setIsAccomplished(!isAccomplished)
            })
            .catch((err)=>{
                    console.log(err);
                    setIsLoading(false)
                    
            })
        }
            
    }

    useEffect(()=>{
        setIsLoading(true)
        
        
            api.get(`lesson/${id}?courseId=${8}`,{ headers: {"Authorization" : `Bearer ${token}`}})
        .then((res)=>{

            setLesson(res.data)
            setIsLoading(false)
            console.log(lesson);
            
            
            setIsAccomplished(res.data.isAccomplished)
        })
        .catch((err)=>{
                console.log(err);
                setIsLoading(false)
        })
      

    },[])

    return(

        <>
            
            <Header  />
            <Loader isLoading={isLoading} />

            {!!lesson && 
            <Container  maxW={'5xl'} py={12}>
               <Flex justifyContent={"space-between"}> 
                <Heading mb="6" >
                {lesson?.title}
               </Heading>

               <Button onClick={()=>{handleAccomplishLesson()}} colorScheme={isAccomplished ? "red" : "green" } >
                
                {isAccomplished 
                ? 
                <><Text>Retrieve Lesson </Text><CloseIcon ml="1" ></CloseIcon></> 
                : 
                <><Text>Accomplish Lesson</Text><FiCheck size={"24"}></FiCheck></> 
                }
                
                </Button>
               
               </Flex>
                <Flex
                
                    justify={'center'}
                    align={'center'}
                  
                    w={'100%'}
                    >
                    
                    <Box rounded={'2xl'}
                        boxShadow={'2xl'}
                        
                        width={'100%'}
                        >
                      
                        {lesson?.videolessons && lesson?.videolessons?.map(videoL=>(
                            <video
                            controls
                            width={'100%'}
                            height={'100%'}
                            
                            style={{maxHeight:"600px"}}

                            key={videoL.id}
                            >          

                                <source src={videoL.url} type="video/mp4"/>
                            </video>
                        ))}
                    </Box>
                </Flex>
                <Heading w="100%" textAlign={"center"} mt="8" mb="4" >
                Description
               </Heading>
               <Flex justifyContent={"center"} >
               <Text textAlign={"justify"} fontSize={"large"} mb="8" >{lesson?.description}</Text>
           
               </Flex>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <SimpleGrid columns={1} spacing="2">
                     <Text py="0"  fontSize={"3xl"} >Lesson Materials</Text>

                    {
                        lesson?.textLessons.length == 0 &&   <Text textAlign={"justify"} >this lesson does not have materials</Text>
                    }

                    {!!lesson?.textLessons && lesson?.textLessons.map(textL=>(
                        <Box key={textL.id}>
                        <Text textAlign={"justify"} ><strong>{textL.title}</strong></Text>
                         <Text textAlign={"justify"} >{textL.content}</Text>
                        </Box>
           
                    ))}

                </SimpleGrid>
                
                <SimpleGrid columns={1} spacing="2">
                     <Text py="0"  fontSize={"3xl"} >Links</Text>
                     {
                            lesson?.resourceLessons && lesson?.resourceLessons.length == 0 &&   <Text textAlign={"justify"} >this lesson does not have links</Text>
                    }
                     <List mx="auto" w="100%" spacing={3} >

                     {!!lesson?.resourceLessons && lesson?.resourceLessons.map(linkL=>(

                        <ListItem key={linkL.id}  >
                            <ListIcon as={FiCheckCircle} color='green.500' />
                            <Link to={linkL.link} >{linkL.title}</Link>
                        </ListItem>

                    ))}
                      
                        
                        
                    </List>     
                </SimpleGrid>
                
                
                </SimpleGrid>
            
                
            </Container>
            }       
        </>       
    )
}