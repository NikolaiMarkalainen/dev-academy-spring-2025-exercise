import "../index.css";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { Typography, Paper, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, CircularProgress, Skeleton, Box } from "@mui/material";
import { FilterOptions, HeadCells } from "../types/types";



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
   setFilterOption, direction, paginationData, loading, error, setCurrentPage, setItemsOnPage 
  } = usePagnitaionRequest();

  // Skeleton for load phase
  if (loading || !paginationData?.data) {
    return (
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh"}} > 
      
      <CardHeader subheader={<Skeleton/>} title={
          <Skeleton
          height={80}>
      </Skeleton>
        } />
        <TableContainer sx={{mt: "4rem"}}>
            <Table>
            <TableHead>
              <TableRow>
                {Array.from({length: 5}).map((_,key) => (
              <TableCell key={key}>
                  <Skeleton ></Skeleton>
              </TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({length: 10}).map((_, indx) => (
                <TableRow key={indx}>
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
            </Table> 
          </TableContainer>
      <section style={{ display: "flex", justifyContent: "flex-end" }}>
        <Skeleton
          width={250}
          height={50}
          animation="wave"
        />
      </section>

    </Paper>
    );
  }

  return (
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh"}} > 
      <CardHeader subheader="Daily data on electric consumption nation wide" title={
        <Typography component="h1" variant="h3">
          Electric Consumption
        </Typography>}
        sx={{ textAlign: "center" }} />
          <TableContainer sx={{mt: "4rem"}}>
            <Table>
            <TableHead>
                {HeadCells.map((hCell) => (
                  <TableCell align={hCell.label === "Date" ? "left" : "right"} key={hCell.id}>
                    <TableSortLabel>
                      {hCell.label}
                    </TableSortLabel>        
                  </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {paginationData?.data.items.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.date.toString()}</TableCell>
                  <TableCell align="right">{point.averagePrice}</TableCell>
                  <TableCell align="right">{point.dailyConsumption}</TableCell>
                  <TableCell align="right">{point.production}</TableCell>
                  <TableCell align="right">{point.negativePriceLength}</TableCell>
              </TableRow>
            ))}
            </TableBody>

            </Table> 
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={paginationData?.data.totalItems}
            rowsPerPage={10}
            // mui 0 based
            page={paginationData.data.pageIndex - 1 }
            onPageChange={(_, newPage: number) => {setCurrentPage(newPage)}} 
            onRowsPerPageChange={(e) => {setItemsOnPage(parseInt(e.target.value, 10))}}
          />
    </Paper>
  );
};
