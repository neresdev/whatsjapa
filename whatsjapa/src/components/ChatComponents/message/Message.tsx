import React from 'react';
import { Text } from '@chakra-ui/react';
interface MessageProps{
    text: string;
    author:string;
    bot: boolean;
}
export default function Message({text, author, bot}:MessageProps){
    return  (
        <>
            {bot ? (
                <Text as={"span"} color={"darkgray"} textAlign={"center"} fontSize={"14px"}>{text}</Text>
            ) : (
                <Text
                    as={"span"}
                    // w={"fit-content"}
                    w={"100%"}
                    h={"fit-content"}
                    // bgColor={"can"}
                    borderRadius={"5px"}
                    p={"5px"}
                    m={"3px"}

                >
					<Text
                        fontWeight={"600"}
                        margin={"5px 5px 5px 0px"}
                        color={"green"}

                    >{author}:  </Text>
					<Text
                       borderRadius={"5px"}
                       width={"100%"}
                       listStyleType={"none"}
                    >{text}</Text>
				</Text>
            )}
        </>
    );
}