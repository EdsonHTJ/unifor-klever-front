import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalisisPage from "./pages/AnalisisPage";
import CheckerPage from "./pages/CheckerPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/analisis" element={<AnalisisPage />}></Route>
          <Route path="/" element={<CheckerPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
