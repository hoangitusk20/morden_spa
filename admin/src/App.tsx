import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Staff from "./pages/Staff";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/staff" element={<Staff />} />
          </Route>

          {/* Redirect any unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
