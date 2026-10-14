import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from '../components/DeliveryBoyTracking';
import { useSelector } from 'react-redux';

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const navigate = useNavigate()
  const { socket } = useSelector(state => state.user)
  const [liveLocation, setLiveLocation] = useState({})
  console.log("currentOrder", currentOrder);


  const handleGetOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
      console.log(result.data);
      setCurrentOrder(result.data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!socket) {
      console.log("CUSTOMER SOCKET NOT AVAILABLE");
      return;
    }
    console.log("CUSTOMER SOCKET CONNECTED:", socket.connected);

    socket.on('updateDeliveryLocation', ({ deliveryBoyId, latitude, longitude }) => {
      console.log(
        "🔥 CUSTOMER RECEIVED LOCATION:",
        deliveryBoyId,
        latitude,
        longitude
      );
      setLiveLocation(prev => ({
        ...prev,
        [deliveryBoyId]: { lat: Number(latitude), lon: Number(longitude) }
      }))
    })

    //order deliver hone ke event 
    socket.on("orderDelivered", ({ orderId, shopOrderId }) => {
      console.log(
        "CUSTOMER RECEIVED ORDER DELIVERED:",
        orderId,
        shopOrderId
      );

      if (orderId === currentOrder?._id) {
        setCurrentOrder(prev => ({
          ...prev,

          shopOrders: prev.shopOrders.map(shopOrder => shopOrder._id === shopOrderId ? { ...shopOrder, status: "delivered" } : shopOrder)
        }))
      }
    })

    return () => {
      socket.off("updateDeliveryLocation")
      socket.off("orderDelivered");
    }
  }, [socket, currentOrder?._id])

  useEffect(() => {
    handleGetOrder()
  }, [orderId])
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <div className='relative flex items-center gap-4 top-5 left-5 z-10 mb-2.5' onClick={
        () => navigate("/")
      }>
        <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
        <h1>Track Order</h1>
      </div>

      {currentOrder?.shopOrders?.map((shopOrder, index) => (
        <div key={index} className='bg-white p-4 rounded-2xl shadow-md border border-orange-100 space-y-4'>
          <div>
            <p className='text-lg font-bold mb-2 text-[#ff4d3d]'>{shopOrder.shop.Name}</p>
            <p className="font-semibold"><span>Items: </span> {shopOrder?.shopOrderItems?.map(i => i.name).join(",")}</p>
            <p className="font-semibold"><span>Subtotal: </span>{shopOrder.subtotal}</p>
            <p className='mt-6'><span>Delivery address: </span>{currentOrder.deliveryAddress.text}</p>
          </div>
          {shopOrder.status != "delivered" ?
            <>
              {shopOrder.assignedDeliveryBoy ?
                <div className='text-sm text-gray-700'>
                  <p className='font-semibold'> <span>Delivery Boy Name : </span>{shopOrder.assignedDeliveryBoy.fullName}</p>
                  <p className='font-semibold'> <span>Delivery Boy Contact No : </span>{shopOrder.assignedDeliveryBoy.mobile}</p>
                </div> : <p>Delivery Boy is not assigned yet.</p>}
            </>
            : <p className='text-green-600 font-semibold text-lg'>Delivered</p>}

          {shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered" && < div className='h-100 w-full rounded-2xl overflow-hidden shadow-md'>
            <DeliveryBoyTracking data={
              {
                deliveryBoyLocation: liveLocation[shopOrder.assignedDeliveryBoy._id] || {
                  lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                  lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                }
              }
            }
            /> </div>}

        </div>
      ))
      }
    </div >
  )
}

export default TrackOrderPage