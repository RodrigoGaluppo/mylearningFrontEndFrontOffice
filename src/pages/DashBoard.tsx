import {  Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    SimpleGrid,
    useToast, } from "@chakra-ui/react"
import ProductCard from "../components/Card"
import Header from "../components/Header"
import { useContext, useEffect, useState } from "react";
import api from "../services/apiClient";
import { useAuth } from "../hooks/AuthContext";
import Loader from "../components/Loader";


interface IData{
    id:string
    imgUrl:string
    name:string
    subject:string;  
  
  }

export default function DashBoard(){

    const {token,user} = useAuth()

    const [courses,setCourses] = useState<IData[]>([])

    const toast = useToast()
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        api.get("course/list?page=1",{ headers: {"Authorization" : `Bearer ${token}`}}).then((res)=>{
           
            setCourses(res.data)
            
            setIsLoading(false)
        }).catch(err=>{
            console.log(err);
            setIsLoading(false)
        })
    },[])

    return(
        <Box>
           
           <Header  />
            <Loader isLoading={isLoading} />
            <Container maxW={'5xl'}>
            <Stack
                as={Box}
                w="100%s"
                textAlign={'center'}
                spacing={{ base: 4, md: 6 }}
                py={{ base: 10, md: 16 }}>
                <Heading
                    w="100%"
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'100%'}>
                    Welcome {" "}
                    <Text  as={'span'} color={'pink.400'}>
                    {user.firstName}
                    </Text>
                </Heading>
                <Text fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }} color={'gray.500'}>
                    Here's the list of the courses you are enrolled
                </Text>
               
                </Stack>

                <SimpleGrid minChildWidth='300px' spacing={2}>
                   {
                   
                    courses?.map(course=>(
                        <ProductCard link={"/course/" + course.id}  data={course} />
                    ))

                   }
                </SimpleGrid>

        </Container>
    </Box>
    )
}

