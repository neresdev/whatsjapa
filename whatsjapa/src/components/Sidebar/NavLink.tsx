import { Link as ChackraLink, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { ElementType } from 'react';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';
interface NavLinkProps extends ChakraLinkProps{
  icon: ElementType; //nome do elemento
  children: string;
  href: string;
}
export function NavLink({ icon, children, href, ...other }: NavLinkProps){
  return(
    <ActiveLink href={href} passHref shouldCurrentHref>
      <ChackraLink display="flex" align="center" {...other}>
        <Icon as={icon} fontSize="20"/>
        <Text ml="4" fontWeight="medium" >{children}</Text>
      </ChackraLink>
    </ActiveLink>
  );
}
