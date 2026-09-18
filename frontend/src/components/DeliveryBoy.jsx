import React, { useState } from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import axios from 'axios'

const DeliveryBoy = () => {
  const { userData } = useSelector(state => state.user)
  const [availableAssignments, setAvailableAssignments] = useState([])

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      console.log("Assignement", result.data);
      setAvailableAssignments(result.data)

    } catch (error) {
      console.log(error);

    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log("acceptOrder", result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAssignments()
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
        </div>

      </div>
    </div>

  )
}

export default DeliveryBoy  