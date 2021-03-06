import {Box, Button, Center, Flex, Heading, HStack, InputGroup, InputRightElement, VStack} from "@chakra-ui/react";
import {Header} from "../Header";
import {Sidebar} from "../Sidebar";
import Message from "../ChatComponents/message/Message";
import {Input} from "../Form/Input";
import {ArrowForwardIcon, PhoneIcon} from "@chakra-ui/icons";
import DoLogin from "../../pages/DoLogin";
import React, {useEffect, useRef, useState} from "react";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment"
import {bool} from "yup";
import io from "socket.io-client"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from 'simple-peer';
import {IconButton} from "@chakra-ui/core";
import {supabase} from "../../utils/supabaseClient";
import Cookies from "js-cookie";
import {NavSection} from "../Sidebar/NavSection";
import {RiDashboardLine} from "react-icons/ri";
import {NavLink} from "../Sidebar/NavLink";
// interface Navigator {
//
//     getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
// }

interface Users {
    username : string;
}
 // UNIP - const socket = io(`https://10.19.1.4:3001`, { transports: ["websocket"] });
const socket = io(`https://192.168.0.14:3001`, { transports: ["websocket"] });
export function CallComponent(){
    const [ me, setMe ] = useState("")
    const [ stream, setStream ] = useState()
    const [ receivingCall, setReceivingCall ] = useState(false)
    const [ caller, setCaller ] = useState("")
    const [ callerSignal, setCallerSignal ] = useState()
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ idToCall, setIdToCall ] = useState("")
    const [ callEnded, setCallEnded] = useState(false)
    const [ name, setName ] = useState("")
    const [ users, setUsers ] = useState<Users[]>([]);
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef= useRef()

    useEffect(() => {
        setInterval(async () => {
            const { data, error, status } = await  supabase
                                                    .from('users')
                                                    .select('username')
                                                    .neq('username', Cookies.get('actualUser'));
            setUsers(data);
        }, 1000)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            // @ts-ignore
            setStream(stream)
            // @ts-ignore
            myVideo.current.srcObject = stream;
        })

        socket.on("me", async (id) => {
            console.log('meeee')
            console.log(id)
            setMe(id)

            const {data, error} = await supabase
                .from('users')
                .update({video_code: id})
                .match({username : Cookies.get('actualUser')})
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            // @ts-ignore
            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall =() =>  {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            // @ts-ignore
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        // @ts-ignore
        connectionRef.current.destroy()
    }

    return(
        <>
            <VStack>
                <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish: me {me}</h1>

                <NavSection title="GERAL" >
                    <NavLink icon={RiDashboardLine} href="/dashboard">DashBoard</NavLink>
                    {users.map(user => {
                        return <NavLink icon={RiDashboardLine} href="">DashBoard</NavLink>
                    })}
                </NavSection>
            </VStack>


            <div className="container">
                <div className="video-container">
                    <div className="video">
                        {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "0.5px", height: "0.5px" }} />}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "0.5px", height: "0.5px" }} />:
                            null}
                    </div>
                </div>
                <div className="myId">
                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                            Copy ID
                        </Button>
                    </CopyToClipboard>

                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <Button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                            </Button>
                        )}
                        {idToCall}
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}