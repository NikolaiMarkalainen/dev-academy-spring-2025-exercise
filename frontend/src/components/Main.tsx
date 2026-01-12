import "../index.css";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { Paper, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, CircularProgress, Skeleton } from "@mui/material";
import { FilterOptions } from "../types/types";



// TODO:  Navigate last page
// Filter buttons visible on keys
// Can zoom out and zoom in
// Tailwind
// Utilize a component library
// Error handling to service fetch
// utilize url params for fetching data remove POST change to Query Params
// filter on mobile not visible
// playwright tests
// mobile view fix on graph views font increase
// add caching to backend perhaps ?
// move types to common types folder
export const Main = () => {
  const {
   setFilterOption, paginationData, loading, error, setCurrentPage, setItemsOnPage 
  } = usePagnitaionRequest();

  // Skeleton for load phase
  if (loading || !paginationData?.data) {
    return (
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh"}} > 
    <CardHeader sx={{textAlign: "center"}}  title={<Skeleton animation="pulse" />} subheader={<Skeleton animation="pulse"/>}>
        </CardHeader>  
        <TableContainer>
            <Table>
            <TableHead>
              <TableRow>
                {Object.entries(FilterOptions).map(([]) => (
              <TableCell>
                  <Skeleton width={50}></Skeleton>
              </TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({length: 10}).map((_) => (
                <TableRow>
                  <TableCell>
                  <Skeleton width={100}/>
                  </TableCell>
                  <TableCell>
                  <Skeleton width={100}/>
                  </TableCell>
                  <TableCell>
                  <Skeleton width={100}/>
                  </TableCell>
                  <TableCell>
                  <Skeleton width={100}/>
                  </TableCell>
                  <TableCell>
                  <Skeleton width={100}/>
                  </TableCell>
              </TableRow>
            ))}
            </TableBody>
          <Skeleton>
            <TablePagination
            sx={{mt: "auto"}}
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={10}
            rowsPerPage={10}
            page={1}
            onPageChange={(_, newPage: number) => {setCurrentPage(newPage)}} 
            onRowsPerPageChange={(e) => {setItemsOnPage(parseInt(e.target.value, 10))}}
          />
          </Skeleton>
            </Table> 
          </TableContainer>
    </Paper>
    );
  }

  return (
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh"}} > 
      <CardHeader subheader="Daily data on electric consumption nation wide" title="Electric Consumption" sx={{ textAlign: "center" }} />
          <TableContainer>
            <Table>
            <TableHead>
              <TableRow>
                {Object.entries(FilterOptions).map(([key, val]) => (
                  <TableCell key={key}>{val}</TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginationData?.data.items.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.date.toString()}</TableCell>
                  <TableCell>{point.averagePrice}</TableCell>
                  <TableCell>{point.dailyConsumption}</TableCell>
                  <TableCell>{point.production}</TableCell>
                  <TableCell>{point.negativePriceLength}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          <TablePagination
            sx={{mt: "auto"}}
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={paginationData?.data.totalItems}
            rowsPerPage={10}
            // mui 0 based
            page={paginationData.data.pageIndex - 1 }
            onPageChange={(_, newPage: number) => {setCurrentPage(newPage)}} 
            onRowsPerPageChange={(e) => {setItemsOnPage(parseInt(e.target.value, 10))}}
          />

            </Table> 
          </TableContainer>
    </Paper>
  );
};
