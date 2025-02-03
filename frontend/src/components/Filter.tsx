import { getDropDownOptions } from "../helpers/helpers";
import { FilterOptions } from "../types/IPaginatedRequest";
import { Button } from "./shared/Button";
import { Dropdown } from "./shared/Dropdown";
import { Input } from "./shared/Input";

interface props {
  setAsc: () => void;
  setFilterOptions: (option: FilterOptions) => void;
  setItemsOnPage: (amount: number) => void;
  // potentially add to display hourly rates
}

const options = getDropDownOptions();

export const Filter = (props: props) => {
  return (
    <div className="filter">
      <Input
        headerText="Amount of items per page"
        onInputIntChange={props.setItemsOnPage}
      />
      <Dropdown
        headerText="Sort items by"
        dropDownOptions={options}
        onSelect={props.setFilterOptions}
      />
      <Button
        headerText="Sort direction"
        function={props.setAsc}
        text="Direction"
      />
    </div>
  );
};
