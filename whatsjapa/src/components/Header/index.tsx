import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';
import { Profile } from './Profile';
import { NotificationsNav } from './NotificationsNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../hooks/useSidebar';
export function Header(){


  const { onOpen } = useSidebarDrawer();
  const isVisible = useBreakpointValue({
    base: false,
    lg: true
  });
    return(
      <Flex
        as="header"
        w="100%"
        maxWidth={1480}
        h="20"
        mx="auto"
        mt="4"
        px="6"
        align="center"
      >
      { !isVisible && (
        <IconButton
        aria-label="Open navigation"
        icon={<Icon as={RiMenuLine} />}
        fontSize="24"
        variant="unstyled"
        onClick={onOpen}
        mr="2"
        >

        </IconButton>
      ) }
        <Logo />
        {isVisible && (
          <SearchBox />
        )}
        <Flex align="center" ml="auto">
          <NotificationsNav />
          <Profile showProfileData={isVisible} />
        </Flex>
      </Flex>
    );
}
