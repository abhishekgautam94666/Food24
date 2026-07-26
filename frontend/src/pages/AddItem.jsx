import React, { useState } from 'react'
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { FaUtensils } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from "../App"
import { setMYShopData } from '../redux/ownerSlice';


const AddItem = () => {
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const dispatch = useDispatch()

    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("veg")
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [frontendImage, setFrontendImage] = useState("")
    const [backendImage, setBackendImage] = useState("")
    const categories = ["snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "others"]
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("foodType", foodType)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/item/add-item`, formData, { withCredentials: true })
            dispatch(setMYShopData(result.data))
            toast.success("Add food successfully");
            navigate("/")



        } catch (error) {
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message || "Failed to add item. Please try again."
            );

        } finally {
            setLoading(false)
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
                        Add Food
                    </div>
                </div>
                <div>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        {/*Shop name */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input type="text" placeholder='Enter item Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        {/*Shop image  */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
                            <input type="file" accept='image/*' placeholder='image' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={handleImage} />

                            <div className='mt-4'>
                                {
                                    frontendImage && (

                                        <img src={frontendImage} alt="food" className='w-full h-48 object-cover rounded-lg border' />
                                    )
                                }
                            </div>

                        </div>
                        {/*price */}
                        <div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                                <input type="number" placeholder='0' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setPrice(e.target.value)} value={price} />
                            </div>
                        </div>
                        {/*Category */}
                        <div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Select category</label>
                                <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setCategory(e.target.value)} value={category}> <option value="">select Category</option>{categories.map((cat, index) => (
                                    <option value={cat} key={index}>{cat}</option>
                                ))}</select>
                            </div>
                        </div>
                        {/*food type*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Food Type
                            </label>

                            <select className="w-full px-4 py-2 border rounded-lg" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non Veg</option>
                            </select>
                        </div>
                        {/*Button*/}
                        <button type='submit' className='w-full flex justify-center items-center bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-200' disabled={loading}>
                            {loading ? <ThreeDots
                                height="25"
                                width="25"
                                radius="9"
                                color='white'
                                visible={true}
                            /> : "Save"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddItem