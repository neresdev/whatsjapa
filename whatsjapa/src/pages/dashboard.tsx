import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'

import { Header } from '../components/Header';
import dynamic from 'next/dynamic';
import { Sidebar } from '../components/Sidebar';
import { ApexOptions } from 'apexcharts';
import Cookies from "js-cookie";
import DoLogin from "./DoLogin";
import {useEffect, useState} from "react";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})
const options : ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'category',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
        "Janeiro"
      , "Fevereiro"
      , "Março"
      , "Abril"
      , "Maio"
      , "Junho"
      , "Julho"
      , "Agosto"
      , "Setembro"
      , "Outubro"
      , "Novembro"
      , "Dezembro"
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}
const series = [
  { name: 'series1', data: [34,255,2545,2435,156,7564,546,76,33,356,6743,2] }
]

// const [username, setUsername] = useState(Cookies.get('actualUser'));

export default function Dashboard(){
  const [logged, setLogged] = useState(true);
  useEffect(() => {
    setLogged(Cookies.get('actualUser') !== undefined);
  }, [])
  return(

    <Flex direction="column" h="100vh">

      <Header/>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"

          >
            {logged?
                <>
                  <Text fontSize="lg" mb="4"> Média de usuários novos por semana: </Text>
                  <Chart options={options} series={series} type="area" height={160}/>
                </>
                :
            <DoLogin />
            }

          </Box>

          {/*<Box*/}
          {/*  p={["6", "8"]}*/}
          {/*  bg="gray.800"*/}
          {/*  borderRadius={8}*/}
          {/*  pb="4"*/}

          {/*>*/}
          {/*  <Text fontSize="lg" mb="4"> Taxa de abertura </Text>*/}
          {/*  <Chart options={options} series={series} type="area" height={160}/>*/}
          {/*</Box>*/}
        </SimpleGrid>
      </Flex>
    </Flex>

  );
}
