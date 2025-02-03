import "./shared.css";

interface IProps {
  function?: () => void;
  changePage?: (number: number) => void;
  text: string;
  headerText?: string;
  disabled?: boolean;
  pageNumber?: number;
  color?: string;
}

export const Button = (props: IProps) => {
  const handleClick = () => {
    if (props.changePage && props.pageNumber !== undefined) {
      props.changePage(props.pageNumber);
    } else if (props.function) {
      props.function();
    } else {
      console.log("Button clicked but no function is provided.");
    }
  };

  return (
    <div style={{ padding: "0.5vw" }}>
      <h3>{props.headerText ?? ""}</h3>
      <button
        style={{ backgroundColor: props.color }}
        disabled={props.disabled}
        onClick={handleClick}
        className="button">
        {props.text}
      </button>
    </div>
  );
};
