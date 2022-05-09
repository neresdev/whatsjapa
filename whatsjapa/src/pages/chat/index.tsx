import { ChatComponent} from '../../components/ChatComponents/chat/ChatComponent';
import io from 'socket.io-client';
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import DoLogin from "../DoLogin";

const socket = io(`https://172.16.116.187:3001`, { transports: ["websocket"], secure: true }); // TODO: rodar `ip addr show` no terminal e pegar o segundo ou terceiro IP desta maquina

export default function Chat(){
    return (
            <ChatComponent socket={socket} name={Cookies.get('actualUser')}/>
    )
}