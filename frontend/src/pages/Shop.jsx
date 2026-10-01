import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Nav from '../components/Nav';
import { serverUrl } from '../App';
import { addToCart } from '../redux/userSlice';

function Shop() {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.user);

    const [shop, setShop] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    const getShopItems = async () => {
        try {
            setError("");

            const result = await axios.get(
                `${serverUrl}/api/item/get-by-shop/${shopId}`,
                {
                    withCredentials: true,
                }
            );


            setShop(result.data.shop);
            setItems(result.data.shop.items || [])

        } catch (error) {
            console.log(
                "Get shop items error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message || "Unable to load shop"
            );
        }
    };

    useEffect(() => {
        if (shopId) {
            getShopItems();
        }
    }, [shopId])

    const renderStars = (rating) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar
                        key={i}
                        className="text-yellow-500"
                    />
                ) : (
                    <FaRegStar
                        key={i}
                        className="text-yellow-500"
                    />
                )
            );
        }

        return stars;
    };

    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                shop: item.shop,
                quantity: 1,
                foodType: item.foodType,
            })
        );
    };

    if (error) {
        return (
            <>
                <Nav />

                <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center px-4 mt-5">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
                        <h2 className="text-xl font-bold text-red-500">
                            Something went wrong
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {error}
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />

            <div className="min-h-screen bg-[#fff9f6] pt-20 mt-5">

                {/* Back Button */}
                <div className="max-w-6xl mx-auto px-4 pt-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
                    >
                        <FaArrowLeft />
                        Back
                    </button>
                </div>

                {/* Shop Header */}
                <section className="max-w-6xl mx-auto px-4 mt-5">

                    <div className="bg-white shadow-md rounded-2xl overflow-hidden">

                        {/* Shop Image */}
                        <div className="relative">

                            <img
                                src={shop?.image}
                                alt={shop?.name}
                                className="w-full h-64 md:h-80 object-cover"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6 text-white">

                                <h1 className="text-3xl md:text-4xl font-bold">
                                    {shop?.name}
                                </h1>

                                <p className="mt-2">
                                    {shop?.address}, {shop?.city}
                                </p>

                            </div>
                        </div>

                        {/* Shop Info */}
                        <div className="p-5">

                            <div className="flex flex-wrap items-center  gap-4">

                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    {items.length} Items
                                </span>

                                <span className="text-gray-500">
                                    📍 {shop?.city}, {shop?.state}
                                </span>

                            </div>

                            <p className="text-gray-500 mt-3">
                                Delicious food available for delivery from{" "}
                                <span className="font-semibold text-gray-700">
                                    {shop?.name}
                                </span>
                            </p>

                        </div>
                    </div>
                </section>

                {/* Items Section */}
                <section className="max-w-6xl mx-auto px-4 py-10">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl md:text-3xl font-bold">
                            Menu
                        </h2>

                        <span className="text-gray-500">
                            {items.length} items
                        </span>

                    </div>

                    {items.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center shadow-md">
                            <p className="text-gray-500">
                                No items available in this shop.
                            </p>
                        </div>
                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {items.map((item) => {

                                const isAdded = cartItems?.some(
                                    (cartItem) => cartItem.id === item._id
                                );

                                return (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                                    >

                                        {/* Image */}
                                        <div className="relative">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-48 object-cover"
                                            />

                                            {/* Food Type */}
                                            <span
                                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${item.foodType === "veg"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.foodType}
                                            </span>

                                        </div>

                                        {/* Content */}
                                        <div className="p-4">

                                            <div className="flex justify-between items-start gap-3">

                                                <div>
                                                    <h3 className="text-lg font-bold">
                                                        {item.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {item.category}
                                                    </p>
                                                </div>

                                                <span className="text-orange-500 font-bold text-lg">
                                                    ₹{item.price}
                                                </span>

                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mt-3">

                                                <div className="flex gap-1">
                                                    {renderStars(
                                                        item.rating?.average || 0
                                                    )}
                                                </div>

                                                <span className="text-xs text-gray-500">
                                                    ({item.rating?.count || 0})
                                                </span>

                                            </div>

                                            {/* Add Button */}
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className={`w-full mt-5 py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition ${isAdded
                                                    ? "bg-gray-800"
                                                    : "bg-orange-500 hover:bg-orange-600"
                                                    }`}
                                            >
                                                <FaPlus />

                                                {isAdded
                                                    ? "Added to Cart"
                                                    : "Add to Cart"}
                                            </button>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}

                </section>

            </div>
        </>
    )
}

export default Shop 