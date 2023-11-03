import { Routes, Route } from "react-router-dom";
import PloggingListPage from "./pages/PloggingListPage";

function App() {
  return (
    <Routes>
      <Route path="/plogging-list" element={<PloggingListPage />} />
    </Routes>
  );
}

export default App;
