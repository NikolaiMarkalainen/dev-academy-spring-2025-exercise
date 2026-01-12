import "../index.css";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { Typography, Paper, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, CircularProgress, Skeleton, Box } from "@mui/material";
import { HeadCells } from "../types/types";



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
  paginationData, loading, error, order, sortBy, handleSort, changeAmount, size, changePage, viewDayDetails
  } = usePagnitaionRequest();

  // Skeleton for load phase build a quick spin when data already is on the page
  if (error) {
    return(
    <Paper sx={{ p: "4rem", m: "4rem", minHeight: "70vh", borderRadius: "1rem" }} >
      <Typography>
        Something went wrong
      </Typography>
    </Paper>
    );
  }
  if (loading && !paginationData?.data || !paginationData?.data) {
    return (
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh", borderRadius:"1rem"}} > 
      
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
    <Paper sx={{p: "4rem", m: "4rem", minHeight: "70vh", borderRadius:"1rem"}} > 
      <CardHeader subheader="Daily data on electric consumption nation wide" title={
        <Typography component="h1" variant="h3">
          Electric Consumption
        </Typography>}
      />
          <TableContainer sx={{mt: "4rem"}}>
            <Table>
            <TableHead>
                {HeadCells.map((hCell) => (
                  <TableCell align={hCell.label === "Date" ? "left" : "right"} key={hCell.id} sortDirection={sortBy === hCell.id ? order : false}>
                    <TableSortLabel
                    active={sortBy === hCell.id}
                      direction={sortBy === hCell.id ? order : "asc"}
                    onClick={() => handleSort(hCell.id)}>
                      {hCell.label}
                    </TableSortLabel>        
                  </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {paginationData?.data.items.map((point) => (
                <TableRow key={point.id} onClick={() => {viewDayDetails(point.date)}} sx={{ cursor:'pointer'}}>
                  <TableCell>{new Date(point.date).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{point.averagePrice}</TableCell>
                  <TableCell align="right">{point.dailyConsumption}</TableCell>
                  <TableCell align="right">{point.negativePriceLength}</TableCell>
                  <TableCell align="right">{point.production}</TableCell>
              </TableRow>
            ))}
            </TableBody>

            </Table> 
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={paginationData?.data.totalItems}
            rowsPerPage={size}
            // mui 0 based
            page={paginationData.data.pageIndex - 1}
            onPageChange={(_, newPage: number) => {changePage(newPage + 1)}} 
            onRowsPerPageChange={(e) => {changeAmount(parseInt(e.target.value, 10))}}
          />
    </Paper>
  );
};
