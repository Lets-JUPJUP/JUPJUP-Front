import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginSettingsPage from "./pages/Login/LoginSettingsPage";
import CreatePlogPage from "./pages/Plogging/CreatePlogPage";
import PloggingListPage from "./pages/Plogging/PloggingListPage";
import PloggingDetailPage from "./pages/Plogging/PloggingDetailPage";
import UserReportPage from "./pages/User/UserReportPage";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
      <Route path="create-plogging" element={<CreatePlogPage />} />
      <Route path="/plogging-list" element={<PloggingListPage />} />
      <Route path="/plogging-detail/:id" element={<PloggingDetailPage />} />
      <Route path="user-report" element={<UserReportPage />} />
    </Routes>
  );
}

export default App;
