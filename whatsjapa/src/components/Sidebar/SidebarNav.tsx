import { NavLink } from './NavLink';
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { BsFillTelephoneFill  } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
import { NavSection } from './NavSection';
import { Stack } from '@chakra-ui/react';
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {UndefinedUser} from "../Error/UndefinedUser";
import {useEffect, useState} from "react";
export function SidebarNav(){
    const [logged, setLogged] = useState(true);
    useEffect(() => {
        setLogged(Cookies.get('actualUser') !== undefined);
    }, [])
  return(

    <Stack align="flex-start" spacing="12">
      <NavSection title="GERAL" >
          {logged ?
              <>

              <NavLink icon={RiDashboardLine} href="/dashboard">DashBoard</NavLink>
              {/*<NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>*/}
              <NavLink icon={AiFillMessage} href="/chat">Chat</NavLink>
              <NavLink icon={BsFillTelephoneFill} href="/call">Ligação</NavLink>
              </> :
              <NavLink
                  icon={VscError}
                  _hover={{
                    bgColor: 'green',
                      color: 'green'
                   }}
                  href="/"
              >
                  Faça o login
              </NavLink>}
      </NavSection>
      {/*<NavSection title="AUTOMAÇÃO">*/}
      {/*  <NavLink icon={RiInputMethodLine} href="/forms" >Formuláros</NavLink>*/}
      {/*  <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>*/}
      {/*</NavSection>*/}
    </Stack>
  );
}
