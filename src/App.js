import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginSettingsPage from "./pages/Login/LoginSettingsPage";
import CreatePlogPage from "./pages/Plogging/CreatePlogPage";
import PloggingListPage from "./pages/PloggingListPage";
import UserReportPage from "./pages/User/UserReportPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import MainPage from "./pages/Main/MainPage";
function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
      <Route path="create-plogging" element={<CreatePlogPage />} />
      <Route path="/plogging-list" element={<PloggingListPage />} />
      <Route path="user-report" element={<UserReportPage />} />
      <Route path="user-profile/:id" element={<UserProfilePage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
