import { CallComponent } from '../../components/CallComponents/CallComponent';
import {Box, Flex} from "@chakra-ui/react";
import {Header} from "../../components/Header";
import {Sidebar} from "../../components/Sidebar";
import DoLogin from "../DoLogin";
import React from "react";
import Navigator  from 'react-browser-navigator'
export default function Call(){

    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" paddingRight={["4","0"]} px={["4","4","6"]}>
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" alig="center">
                        <CallComponent />
                    </Flex>
                </Box>
            </Flex>
        </Box>

    )
}