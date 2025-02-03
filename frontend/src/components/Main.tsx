import { useEffect, useState } from "react";
import "../index.css";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { FilterOptions, IPaginatedRequst } from "../types/IPaginatedRequest";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { Filter } from "./Filter";
import { DataGrid } from "./DataGrid";
import { Header } from "./Header";
import { Button } from "./shared/Button";

export const Main = () => {
  const test: IPaginatedRequst = {
    orderBy: true,
    pageSize: 20,
    pageIndex: 1,
    filter: 1,
  };
  const {
    adjustedAmountOfItemsOnPage,
    changePage,
    setOrderDirection,
    setFilterOption,
    paginationData,
    asc,
  } = usePagnitaionRequest();

  const [previousNumberButtons, setPreviousButtons] = useState<number[]>([]);

  const generatePaginationButtons = () => {};

  console.log(paginationData);
  return (
    <div>
      <Header />
      {/* <Filter
        setAsc={setOrderDirection}
        setFilterOptions={setFilterOption}
        setItemsOnPage={adjustedAmountOfItemsOnPage}
      /> */}
      {paginationData?.data && (
        <div>
          <DataGrid
            data={paginationData.data}
            setOrderDirection={setOrderDirection}
            setFilterOptions={setFilterOption}
            setAmountOfItemsOnPage={adjustedAmountOfItemsOnPage}
            asc={asc}
          />
          <div className="page-change">
            <Button
              text={"<"}
              disabled={!paginationData.data.hasPreviousPage}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex - 1}
            />
            {paginationData.data.pageIndex - 1 > 1 && (
              <Button
                text={(paginationData.data.pageIndex - 1).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex - 1}
              />
            )}
            <Button
              text={paginationData.data.pageIndex.toString()}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex}
              color="#32363f"
            />
            {paginationData.data.pageIndex + 1 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 1).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 1}
              />
            )}
            {paginationData.data.pageIndex + 2 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 2).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 2}
              />
            )}
            {paginationData.data.pageIndex + 3 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 3).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 3}
              />
            )}
            <Button
              disabled={!paginationData.data.hasNextPage}
              text={">"}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};
