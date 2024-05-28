import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import MallChainPage from "./pages/MallChainPage";
import MallsPage from "./pages/MallsPage";
import StorePage from "./pages/StorePage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import LoginPageWorker from "./pages/LoginPageWorker";
import OrdersPage from "./pages/OrdersPage";
import WorkerProfilePage from "./pages/WorkerProfilePage";
import MyShiftsPage from "./pages/MyShiftsPage";
import UserPage from "./components/UserPage";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import WorkersPage from "./pages/WorkersPage";
import ShiftsPage from "./pages/ShiftsPage";
import CreateWorkerPage from "./pages/CreateWorkerPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login/user" element={<LoginPage />} />
                <Route path="/login/worker" element={<LoginPageWorker />} />
                <Route path="/login/admin" element={<LoginPageAdmin />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="/malls" element={<MallChainPage />} />
                <Route path="/mallChain/:id" element={<MallsPage />} />
                <Route path="/mall/:id" element={<StorePage />} />
                <Route path="/store/:id" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/myOrders" element={<MyOrdersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile/worker" element={<WorkerProfilePage />} />
                <Route path="/myShifts" element={<MyShiftsPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/workers" element={<WorkersPage />} />
                <Route path="/worker/create" element={<CreateWorkerPage />} />
                <Route path="/shifts/:id" element={<ShiftsPage />} />
                <Route path="/attendance" element={<AttendancePage />} />


            </Routes>
      </div>
  );
}

export default App;
