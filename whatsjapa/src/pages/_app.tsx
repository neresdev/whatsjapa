import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../hooks/useSidebar';
import { makeServer } from '../services/mirage/index';
// if(process.env.NODE_ENV === 'development') {
//   makeServer();
// }
function MyApp({ Component, pageProps }: AppProps) {
  return(
    // <QueryClientProvider >
      <>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      </>

      // </QueryClientProvider>
 )
}

export default MyApp
