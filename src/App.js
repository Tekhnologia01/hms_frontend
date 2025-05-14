// import { useSelector } from "react-redux";
// import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import Login from "./features/authentication/login/Login"; // Ensure correct import path

// function App() {
//   const { user } = useSelector((state) => state?.auth);

//   const getDefaultRoute = () => {
//     const RoleId = user?.RoleId;
//     console.log("Role id = ", RoleId);
//     switch (RoleId) {
//       case 1:
//         return "/hospital";
//       case 2:
//         return "/doctor";
//       case 3:
//         return "/lab";
//       case 4:
//         return "/reception";
//       case 5:
//           return "/accountant";
//       default:
//         return "/login";
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         {user ? (
//           <Route path="*" element={<AppRoutes getDefaultRoute={getDefaultRoute} />} />
//         ) : (
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { useDispatch, useSelector } from "react-redux";
// import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import Login from "./features/authentication/login/Login";
// import Register from "./features/authentication/register/Register";
// import CheckEmail from "./features/authentication/forgotPassword/CheckEmail";
// import EnterEmail from "./features/authentication/forgotPassword/EnterEmail";
// import PasswordReset from "./features/authentication/forgotPassword/PasswordReset";
// import SetnewPassowrd from "./features/authentication/forgotPassword/SetnewPassword";
// import EnterOtp from "./features/authentication/forgotPassword/CheckEmail";
// import { toast } from "react-toastify";

// import { isTokenExpired } from "../src/utils/auth";
// import { logout } from "./redux/slices/authSlice";
// import { useEffect } from "react";

// function App() {
//   const { user } = useSelector((state) => state?.auth);




   
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.currentUserToken);

//   useEffect(() => {
//     if (token && isTokenExpired(token)) {
//       dispatch(logout());
//       navigate("/login");
//     }
//   }, [token, dispatch, navigate]);

//   const getDefaultRoute = () => {
//     const RoleId = user?.RoleId;
//     console.log("getDefaultRoute: RoleId =", RoleId, "User =", user);
//     switch (RoleId) {
//       case 1:
//         return "/hospital";
//       case 2:
//         return "/doctor";
//       case 3:
//         return "/lab";
//       case 4:
//         return "/reception";
//       case 5:
//         return "/accountant";
//       default:
//         return "/login";
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/checkemail/:email" element={<EnterOtp />} />
//         <Route path="/enteremail" element={<EnterEmail />} />
//         <Route path="/passwordreset" element={<PasswordReset />} />
//         <Route path="/setpassword/:email" element={<SetnewPassowrd />} />

//         {/* Protected Routes */}
//         <Route
//           path="*"
//           element={
//             user ? (
//               <AppRoutes getDefaultRoute={getDefaultRoute} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Login from "./features/authentication/login/Login";
import Register from "./features/authentication/register/Register";
import EnterOtp from "./features/authentication/forgotPassword/CheckEmail";
import EnterEmail from "./features/authentication/forgotPassword/EnterEmail";
import PasswordReset from "./features/authentication/forgotPassword/PasswordReset";
import SetnewPassowrd from "./features/authentication/forgotPassword/SetnewPassword";
import AppRoutes from "./routes/AppRoutes";

import { isTokenExpired } from "./utils/auth";
import { logout } from "./redux/slices/authSlice";

function App() {
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.currentUserToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  const getDefaultRoute = () => {
    const RoleId = user?.RoleId;
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
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkemail/:email" element={<EnterOtp />} />
      <Route path="/enteremail" element={<EnterEmail />} />
      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/setpassword/:email" element={<SetnewPassowrd />} />

      {/* Protected Routes */}
      <Route
        path="*"
        element={
          user ? (
            <AppRoutes getDefaultRoute={getDefaultRoute} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
