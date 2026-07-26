import React, { useState } from 'react'
import { FaUtensils } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from "../App"
import { setMYShopData } from '../redux/ownerSlice';


const CreateEditShop = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [name, setName] = useState(myShopData?.name || "")
    const [address, setAddress] = useState(myShopData?.address || currentAddress || "")
    const [city, setCity] = useState(myShopData?.city || currentCity || "")
    const [state, setState] = useState(myShopData?.state || currentState || "")
    const [frontendImage, setFrontendImage] = useState()
    const [backendImage, setBackendImage] = useState()
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name),
                formData.append("city", city),
                formData.append("state", state),
                formData.append("address", address)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, { withCredentials: true })
            dispatch(setMYShopData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error.response?.data);

        }
    }
    return (
        <div className='flex justify-center flex-col items-center p-6 bg-linear-to-r from-orange-50 relative to-white min-h-screen mt-18'>
            <div className='absolute left-32 top-30 mb-2.5' onClick={() => navigate("/")}>
                <IoIosArrowRoundBack size={35} />
            </div>
            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </div>
                </div>
                <div>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        {/*Shop name */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        {/*Shop image  */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
                            <input type="file" accept='image/*' placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={handleImage} />

                            <div className='mt-4'>
                                {frontendImage && (
                                    <img
                                        src={frontendImage}
                                        alt="Shop"
                                        className='w-full h-48 object-cover rounded-lg border'
                                    />
                                )}
                            </div>

                        </div>
                        {/*State and city*/}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                                <input type="text" placeholder='City' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setCity(e.target.value)} value={city} />
                            </div>
                            <div><label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                                <input type="text" placeholder='State' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setState(e.target.value)} value={state} /></div>
                        </div>
                        {/*Shop Address*/}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                            <input type="text" placeholder='Enter Shop Address' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setAddress(e.target.value)} value={address} />
                        </div>
                        {/*Button*/}
                        <button type='submit' className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-200'>
                            Save
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateEditShop