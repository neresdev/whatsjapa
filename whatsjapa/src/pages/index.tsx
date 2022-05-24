import {Flex, Button, Stack, HStack} from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
// import background from '../../assets/background.jpg';
import background from '../../assets/fundo_verde.jpg';
import { Spinner } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { supabase } from "../utils/supabaseClient";
import {responseSymbol} from "next/dist/server/web/spec-compliant/fetch-event";
import {log} from "util";

export default function SignIn() {
    const notify = () => toast("Usuário ou senha inválidos.");
    const router = useRouter();
    const [cookie, setCookie] = useState(Cookies.get('actualUser') !== undefined); // se for diferente de undefined ele retorna true, logo esta logado
    const [isLoading, setIsloading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // TODO: tests
    useEffect(() => {
        setIsloading(true);
        supaBaseLogin('cookie').then();

    }, []);

    const supaBaseLogin =  async( method: String) => {
        try{
            let { data, error, status } = method === 'cookie' ? await
                    supabase
                        .from('users')
                        .select('id, username')
                        .eq('username', Cookies.get('actualUser'))
                        .single() :
                await supabase
                    .from('users')
                    .select('id, username')
                    .eq('username', username)
                    .eq('password', password)
                    .single();

            if (error && status !== 406){
                throw error;
            }else if (status === 406){
                setTimeout(() => {
                    setIsloading(false);
                }, 2000)

                method === 'form' && notify();
            }else if (data){
                method === 'form' && Cookies.set('actualUser', username);
                await router.push('/dashboard');

            }
        }catch (e){
            console.log(e)
        }



    }

    // const supaBaseLogin =  async( method: String) => {
    //     try{
    //         let { data, error, status } = await supabase
    //             .from('users')
    //             .select('id, username')
    //             .eq('username', method === 'cookie' ? Cookies.get('actualUser') : username)
    //             .single()
    //         if (error && status !== 406){
    //             throw error;
    //         }else if (status === 406){
    //             setTimeout(() => {
    //                 setIsloading(false);
    //             }, 2000)
    //
    //             method === 'form' && notify();
    //         }else if (data){
    //             method === 'form' && Cookies.set('actualUser', username);
    //             await router.push('/dashboard');
    //
    //         }
    //     }catch (e){
    //         console.log(e)
    //     }
    //
    //
    //
    // }
    // TODO: tests




    const login = () => {
        setIsloading(true);
        // --> parte que verifica se o usuario existe no banco
        let user = {
            userName: username,
        }
        Cookies.set('actualUser', username);
        router.push('/dashboard');
        setTimeout(() => {
            setIsloading(false);
        }, 3000)
    }
    return (

    <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justify="center"
        style={{
            backgroundImage: `url(${background.src})`
        }}
    >
        <ToastContainer theme={'dark'}  />
        <Flex
            as="form"
            width="100%"
            maxWidth={360}
            bg="gray.900"
            p="8" // medida do próprio chakra -> faz * 4 para saber quanto é em pixels
            borderRadius={8}
            flexDir="column"
        >
            {isLoading ?
                <HStack w={"100%"} justifyContent={"center"}>
                    <Spinner/>
                </HStack>
                :
                <>
                    <Stack spacing="4" >
                        <Input
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            label="Usuário"
                        />
                        <Input
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label="Senha"
                        />
                    </Stack>
                    <Button
                    type="button"
                    mt="6"
                    colorScheme="green"
                    size="lg"
                    // onClick={() => login()}
                    onClick={() => supaBaseLogin('form')}
                    // onClick={() => notify()}
                    >
                    Entrar
                    </Button>
                </>
            }


        </Flex>
    </Flex>
  )
}
