
import { FaUtensils } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setMYShopData } from '../redux/ownerSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Nav from "./Nav";


const OwnerDashboard = () => {

  const { myShopData } = useSelector(state => state.owner)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = async (itemId) => {
    setLoading(true)
    try {
      const result = await axios.get(`${serverUrl}/api/item/delete/${itemId}`, { withCredentials: true })
      dispatch(setMYShopData(result.data));
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete item failed"
      );
    } finally {
      setLoading(false)
    }
  }



  const navigate = useNavigate()
  return (
    <>
      <Nav />
      <div className='w-full min-h-screen bg-secondary flex flex-col items-center'>

        {!myShopData && (

          <div className='w-full flex justify-center items-center pt-32 px-4 sm:px-6 lg:px-8'>

            <div className='w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl border border-lightGray p-6 sm:p-8 md:p-10 hover:shadow-2xl transition-all duration-300'>

              <div className='flex flex-col items-center text-center'>

                <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5'>

                  <FaUtensils className='text-[#ff4d2d] text-4xl sm:text-5xl' />

                </div>

                <h2 className='text-2xl sm:text-3xl font-bold text-darkText mb-3'>
                  Add Your Restaurant
                </h2>

                <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-6'>
                  Join our food delivery platform and reach thousands of hungry customers every day.
                </p>

                <button className='w-full sm:w-auto bg-[#ff4d2d] hover:bg-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300' onClick={() => navigate("/create-edit-shop")}>
                  Get Started
                </button>

              </div>

            </div>

          </div>


        )}
        {
          myShopData && (
            <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6 mt-16'>
              <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'> <FaUtensils className='text-[#ff4d2d] text-4xl sm:text-5xl' /> welcome to {myShopData.name}
              </h1>
              <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative'>
                <div className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer' onClick={() => navigate("/create-edit-shop")}>
                  <FaPen size={30} />
                </div>
                <img src={myShopData.image} alt={myShopData.name} className='w-full h-48 sm:h-64 object-cover' />
                <div className='p-4 sm:p-6'>
                  <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>{myShopData.name}</h1>


                  <p className='text-gray-500 mb-2'>{myShopData.city},{myShopData.state}</p>
                  <p className='text-gray-500 mb-4'>{myShopData.address}</p>
                </div>
              </div>
              {myShopData?.items?.length == 0 && (
                <div className='w-full flex justify-center items-center pt-6 px-4 sm:px-6 lg:px-8'>

                  <div className='w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl border border-lightGray p-6 sm:p-8 md:p-10 hover:shadow-2xl transition-all duration-300'>

                    <div className='flex flex-col items-center text-center'>

                      <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-5'>

                        <FaUtensils className='text-[#ff4d2d] text-4xl sm:text-5xl' />

                      </div>

                      <h2 className='text-2xl sm:text-3xl font-bold text-darkText mb-3'>
                        Add Your Food Item
                      </h2>

                      <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-6'>
                        Share Your dekicious creation with our customers by  adding them to the menu
                      </p>

                      <button className='w-full sm:w-auto bg-[#ff4d2d] hover:bg-orange-500 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300' onClick={() => navigate("/add-food")}>
                        Add Food
                      </button>

                    </div>

                  </div>

                </div>
              )}
              {/*item card */}

              {myShopData?.items?.length > 0 && (
                <div className="w-full max-w-6xl px-4 mt-10">

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Your Food Items
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {myShopData.items.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                      >

                        {/* Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />

                        {/* Content */}
                        <div className="p-4">

                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">
                              {item.name}
                            </h3>

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${item.foodType === "veg"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            >
                              {item.foodType}
                            </span>
                          </div>


                          <p className="text-gray-500 mt-2">
                            {item.category}
                          </p>

                          <p className="text-[#ff4d2d] font-bold text-lg mt-3">
                            ₹ {item.price}
                          </p>


                          {/* Buttons */}
                          <div className="flex gap-3 mt-5">

                            <button
                              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
                              onClick={() => navigate(`/edit-item/${item._id}`)}
                            >
                              Edit
                            </button>


                            <button
                              className="flex-1justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-lg font-medium transition"
                              disabled={loading} onClick={() => handleDelete(item._id)}
                            >
                              {loading ? <ThreeDots
                                height="25"
                                width="25"
                                color='white'
                                visible={true}
                              /> : "Delete"}
                            </button>

                          </div>

                        </div>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>
          )
        }


      </div>
    </>
  )
}

export default OwnerDashboard