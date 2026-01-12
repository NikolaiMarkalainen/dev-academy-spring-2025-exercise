import { useCallback, useEffect, useState } from "react";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { IDailyValues, IPaginatedResult, FilterOptions} from "../types/types";
export const usePagnitaionRequest = () => {
  const [filterBy, setFilterBy] = useState<FilterOptions>(FilterOptions.Date);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsOnPage, setItemsOnPage] = useState<number>(15);
  // make default object not specifically used for anything more to avoid errors with
    const [direction, setDirection] = useState<boolean>(false);
  // uninitialized objects of this type being used around applicaiton
  const [paginationData, setPaginationData] = useState<IPaginatedResult>(
    // {
    // success: false,
    // message: "",
    // data: {
    //   items: [],
    //   pageIndex: 0,
    //   totalItems: 0,
    //   totalPages: 0,
    //   hasNextPage: false,
    //   hasPreviousPage: false
    // }
    // }
  );
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);

  // send default request for data 
  useEffect(() => {
      sendRequestForData();
  }, []);

  const adjustedAmountOfItemsOnPage = useCallback((value: number) => {
    setItemsOnPage(value);
  }, []);

  const changePage = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  const setFilterOption = useCallback((filter: FilterOptions) => {
    setFilterBy(filter);
  }, []);

  const sendRequestForData = async ()=> {
    try {
      await getPaginatedDailyValues().then((result) => {
        setTimeout(() => {
          if (result) {
            setPaginationData(result);
          }
        }, 5000);
      });
    } catch (e) {
      console.log(e);
      setError(true);
    }
    finally {
      setLoading(false);
    }
  };

  return {
    adjustedAmountOfItemsOnPage,
    changePage,
    error,
    loading,
    setFilterOption,
    setItemsOnPage,
    direction,
    setCurrentPage,
    paginationData,
  };
};
