import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { SingleDayView } from "./components/SingleDayView";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path=":date" element={<SingleDayView />} />
    </Routes>
  );
};

export default App;
