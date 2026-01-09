import "../index.css";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { MainDataGrid } from "./MainDataGrid";
import { Button } from "./shared/Button";
import { Card, CardHeader, keyframes, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    adjustedAmountOfItemsOnPage,
    changePage,
    setOrderDirection,
    setFilterOption,
    paginationData,
    asc,
  } = usePagnitaionRequest();
  console.log(paginationData)
  return (
    <Card>
      <CardHeader subheader="Daily data on electric consumption nation wide" title="Electric Consumption" sx={{ textAlign: "center"}}/>
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
              {paginationData?.data.items.map((m) => (
                <TableRow>
                  {Object.entries(m).map(([key, val]) => (
                  <TableCell key={key}>{val}</TableCell>
                  ))}
              </TableRow>
            ))}
            </TableBody>
            </Table> 
          </TableContainer>
    </Card>
  );
};
