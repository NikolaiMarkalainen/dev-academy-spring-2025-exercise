import { useEffect } from "react";
import "../index.css";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { FilterOptions, IPaginatedRequst } from "../types/IPaginatedRequest";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { Filter } from "./Filter";
import { DataGrid } from "./DataGrid";

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
  } = usePagnitaionRequest();

  console.log(paginationData);
  return (
    <div>
      <Filter
        setAsc={setOrderDirection}
        setFilterOptions={setFilterOption}
        setItemsOnPage={adjustedAmountOfItemsOnPage}
      />
      {paginationData?.data && <DataGrid data={paginationData.data} />}
    </div>
  );
};
