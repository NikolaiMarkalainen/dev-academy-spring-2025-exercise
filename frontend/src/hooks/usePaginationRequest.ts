import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "../types/IPaginatedRequest";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { IPaginatedResult } from "../types/IPaginationResult";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

export const usePagnitaionRequest = () => {
  const [filterBy, setFilterBy] = useState<FilterOptions>(FilterOptions.Date);
  const [asc, setAsc] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsOnPage, setItemsOnPage] = useState<number>(15);
  const [requestBody, setRequestBody] = useState<IPaginatedRequst>({
    filter: filterBy,
    orderBy: asc,
    pageIndex: currentPage,
    pageSize: itemsOnPage,
  });
  const [paginationData, setPaginationData] = useState<IPaginatedResult>();

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
  };
};
