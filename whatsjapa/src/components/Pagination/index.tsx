import { Text, Stack, Box } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';
interface PaginationProps {
  totalRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}
const s_count = 1;
const generatePagesArray = (from: number, to: number) => {
  return [... new Array(to - from )].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}
export function Pagination ({
      totalRegisters,
      registerPerPage = 10,
      currentPage = 1,
      onPageChange
   } : PaginationProps

){
  const lastPage = Math.floor(totalRegisters / registerPerPage);
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage -1 - s_count, currentPage -1 )
    : [];

  const nextPages = currentPage < lastPage
    ?  generatePagesArray(currentPage, Math.min(currentPage + s_count, lastPage))
    : [];


  return(
    <Stack
      direction={["column","row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
    <Box>
      <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
    </Box>

      <Stack direction="row" spacing="2">

      {currentPage > (1 + s_count) && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > (2 -s_count) && <Text color="gray.300" width="8" textAlign="center"> ... </Text>}
        </>
      )}


        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        { (currentPage + s_count) < lastPage && (
          <>
            {(currentPage + 1 + s_count) < lastPage && <Text color="gray.300" width="8" textAlign="center"> ... </Text> }
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>

    </Stack>
  )
}
