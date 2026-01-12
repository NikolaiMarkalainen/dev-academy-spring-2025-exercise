import { useEffect, useState } from "react";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { IDailyValues, IPaginatedResult} from "../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
export const usePagnitaionRequest = () => {
  const [paginationData, setPaginationData] = useState<IPaginatedResult>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();
  
  // url query params
  const sortBy = searchParams.get('sortBy') ?? "date";
  const order = (searchParams.get('order') as 'asc' | 'desc') ?? 'asc'
  const size = Number(searchParams.get('size') ?? 10);
  const page = Number(searchParams.get('page') ?? 1);

  // send default request for data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPaginatedDailyValues().then((result) => {
          if (result) {
            setPaginationData(result);
          }
        });
      } catch (e) {
        console.log(e);
        setError(true);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page,size,sortBy,order]);

  const handleSort = (column: keyof IDailyValues) => {
    setSearchParams(prev => {
      const currentSort = prev.get('sortBy');
      const currentOrder = prev.get('order') ?? 'asc';

      const nextOrder = currentSort === column && currentOrder === 'asc' ? 'desc' : 'asc';

      prev.set('sortBy', column);
      prev.set('order', nextOrder);

      prev.set('page', '1');
      return prev;
    }) 
  }

  const changeAmount = (rows: number) => {
    setSearchParams(prev => {
      prev.set('size', rows.toString());
      prev.set('page', '1');
      return prev;
    });
  };
  const changePage = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString())
      return prev;
    })
  }

  const viewDayDetails = (date: Date) => {
    navigate(`/date/${new Date(date).toISOString().split("T")[0]}`)
  }
  return {
    error,
    loading,
    paginationData,
    handleSort,
    order,
    sortBy,
    changeAmount,
    size,
    changePage,
    page,
    viewDayDetails,
  };
};
