import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "../types/IPaginatedRequest";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { IPaginatedResult } from "../types/IPaginationResult";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

export const usePagnitaionRequest = () => {
  const [filterBy, setFilterBy] = useState<FilterOptions>(FilterOptions.Date);
  const [asc, setAsc] = useState<boolean>(false);
  const date = new Date("2023-08-01T00:00:00Z");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsOnPage, setItemsOnPage] = useState<number>(15);
  const [requestBody, setRequestBody] = useState<IPaginatedRequst>({
    filter: filterBy,
    orderBy: asc,
    pageIndex: currentPage,
    pageSize: itemsOnPage,
  });
  const [paginationData, setPaginationData] = useState<IPaginatedResult>({
    data: {
      hasPreviousPage: false,
      hasNextPage: false,
      items: [
        {
          id: 1,
          date: date,
          averagePrice: 0,
          dailyConsumption: 0,
          negativePriceLength: { length: 0, hours: [0] },
          production: 0,
        },
      ],
      pageIndex: 1,
      totalPages: 1,
    },
    success: true,
    message: "",
  });

  useEffect(() => {
    setRequestBody({
      filter: filterBy,
      orderBy: asc,
      pageIndex: currentPage,
      pageSize: itemsOnPage,
    });
  }, [filterBy, asc, currentPage, itemsOnPage]);

  useEffect(() => {
    if (requestBody) {
      sendRequestForData(requestBody);
    }
  }, [requestBody]);

  const adjustedAmountOfItemsOnPage = useCallback((value: number) => {
    setItemsOnPage(value);
  }, []);

  const changePage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  const setOrderDirection = useCallback(() => {
    setAsc((prevAsc) => !prevAsc);
  }, []);

  const setFilterOption = useCallback((filter: FilterOptions) => {
    setFilterBy(filter);
  }, []);

  const sendRequestForData = async (requestBody: IPaginatedRequst) => {
    try {
      await getPaginatedDailyValues(requestBody).then((result) => {
        setPaginationData(result.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    adjustedAmountOfItemsOnPage,
    changePage,
    setOrderDirection,
    setFilterOption,
    paginationData,
    asc,
  };
};
