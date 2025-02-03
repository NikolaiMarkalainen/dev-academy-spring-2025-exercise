import { IPaginatedData } from "../types/IPaginatedData";
import "../index.css";
import { FilterOptions } from "../types/IPaginatedRequest";
import { getDropDownOptions } from "../helpers/helpers";
import { Input } from "./shared/Input";

interface props {
  data: IPaginatedData;
  setFilterOptions: (option: FilterOptions) => void;
  asc: boolean;
  setOrderDirection: () => void;
  setAmountOfItemsOnPage: (val: number) => void;
}

export const DataGrid = (props: props) => {
  const options = getDropDownOptions();
  console.log(options);
  return (
    <div className="data-grid">
      <div className="input-container">
        <Input onInputIntChange={props.setAmountOfItemsOnPage} />
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
        <div key={m.id} className="grid-row">
          <div>{new Date(m.date).toLocaleDateString().toString()}</div>
          <div>{Math.round(m.dailyConsumption)}</div>
          <div>{Math.round(m.production)}</div>
          <div>{m.negativePriceLength.length}</div>
          <div>{Math.round(m.averagePrice)}</div>
        </div>
      ))}
    </div>
  );
};
