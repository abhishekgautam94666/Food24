import React from "react";
import { useSelector } from "react-redux";
import UserOrderCard from "../components/UserOrderCard";
import useGetMyOrders from "../hooks/useGetMyOrders";
import OwnerOrderCard from "../components/OwnerOrderCard";
import useGetOwnerOrders from "../hooks/useGetOwnerOrders";


const MyOrders = () => {
  useGetMyOrders();
  useGetOwnerOrders()


  const { userData, myOrders, ownerOrders } = useSelector((state) => state.user);
  console.log("userData", userData);
  console.log("ownerOrders", ownerOrders);



  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {
        userData.role === "user" ? (
          <div className="space-y-6">
            {myOrders.map((order) => (

              <UserOrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : userData.role === "owner" ? (
          <div className="space-y-6">
            {ownerOrders.map((order) => (

              <OwnerOrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : userData.role === "deliveryBoy" ? (
          <div>dileveryboy</div>
        ) : (
          <p className="text-gray-500">No Order available</p>
        )
      }

    </div>
  );
};

export default MyOrders;