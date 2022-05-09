import {useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Text,
    useBreakpointValue, Center
} from "@chakra-ui/react";
import {Header} from "../components/Header";
import {Sidebar} from "../components/Sidebar";
import Link from "next/link";
import {RiAddLine} from "react-icons/ri";
import {Pagination} from "../components/Pagination";

export default function DoLogin(){
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    return (
        <>
            <Flex mb="8" justify="space-between" alig="center" justifyContent={"center"}>
                <Heading size="lg"  fontWeight="normal"> Faça o login </Heading>
            </Flex>
            <Center>
              <Text>Você não está em uma sessão em nossa plataforma. Clique no íncone na navegação à esquerda para efetuar o login</Text>
            </Center>
        </>
    );
}