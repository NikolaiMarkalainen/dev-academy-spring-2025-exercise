interface props {
  title: string;
}

export const Header = (props: props) => {
  return (
    <div className="header-container">
      <h1>{props.title}</h1>
    </div>
  );
};
