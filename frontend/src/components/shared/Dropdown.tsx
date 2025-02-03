import { IDropDown } from "../../types/IDropDown";
import { Button } from "./Button";
import "./shared.css";

interface props {
  dropDownOptions: IDropDown[];
  onSelect: (option: any) => void;
  headerText?: string;
}

export const Dropdown = (props: props) => {
  return (
    <div className="dropdown-parent">
      <h3>{props.headerText ?? ""}</h3>
      <Button text="Select filter option" />
      <div className="dropdown-content">
        {props.dropDownOptions.map((m) => (
          <p key={m.key} onClick={() => props.onSelect(m.key)}>
            {m.text}
          </p>
        ))}
      </div>
    </div>
  );
};
