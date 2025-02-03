import { IPaginatedData } from "../types/IPaginatedData";
import "../index.css";
import { FilterOptions } from "../types/IPaginatedRequest";
import { getDropDownOptions } from "../helpers/helpers";
import { Input } from "./shared/Input";
import { useNavigate } from "react-router-dom";

interface props {
  data: IPaginatedData;
  setFilterOptions: (option: FilterOptions) => void;
  asc: boolean;
  setOrderDirection: () => void;
  setAmountOfItemsOnPage: (val: number) => void;
}

export const MainDataGrid = (props: props) => {
  const options = getDropDownOptions();
  const navigate = useNavigate();

  console.log(options);
  return (
    <div className="data-grid">
      <div className="select-items">
        <p onClick={() => props.setAmountOfItemsOnPage(10)}>10</p>
        <p onClick={() => props.setAmountOfItemsOnPage(25)}>25</p>
        <p onClick={() => props.setAmountOfItemsOnPage(50)}>50</p>
        <p onClick={() => props.setAmountOfItemsOnPage(100)}>100</p>
      </div>
      <div className="grid-header">
        {options.map((m) => (
          <div key={m.key} onClick={() => props.setFilterOptions(m.key)}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="ascdesc" onClick={() => props.setOrderDirection()}>
        {props.asc ? "🔼" : "🔽"}
      </div>
      {props.data.items.map((m) => (
        <div
          key={m.id}
          className="grid-row"
          onClick={() =>
            navigate(`/${new Date(m.date).toISOString().split("T")[0]}`)
          }>
          <div>{new Date(m.date).toLocaleDateString().toString()}</div>
          <div>{m.averagePrice.toFixed(2)}</div>
          <div>{Math.round(m.dailyConsumption / 1000)}</div>
          <div>{m.negativePriceLength.length}</div>
          <div>{Math.round(m.production)}</div>
        </div>
      ))}
    </div>
  );
};
