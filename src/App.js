import { useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Login from "./features/authentication/login/Login"; // Ensure correct import path

function App() {
  const { user } = useSelector((state) => state?.auth);

  const getDefaultRoute = () => {
    const RoleId = user?.RoleId;
    console.log("Role id = ", RoleId);
    switch (RoleId) {
      case 1:
        return "/hospital";
      case 2:
        return "/doctor";
      case 3:
        return "/lab";
      case 4:
        return "/reception";
      case 5:
          return "/accountant";
      default:
        return "/login";
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {user ? (
          <Route path="*" element={<AppRoutes getDefaultRoute={getDefaultRoute} />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
