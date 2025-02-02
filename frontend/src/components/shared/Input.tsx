interface props {
  onInputStringChange?: (text: string) => void;
  onInputIntChange?: (text: number) => void;
}

export const Input = (props: props) => {
  return (
    <div>
      {props.onInputIntChange && (
        <input
          type="number"
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
