import { ChatComponent} from '../../components/ChatComponents/chat/ChatComponent';
import io from 'socket.io-client';
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import DoLogin from "../DoLogin";
import {Button} from "@chakra-ui/react";
import WebSocket from 'websocket';
// UNIP -  const socket = io(`https://10.19.1.4:3001`, { transports: ["websocket"], secure: true }); // TODO: rodar `ip addr show` no terminal e pegar o segundo ou terceiro IP desta maquina
const socket = io(`https://192.168.0.14:3001`, { transports: ["websocket"], secure: true }); // TODO: rodar `ip addr show` no terminal e pegar o segundo ou terceiro IP desta maquina

export default function Chat(){

    return (
        <>
            <ChatComponent socket={socket} name={Cookies.get('actualUser')}/>
        </>
    )
}