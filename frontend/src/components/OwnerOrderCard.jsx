import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";
import { useState } from "react";

const OwnerOrderCard = ({ order }) => {
  const dispatch = useDispatch()
  const [availableBoys, setAvailableBoys] = useState([])
  console.log("availableBoys", availableBoys);


  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true })
      dispatch(updateOrderStatus({ orderId, shopId, status }))
      setAvailableBoys(result.data.availableBoys)

      console.log("updatedata", result?.data);


    } catch (error) {
      console.log(error.response?.data);

    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">{order.user.fullName}</h2>
        <p className="text-sm font-medium text-gray-700">{order.user.email}</p>
        <p className="text-sm font-medium text-gray-700"> {new Date(order.createdAt).toLocaleString()}</p>
        <p className="flex items-center gap-2 text-sm text-gray-700 mt-1"><FaPhoneAlt /> <span className="text-sm font-medium text-gray-700">{order.user.mobile}</span></p>
      </div>

      <div className="flex items-start gap-2 text-gray-600 text-sm">
        <p>{order?.deliveryAddress?.text}</p>
      </div>


      <div className="flex gap-3 flex-wrap">
        {order.shopOrders.shopOrderItems.map((item) => (
          <div key={item._id} className="w-35 flex flex-col items-center pt-2 pb-2 border border-gray-200 shadow-md hover:shadow-lg rounded-xl" >

            <img src={item.item.image} alt="" className="w-30 h-20 rounded-lg object-cover " />
            <p className="font-semibold text-md text-gray-800 mt-2 truncate">{item.name}</p>
            <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity} x ₹{item.price}</p>
            <p className="font-bold text-[#ff4d2d]  mt-1">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-gray-100">
        <span className="text-sm text-gray-600">Status: <span className="font-semibold text-red-500 capitalize">{order.shopOrders.status}</span></span>

        <select className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2" onChange={(e) => handleUpdateStatus(order._id, order.shopOrders.shop._id, e.target.value)}>

          <option value="change">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="out of delivery">out Of Delivery</option>
        </select>
      </div>

      {order.shopOrders.status == "out of delivery" &&
        <div className="mt-3 p-2 rounded-lg text-sm bg-orange-50">
          {order.shopOrders.assignedDeliveryBoy ? <p>Assigned Delivery Boys:</p> : <p>Available Delivery Boys:</p>}
          {availableBoys.length > 0 ? (
            availableBoys.map((b, index) => (
              <div key={index} className="text-gray-600">{b.fullName}-{b.mobile}</div>
            ))
          ) : order.shopOrders.assignedDeliveryBoy ? <div>{order.shopOrders.assignedDeliveryBoy.fullName}-{order.shopOrders.assignedDeliveryBoy.mobile}</div> : <div>Wating for Delivery Boys to Accept</div>}
        </div>}

      <div className="text-right font-bold text-gray-800 text-sm">
        Total: {order.shopOrders.subtotal}
      </div>
    </div>
  );
};

export default OwnerOrderCard; 