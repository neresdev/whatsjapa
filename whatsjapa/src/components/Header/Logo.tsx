import { Text } from '@chakra-ui/react'
export function Logo(){

  return(
    <Text
      fontSize={["2xl", "3xl" ]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      <Text as={'span'} color={'cyan'}>W</Text>hats<Text as={'span'} color={'cyan'}>J</Text>apa
    <Text color="cyan" as="span" ml="1">.</Text>
  </Text>
  )
}
