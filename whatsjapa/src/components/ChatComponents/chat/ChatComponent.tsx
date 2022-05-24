import React, {useEffect, useState} from 'react'
import Message from "../message/Message";
import {
    Flex,
    Button,
    Box,
    Heading,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'

import { Header } from '../../Header';
import { Sidebar } from '../../Sidebar';
import {Socket} from "socket.io-client";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import { Input } from '../../Form/Input';
import Cookies from "js-cookie";
import DoLogin from "../../../pages/DoLogin";

interface ChatComponent {
    socket: Socket;
    name: string
}

export function ChatComponent({socket, name}: ChatComponent){
    const [logged, setLogged] = useState(true);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [erro, setErro] = useState("");
    useEffect(() => {
        setLogged(Cookies.get('actualUser') !== undefined);
        // document.addEventListener('keypress', function (e){
        //     if (e.code == 'Enter'){
        //         console.log(e.code);
        //         sendMessage();
        //     }
        // })
    }, [])
    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessageList((list) => [...list, data]);
            document.querySelector('.chat-body').scrollTo(0, 9999);
        });
    }, [socket]);

    const sendMessage = () => {
        if (message.trim() === "") return;
        try{

            socket.emit("message", { userId: socket.id, name: name, message });
            console.log('tentei enviar')
        }catch (e){
            console.log('erro na hora de enviar msg: ' + e.message);
        }
        setMessage("");
    };
    // const clearInput = () => {
    //     document.querySelector("#input").value = "";
    // };

    return (
        logged ?

        <Box>

            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" paddingRight={["4","0"]} px={["4","4","6"]}>
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" alig="center">
                        <Heading size="lg"  fontWeight="normal"> Chat:  </Heading>
                    </Flex>
                    {/*inicia aqui*/}
                    <Box className="chat-container"
                        h="100%"
                         w="100%"
                         display="flex"
                         flexDirection="column"
                        // css={{
                        //     "-webkit-box-shadow": "5px 5px 15px 5px cyan"
                        // }}
                    >
                        <Box
                            className="chat-body"
                            h="450px"
                            overflowY="auto"
                            css={{
                                "scrollbar-color": "blue orange"
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                height="100%"
                                borderRadius={"10px"}
                                padding={"50px"}
                                overflow={"visible"}


                            >
                                <Box
                                    display="flex"
                                    flexDirection={"column"}
                                    h={"100%"}

                                >
                                    {messageList.map(data => (
                                        <Message text={data.message} author={data.name} bot={false} />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box className="chat-footer"  display="flex" flexDirection="row" >
                            <InputGroup>
                                <Input
                                    value={message}
                                    h={"70px"}
                                    border={"none"}
                                    name={"message"}
                                    margin={"5px"}
                                    placeholder="Write a message..."
                                    type="text"
                                    id="input"
                                    maxLength={61}

                                    onChange={(e) => setMessage(e.currentTarget.value)} />
                                <InputRightElement
                                    w={"300px"}
                                >
                                    <Button
                                        w={["10px", "200px", "200px"]}
                                        css={{
                                          "on-focus" : "#262626"
                                        }}
                                        border={"none"}
                                        rightIcon={<ArrowForwardIcon fontSize={40} />}
                                        colorScheme='teal' variant='outline'
                                        marginLeft={["200px", "20px", "20px"]}
                                        // marginRight={["-200px", "20px", "20px"]}
                                        marginTop={"12%"}
                                        onClick={() => sendMessage()}
                                    ></Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </Box>
                    {/*acaba aqui*/}

                </Box>
            </Flex>
        </Box> :
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" paddingRight={["4","0"]} px={["4","4","6"]}>
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" alig="center">
                    </Flex>
                    <DoLogin/>
                </Box>
            </Flex>
        </Box>
    )
}