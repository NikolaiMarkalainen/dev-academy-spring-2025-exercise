import "./shared.css";

interface IProps {
  function?: () => void;
  text: string;
}

export const Button = (props: IProps) => {
  return (
    <button
      onClick={() => (props.function ? props.function() : console.log("asd"))}
      className="button">
      {props.text}
    </button>
  );
};
