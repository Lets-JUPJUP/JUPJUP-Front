import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import LoginSettingsPage from "./pages/Login/LoginSettingsPage";
import CreatePlogPage from "./pages/Plogging/CreatePlogPage";
function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="login-settings" element={<LoginSettingsPage />} />
      <Route path="create-plogging" element={<CreatePlogPage />} />
    </Routes>
  );
}

export default App;
