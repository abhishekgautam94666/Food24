import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserOrderCard from "../components/UserOrderCard"
import useGetMyOrders from "../hooks/useGetMyOrders";
import OwnerOrderCard from "../components/OwnerOrderCard";
import useGetOwnerOrders from "../hooks/useGetOwnerOrders";
import { useEffect } from "react";
import { setOwnerOrders, updateRealtimeOrderStatus } from "../redux/userSlice";



const MyOrders = () => {
  useGetMyOrders();
  useGetOwnerOrders()


  const { userData, myOrders, ownerOrders, socket } = useSelector((state) => state.user);
  console.log('myorder', myOrders);
  const dispatch = useDispatch()
  console.log("socket", socket)

  useEffect(() => {

    socket?.on('newOrder', (data) => {
      console.log("new datra", data);
      if (data.shopOrders?.owner?._id == userData._id) {
        dispatch(setOwnerOrders([data, ...ownerOrders]))
      }
    })


    socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId?.toString() === userData?._id?.toString()) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
      }
    })

    return () => {
      socket?.off('newOrder')
      socket?.off('update-status')
    }
  }, [socket, dispatch])



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