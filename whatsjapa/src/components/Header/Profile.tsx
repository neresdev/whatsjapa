import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
interface ProfileProps{
  showProfileData: boolean;
}
export function Profile({ showProfileData }: ProfileProps){
    const [logged, setLogged] = useState(true);
    useEffect(() => {
        setLogged(Cookies.get('actualUser') !== undefined);
    }, [])
  return(
      logged ?
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{Cookies.get('actualUser')}</Text>
          {/*<Text color="gray.300" fontSize="small">{JSON.parse(Cookies.get('actualUser')).userName}</Text>*/}
        </Box>
      ) }
      <Avatar size="md" name={Cookies.get('actualUser')} />
    </Flex> :
          <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Usuário inexistente</Text>
                {/*<Text color="gray.300" fontSize="small">{JSON.parse(Cookies.get('actualUser')).userName}</Text>*/}
            </Box>
            {/*<Avatar size="md" name='error'/>*/}
          </Flex>

  );
}
