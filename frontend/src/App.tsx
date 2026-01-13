import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { SingleDayView } from "./components/SingleDayView";
import { ThemeProvider } from "@emotion/react";
import theme from "./style/theme";
export const App = () => {
  return (
    <ThemeProvider theme={theme} >
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path="/date/:date" element={<SingleDayView />} />
    </Routes>
    </ThemeProvider>
  );
};

export default App;
