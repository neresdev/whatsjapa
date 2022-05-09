import { Checkbox, Flex, Spinner, useBreakpointValue, Button, Box, Text, Heading, Icon, Table, Thead, Th, Tr, Tbody, Td } from '@chakra-ui/react'
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { RiAddLine } from 'react-icons/ri';
import { Pagination } from '../../components/Pagination';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import DoLogin from "../DoLogin";

interface UserProps{
  id: number;
  email: string;
  name: string;
  createdAt: string;
}
export default function UserList(){
  const [logged, setLogged] = useState(true);
  useEffect(() => {
    setLogged(Cookies.get('actualUser') !== undefined);
  }, [])
  const [ page, setPage ] = useState(1);
  console.log(page);
  // const { data, isLoading, error } = useQuery('users', async () => {
  //   const response = await fetch('http://localhost:3000/api/users')
  //   const data = await response.json();
  //   const users = data.users.map(user => {
  //     return {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
  //         day: '2-digit',
  //         month: 'long',
  //         year: 'numeric'
  //       })
  //     }
  //   });
  //   return users
  // }, {
  //   staleTime: 1000 * 5, // 5 seconds
  // })
// useEffect(() => {
//     fetch('http://localhost:3000/api/users')
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => {
//       console.log('errorrr:')
//       console.log(err)
//     })
// }, [])
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
      logged ?
          <Box>

            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" paddingRight={["4","0"]} px={["4","4","6"]}>
              <Sidebar />
              <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" alig="center">

                  <Heading size="lg"  fontWeight="normal"> Usuários </Heading>
                  <Link href="/users/create" passHref>
                    <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="pink"
                        leftIcon={<Icon as={RiAddLine} fontSize="28" /> }
                    >
                      Criar Novo
                    </Button>
                  </Link>
                </Flex>
                {/*{ isLoading ?(*/}
                {/*  <Flex justify="center">*/}
                {/*    <Spinner />*/}
                {/*  </Flex>*/}
                {/*) : error ? (*/}
                {/*  <Flex justity="center">*/}
                {/*    <Text>Falha ao obter dados dos usuários</Text>*/}
                {/*  </Flex>*/}
                {/*) : (*/}
                <>
                  <Table colorScheme="whitewhiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px={["4","4","6"]}  width="8">
                          <Checkbox color="gray.300" colorScheme="pink"></Checkbox>
                        </Th>
                        <Th >
                          Usuário
                        </Th>
                        {isWideVersion && (
                            <Th >
                              Data de Cadastro
                            </Th>
                        )}
                        <Th ></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        //--> quando 'dessetar' apague daqui
                      }
                      {/*{data.map((user: UserProps) => {*/}
                      {/*  return(*/}
                      {/*  <Tr  key={user.id}>*/}
                      {/*    <Td px={["4","4","6"]} border="none">*/}
                      {/*        <Checkbox colorScheme="pink"></Checkbox>*/}
                      {/*    </Td>*/}
                      {/*    <Td border="none">*/}
                      {/*      <Box >*/}
                      {/*        <Text fontWeight="bobold">{user.name}</Text>*/}
                      {/*        <Text color="gray.300" fontSize="sm">{user.email}</Text>*/}
                      {/*      </Box>*/}
                      {/*    </Td>*/}
                      {/*    {isWideVersion && (*/}
                      {/*      <Td border="none">*/}
                      {/*        <Text fontWeight="bobold">{user.createdAt}</Text>*/}
                      {/*      </Td>*/}
                      {/*    )}*/}

                      {/*  </Tr>)*/}
                      {/*})}*/}

                    </Tbody>
                  </Table>
                  <Pagination
                      totalRegisters={200}
                      currentPage={page}
                      onPageChange= {setPage}
                  />
                </>

              </Box>
            </Flex>
          </Box>
          :
          <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" paddingRight={["4","0"]} px={["4","4","6"]}>
              <Sidebar />
              <Box flex="1" borderRadius={8} bg="gray.800" p="8">

                <>
                  <DoLogin />
                </>

              </Box>
            </Flex>
          </Box>

  );
}
