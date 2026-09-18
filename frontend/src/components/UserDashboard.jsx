import axios from 'axios';
import React, { useRef } from 'react'
import {
  FaSearch,
  FaPizzaSlice,
  FaHamburger,
  FaIceCream,
  FaCoffee
} from "react-icons/fa";
import { serverUrl } from '../App';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { data } from 'react-router-dom';
import { addToCart, decreaseQuantity, increaseQuantity } from '../redux/userSlice';
import Nav from './Nav';


const UserDashboard = () => {
  const [shop, setShop] = useState([])
  const { currentCity, itemsInMyCity, cartItems } = useSelector(state => state.user)
  const categories = [
    { name: "Pizza", icon: <FaPizzaSlice /> },
    { name: "Burger", icon: <FaHamburger /> },
    { name: "Dessert", icon: <FaIceCream /> },
    { name: "Drinks", icon: <FaCoffee /> },
  ];
  const dispatch = useDispatch();
  console.log("Current City:", currentCity);
  console.log("Cart Items", cartItems);
  const getShopByCity = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/shop/get-shop-by-city?city=${currentCity}`, { withCredentials: true })
      setShop(result.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }
  useEffect(() => {
    if (currentCity) {
      getShopByCity()
    }
  }, [currentCity])

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        (i <= rating) ? (<FaStar key={i} className='text-yellow-500 text-lg' />) : (<FaRegStar key={i} className='text-yellow-500 text-lg' />)
      )
    }
    return stars
  }
  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen mt-18">

        {/* Hero Section */}
        <section className="bg-[#ff4d2d] text-white py-16 px-6 text-center">

          <h1 className="text-4xl md:text-6xl font-bold">
            Delicious Food Delivered
            <br />
            To Your Door
          </h1>

          <p className="mt-4 text-lg">
            Order your favourite food from nearby restaurants
          </p>

          {/* Search */}
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-full flex items-center px-5 py-3">

            <FaSearch className="text-gray-500" />

            <input
              type="text"
              placeholder="Search food or restaurant..."
              className="w-full px-4 text-black outline-none"
            />

          </div>

        </section>

        {/* Suggested Items */}

        {/* Popular Restaurants */}

        <section className="max-w-6xl mx-auto px-4 pb-16 mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Best Shop in {currentCity}
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


            {shop.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.city}, {item.state}
                  </p>

                  <p className="mt-3 text-[#ff4d2d] font-semibold">
                    {item.items.length} Items Available
                  </p>

                </div>

              </div>

            ))}


          </div>

        </section>

        {/**Suggest items */}
        <section className="max-w-6xl mx-auto px-4 py-10">

          <h2 className="text-3xl font-bold mb-8">
            Suggested Items
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {itemsInMyCity?.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 overflow-hidden"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">

                  <div className="flex justify-between items-center">

                    <h2 className="text-lg font-bold">
                      {item.name}
                    </h2>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${item.foodType === "veg"
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
                  <div className="flex items-center justify-between mt-3">



                    <span className="text-[#ff4d2d] text-xl font-bold">
                      ₹{item.price}
                    </span>

                  </div>

                  <div className="flex items-center justify-between mt-3">

                    <div className="text-yellow-500 font-semibold flex">
                      {renderStars(data.rating?.average || 0)}
                      <span className='text-xs text-gray-500'>
                        {data.rating?.count || 0}
                      </span>
                    </div>

                    <span className="text-[#ff4d2d] text-xl font-bold">
                      ₹{item.price}
                    </span>

                  </div>

                  <div className="flex justify-between items-center mt-5">

                    {/* <div className="flex items-center gap-3">

                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {cartItems.find(i => i.id === item._id)?.quantity || 0}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="w-8 h-8 rounded-full bg-[#ff4d2d] text-white"
                    >
                      +
                    </button>

                  </div> */}

                    <button className={`${cartItems.some(i => i.id == item._id) ? "bg-gray-800" : "bg-[#ff4d2d]"}  text-white px-4 py-2 rounded-lg`} onClick={() => {
                      dispatch(addToCart({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        shop: item.shop,
                        quantity: 1,
                        foodType: item.foodType,
                      }))
                    }}>
                      Add
                    </button>

                  </div>


                </div>

              </div>

            ))}

          </div>

        </section>

      </div>
    </>
  )
}

export default UserDashboard