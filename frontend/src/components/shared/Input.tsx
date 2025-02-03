import "./shared.css";

interface props {
  onInputStringChange?: (text: string) => void;
  onInputIntChange?: (text: number) => void;
  headerText?: string;
}

export const Input = (props: props) => {
  return (
    <div>
      <h3>{props.headerText ?? ""}</h3>
      {props.onInputIntChange && (
        <input
          className="input"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && props.onInputIntChange)
              props.onInputIntChange(value);
          }}></input>
      )}
    </div>
  );
};
