import React, { useState } from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../redux/userSlice';

function CartItemCard({ data }) {
  const dispatch = useDispatch()
  
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border '>
      <div className='flex items-center gap-3'>
        <img src={data.image} alt="" className='w-20 h-20 object-cover rounded-lg' />
        <div>
          <h2 className='text-lg md:text-xl font-bold text-gray-800 tracking-wide'>{data.name}</h2>
          <p className="text-sm text-gray-500">
            ₹{data.price}
            <span className="mx-2 text-gray-300">×</span>
            Qty:
            <span className="font-semibold text-gray-700 ml-1">
              {data.quantity}
            </span>
          </p>
          <p className='text-2xl font-bold text-[#ff4d2d]'>₹{data.price * data.quantity}</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button onClick={() => dispatch(decreaseQuantity(data.id))} className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'>
          <FaMinus />
        </button>

        <span className='text-lg font-bold min-w-6.25 text-center'>{data.quantity}</span>

        <button onClick={() => dispatch(increaseQuantity(data.id))} className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default CartItemCard