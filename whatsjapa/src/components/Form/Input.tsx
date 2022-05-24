import {FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, InputGroup, InputRightElement} from "@chakra-ui/react";
import { LockIcon, UnlockIcon} from '@chakra-ui/icons';
import { useState } from 'react';
interface InputProps extends ChakraInputProps{
    name: string;
    label?: string;
    type: string
}


export function Input({name, label, type, ...rest}: InputProps){
    const [visible, setVisible] = useState(false);
    const returnType = ( visi ) => {
        return visi ? 'text' : 'password';
    }
    return (
        <FormControl>
             { !!label && <FormLabel htmlFor={name}> {label} </FormLabel> }
            <InputGroup >
                <ChakraInput
                    name={name}
                    id={name}
                    type={type === 'password' ? returnType(visible) : type }
                    focusBorderColor="green"
                    bgColor="gray.900"
                    variant="flushed"
                    _hover={{
                        bgColor: 'gray.900'
                    }}
                    borderColor='green'
                    size="lg"
                    {...rest}
                />
                {
                    type === 'password' && <InputRightElement onClick={() => setVisible(!visible)} children={ visible ? <UnlockIcon /> : <LockIcon /> }/>
                }

            </InputGroup>
        </FormControl>
    )
}
