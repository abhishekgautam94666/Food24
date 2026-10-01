import React, { useState } from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { useNavigate } from 'react-router-dom'

const DeliveryBoy = () => {
  const { userData } = useSelector(state => state.user)
  const [availableAssignments, setAvailableAssignments] = useState([])
  const [currentOrder, setCurrentOrder] = useState()
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);


  const navigate = useNavigate()
  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      console.log("Assignement", result.data);
      setAvailableAssignments(result.data)

    } catch (error) {
      console.log(error);

    }
  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      console.log("getCuurentOrder", result.data);
      setCurrentOrder(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log("acceptOrder", result.data);
      getCurrentOrder()
    } catch (error) {
      console.log(error);
    }
  }

  const sendOtp = async () => {
    if (!currentOrder?._id || !currentOrder?.shopOrder?._id) {
      toast.error("Current order details not found");
      return;
    }
    try {
      45
      setLoading(true);
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id }, { withCredentials: true });
      toast.success(
        result.data.message || "OTP sent successfully"
      );
      setOtp("")
      setShowOtpBox(true)

    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error(
        error?.response?.data?.message ||
        "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const verifyOtp = async () => {
    if (!otp) {
      console.log("Please enter OTP");
      return;
    }
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }
    if (!currentOrder?._id || !currentOrder?.shopOrder?._id) {
      toast.error("Current order details not found");
      return;
    }
    try {
      setVerifyLoading(true);
      const result = await axios.post(`${serverUrl}/api/order/verify-otp`, { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp }, { withCredentials: true })
      console.log("verifyOtp :", result);
      toast.success(
        result.data.message || "Order delivered successfully"
      );
      // Reset OTP UI
      setOtp("");
      setShowOtpBox(false);
      // Refresh order data
      getCurrentOrder();
      getAssignments();

    } catch (error) {
      console.error("Verify OTP error:", error);

      toast.error(
        error?.response?.data?.message ||
        "Invalid or expired OTP"
      );
    } finally {
      setVerifyLoading(false);
    }
  }

  useEffect(() => {
    getAssignments()
    getCurrentOrder()
  }, [userData])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center mt-12.5 bg-[#fff9f6] overflow-y-auto'>
      <Nav />
      <div className='w-full max-w-200 flex flex-col gap-5 items-center'>
        <div className='bg-white gap-2
         rounded-2xl shadow-md p-5  flex flex-col justify-start items-center w-[90%] border border-orange-100'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome,
            {userData.fullName}</h1>
          <p className='text-[#ff4d2d]'><span className='font-semibold'>Latitude:</span> {userData.location.coordinates[1]}, <span className='font-semibold'>Longitude:</span> {userData.location.coordinates[0]}</p>
        </div>
        {!currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-2xl w-[90%] border border-orange-100'>
            <h1 className='text-lg font-bold flex items-center mb-4 gap-2'>Availabe Orders</h1>

            <div className='space-y-4'>
              {availableAssignments.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                    <div>
                      <p className='text-sm font-bold'>{a.shopName}</p>
                      <p className='text-sm text-gray-500' > <span className='font-semibold'>Delivery Address : </span>{a.deliveryAddress.text}</p>
                      <p className='text-sm text-gray-400' >{a.items.length} items | {a.subtotal}</p>
                    </div>
                    <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600' onClick={() => acceptOrder(a.assignmentId)}>Accept</button>
                  </div>

                ))
              ) : <p>No Availableb Orders</p>}
            </div>

          </div>}

        {currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
          <h2 className='text-lg font-bold mb-3'>Current Order</h2>
          <div className='border rounded-lg p-4 mb-3'>
            <p className='font-semibold text-sm'>{currentOrder?.shopOrder.shop.name}</p>
            <p className='text-sm text-gray-500'>{currentOrder.deliveryAddress.text}</p>
            <p className='text-xs text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length} items | {currentOrder.shopOrder.subtotal}</p>
          </div>
          <DeliveryBoyTracking data={currentOrder} />
          {!showOtpBox ? <button className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200' disabled={loading} onClick={sendOtp}>
            {loading ? "Sending OTP..." : "Mark as Delivered"}
          </button> : <div className='mt-4 p-4 border rounded-b-xl bg-gray-50'>
            <p className='text-sm font-semibold mb-2'>Enter Otp send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
            <input type="text" inputMode="numeric" maxLength={6} className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} value={otp} />
            <button className='w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all' onClick={verifyOtp}> {verifyLoading ? "Verifying..." : "Submit OTP"}</button>
          </div>}
        </div>}

      </div>
    </div>

  )
}

export default DeliveryBoy  