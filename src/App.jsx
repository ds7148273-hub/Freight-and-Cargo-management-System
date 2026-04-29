import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Services from "./Components/Services";
import TrackingShipment from "./Components/TrackingShipment";
import UserDashboard from "./Components/UserDashboard";
import { useAuth } from "./context/AuthContext";

const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"} replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/tracking" element={<TrackingShipment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<RoleRedirect />} />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
