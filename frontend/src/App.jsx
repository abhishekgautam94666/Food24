import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity";
import OwnerDashboard from "./components/OwnerDashboard";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import OwnerRoute from "./routes/OwnerRoute";
import EditItem from "./pages/EditItem";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import CartPage from "./components/CartPage";
import CheckOut from "./pages/CheckOut";

export const serverUrl = "http://localhost:8000";

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  useGetItemsByCity()
  const { userData } = useSelector(state => state.user)
  return (
    <>
     
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" replace />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        {/* <Route path="/create-edit-shop" element={!userData ? < CreateEditShop /> : <Navigate to={"/"} />} /> */}
        <Route path="/create-edit-shop" element={<OwnerRoute>< CreateEditShop /></OwnerRoute>} />
        <Route path="/add-food" element={<OwnerRoute>
          <AddItem />
        </OwnerRoute>} />
        <Route
          path="/edit-item/:itemId"
          element={

            <EditItem />

          }
        />
        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
        />

        <Route
          path="/checkout"
          element={userData ? < CheckOut/> : <Navigate to={"/signin"} />}
        />

      </Routes>
    </>
  );

}

export default App;
