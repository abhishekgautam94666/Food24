import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import CartItemCard from "./CartItemCard"

const CartPage = () => {
    const { cartItems, totalAmount } = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
            <div className='w-full max-w-200'>
                <div className='flex items-center gap-5 '>
                    <div className='z-10' onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack />

                    </div>
                    <h1 className='text-2xl font-bold text-start'> Your Cart</h1>

                </div>
                {
                    cartItems?.length == 0 ? (
                        <p className='text-center text-gray-500 text-lg'>Your Cart is Empty</p>
                    ) : (

                        <>
                            <div className='space-y-4'>
                                {
                                    cartItems?.map((item, index) => (
                                        <CartItemCard data={item} key={item.id} />
                                    ))
                                }
                            </div>
                            <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>
                                <h1>Total Amount </h1>
                                <span className='text-xl font-bold text-[#ff4d2d]'>₹{totalAmount}</span>
                            </div>
                            <div className='mt-4 flex justify-end'>
                                <button onClick={()=>navigate("/checkout")} className='bg-[#ff4d2d] text-white px-6 py-3 cursor-pointer rounded-lg text-lg font-medium hover:bg-[#e64526] transition\
                                '>Proceed to CheckOut</button>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default CartPage