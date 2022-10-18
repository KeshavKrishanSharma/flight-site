import "antd/dist/antd.min.css";
import "./resources/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminFlights from "./pages/Admin/AdminFlights";
import BookNow from "./pages/BookNow";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />{" "}
              </ProtectedRoute>
            }
          />
           <Route
            path="/book-now/:id"
            element={
              <ProtectedRoute>
                <BookNow />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <AdminHome />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/flights"
            element={
              <ProtectedRoute>
                <AdminFlights />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
