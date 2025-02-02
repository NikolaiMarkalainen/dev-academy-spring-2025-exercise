import { useEffect } from "react";
import "../index.css";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { FilterOptions, IPaginatedRequst } from "../types/IPaginatedRequest";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";

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
      <button onClick={() => adjustedAmountOfItemsOnPage(25)}>
        adjust ITems
      </button>
      <button onClick={() => setOrderDirection()}> order direction</button>
      <button onClick={() => changePage(2)}>set page to 2</button>
      <button onClick={() => setFilterOption(FilterOptions.Production)}>
        asdas
      </button>
      <>test</>
      {paginationData?.data.items[0].averagePrice}
    </div>
  );
};
