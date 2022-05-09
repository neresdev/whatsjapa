import { Button, HStack, SimpleGrid, VStack, Divider, Flex, Box, Heading } from '@chakra-ui/react'
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {codecs} from "next/dist/server/lib/squoosh/codecs";


export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const clear = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }
    const sendForm = (code : String) => {
        if (username !== '' && password !== '' && confirmPassword){
            if (code === 'Enter'){
                clear();
            }
        }

    }
    useEffect(() => {
        document.addEventListener('keypress', function (e){
            sendForm(e.code);
        })
    }, []);

    return (
        <Box>

            <Header/>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["6", "8"]}>
                <Sidebar/>
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p="8"
                    // onSubmit={handleSubmit(createUser)}
                >
                    <Heading size="lg" fontWeight="normal"> Criar usuário </Heading>
                    <Divider my="6" borderColor="gray.700"/>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                name="name"
                                type="text"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </SimpleGrid>
                        <Flex mt="8" justify="flex-end">
                            <HStack spacing="4">
                                <Link href="/users">
                                    <Button cursor="pointer" colorScheme="whiteAlpha" as="a">Cancelar</Button>
                                </Link>
                                <Button
                                    colorScheme="cyan"
                                    type="button"
                                    cursor="pointer"
                                >Salvar</Button>
                            </HStack>
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};
