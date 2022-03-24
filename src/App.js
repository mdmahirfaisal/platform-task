import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import DashboardHome from './components/Dashboard/DashboardHome/DashboardHome';
import AddUser from "./components/Dashboard/AddUser/AddUser";
import UsersList from "./components/Dashboard/UsersList/UsersList";
import ManageUsers from "./components/Dashboard/ManageUsers/ManageUsers";
import NotFound from "./components/NotFound/NotFound";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/Firebase/PrivateRoute";
import EditUser from "./components/Dashboard/EditUser/EditUser";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />

            {/* Dashboard route  */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardHome /></PrivateRoute>}>
              <Route path="/dashboard/addUser" element={<PrivateRoute><AddUser /></PrivateRoute>} />
              <Route path="/dashboard/usersList" element={<PrivateRoute><UsersList /></PrivateRoute>} />
              <Route path="/dashboard/manageUsers" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
              <Route path="/dashboard/editUser/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
              <Route exact path="/dashboard" element={<UsersList />} />
            </Route>

            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
