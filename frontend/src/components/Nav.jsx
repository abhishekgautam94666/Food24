import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsCartCheckFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { CiReceipt } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import OwnerDashboard from './OwnerDashboard';

const Nav = () => {
    const { userData, currentCity, cartItems } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)


    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signout`, {}, { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/signin", { replace: true });
        } catch (error) {
            console.log("logout error", error);

        }
    }
    return (
        <div className='w-full h-28 flex items-center justify-between md:justify-center gap-7.5 px-5 fixed top-0 z-999 bg-white overflow-visible '>

            {showSearch && userData?.role == "user" && <div className='w-[90%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 flex md:hidden fixed top-20 left-[5%]'>
                <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                    <FaLocationDot size={25} className='text-[#ff4d2d]' />
                    <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
                </div>
                <div className='flex w-[80%] items-center gap-2.5'><IoSearchOutline size={25} className='text-[#ff4d2d] md:hidden' />

                    <input type="text" placeholder='search dilicious food....' className='px-2.5 text-gray-700 outline-0 w-full' />
                </div>
            </div>}


            <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>
                Food24
            </h1>
            {userData?.role === "user" && (
                <div className='md:w-[60%] lg:w-[40%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 hidden md:flex'>

                    <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                        <FaLocationDot size={25} className='text-[#ff4d2d]' />

                        <div className='w-[80%] truncate text-gray-600'>
                            {currentCity}
                        </div>
                    </div>

                    <div className='flex w-[80%] items-center gap-2.5'>
                        <IoSearchOutline size={25} className='text-[#ff4d2d]' />

                        <input
                            type="text"
                            placeholder='search delicious food...'
                            className='px-2.5 text-gray-700 outline-0 w-full'
                        />
                    </div>

                </div>
            )}

            <div className='flex items-center gap-4'>
                {userData?.role === "user" && (showSearch ? <AiOutlineClose onClick={() => setShowSearch(false)} className='cursor-pointer text-[#ff4d2d]' /> : (<IoSearchOutline size={25} className='cursor-pointer text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)} />))}

                {userData?.role === "owner" ? <>
                    {myShopData && (<>  <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]
                    
                    ' onClick={() => navigate("/add-food")}>
                        <FaPlus size={20} />
                        <span>Add Food Item</span>
                    </button>
                        <button className='md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full  bg-[#ff4d2d]/10 text-[#ff4d2d]
                    
                    ' onClick={() => navigate("/add-food")}>
                            <FaPlus size={20} />
                        </button>  </>)}

                    <div className=' hidden md:flex  items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                        <CiReceipt size={20} />
                        <span>My Orders</span>
                        <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] px-1.5 py-0.5 rounded-full'>0</span>
                    </div>
                    <div className=' md:hidden flex  items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                        <CiReceipt size={20} />

                        <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] px-1.5 py-0.5 rounded-full'>0</span>

                    </div>
                    <div>

                    </div>

                </> : (
                    <>
                        {userData?.role == "user" && <div className='relative cursor-pointer' onClick={() => navigate("/cart")}>
                            <BsCartCheckFill size={25} className='text-[#ff4d2d]' />
                            <span className='text-[#ff4d2d] absolute left-6 bottom-4'>{cartItems.length}</span>
                        </div>}

                        <button className='hidden md:block bg-[#ff4d2d]/10 text-[#ff4d2d] px-3 py-1 text-sm font-medium rounded-lg'>My orders</button>
                    </>
                )}


                <div className='w-10 h-10 rounded-full flex  items-center justify-center  bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={() => setShowInfo(prev => !prev)}>
                    {
                        userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : "U"
                    }
                </div>
                {showInfo && <div className='fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-999'>
                    <div className='text-[17px] font-semibold'></div>
                    <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>My orders</div>
                    <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogOut}>Log out</div>
                </div>}



            </div>
        </div>
    )
}

export default Nav