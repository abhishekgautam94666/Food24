import React, { useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

const UserOrdersCard = () => {
  const navigate = useNavigate()
  const [selectedRating, setSelectedRating] = useState({})

  const handlerating = async (itemId, rating) => {
    console.log("rating", rating);

    try {
      const result = await axios.post(`${serverUrl}/api/item/rating`, {
        itemId, rating
      }, { withCredentials: true })

      if (result.data) {
        setSelectedRating(prev => ({
          ...prev,
          [itemId]: rating
        }))
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition duration-300">

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>

          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FaCalendarAlt />
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${order.paymentStatus === "paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {order.paymentStatus}
        </span>
      </div>

      {/* Shop Orders */}
      {order.shopOrders.map((shopOrder) => (
        <div
          key={shopOrder._id}
          className="mb-5 border rounded-xl p-4 bg-gray-50"
        >
          <h3 className="text-lg font-semibold text-accent">
            {shopOrder.shop?.name}
          </h3>

          <div className="space-y-3 mt-4">
            {shopOrder.shopOrderItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.item?.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty : {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-bold text-[#ff4d2d]">
                  ₹{item.price * item.quantity}


                  {shopOrder.status == "delivered" && (
                    <div className="flex items-center gap-1 mt-2 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handlerating(item.item._id, star)}
                          className={`${(selectedRating[item.item._id] || 0) >= star ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  )}
                </p>



              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t mt-4 pt-3">
            <span className="font-semibold">
              Restaurant Total
            </span>

            <span className="font-bold text-lg text-accent">
              ₹{shopOrder.subtotal}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-gray-700 font-medium">
              <MdDeliveryDining className="text-xl text-accent" />
              Order Status
            </span>

            <span className="font-semibold capitalize text-accent">
              {shopOrder.status?.replaceAll("_", " ")}
            </span>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-700">
          <FaMoneyBillWave />
          <span className="capitalize">{order.paymentMethod}</span>
        </div>
        {
          order?.paymentMethod == 'online' && (order?.payment == true ? <p className="text-lg font-semibold text-accent">Paid</p> : <p className="text-lg font-semibold text-[#ff4d2d]">Transaction failed</p>)

        }


      </div>

      <div className="mt-4 border-t pt-3 flex justify-between text-lg font-bold">
        <span>
          Total: ₹{order.totalAmount}
        </span>
        <button className="bg-accent hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm" onClick={() => navigate(`/track-order/${order._id}`)}>Track Order</button>
      </div>
    </div>
  );
}

export default UserOrdersCard;