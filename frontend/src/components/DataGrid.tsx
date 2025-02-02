import { IPaginatedData } from "../types/IPaginatedData";
import "../index.css";
interface props {
  data: IPaginatedData;
}

export const DataGrid = (props: props) => {
  return (
    <div className="data-grid">
      <div className="grid-header">
        <div>Date</div>
        <div>Daily Consumption</div>
        <div>Production</div>
        <div>Negative Price Length</div>
        <div>Average Price</div>
      </div>
      {props.data.items.map((m) => (
        <div key={m.id} className="grid-row">
          <div>{m.date.toString()}</div>
          <div>{m.dailyConsumption}</div>
          <div>{m.production}</div>
          <div>{m.negativePriceLength.length}</div>
          <div>{m.averagePrice}</div>
        </div>
      ))}
    </div>
  );
};
