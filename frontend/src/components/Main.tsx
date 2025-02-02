import { useEffect } from "react";
import "../index.css";
import { getPaginatedDailyValues } from "../services/electricitySerivce";
import { IPaginatedRequst } from "../types/IPaginatedRequest";

export const Main = () => {
  const test: IPaginatedRequst = {
    orderBy: true,
    pageSize: 20,
    pageIndex: 1,
    filter: 1,
  };
  useEffect(() => {
    const result = getPaginatedDailyValues(test);
    console.log(result);
  }, []);
  return (
    <div>
      <>test</>
    </div>
  );
};
