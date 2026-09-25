import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FaLocationDot } from "react-icons/fa6";
import { TbCurrentLocation, TbLetterY } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { setAddress, setLocation } from '../redux/mapSlice';
import { MdDeliveryDining } from "react-icons/md";
import axios from 'axios';
import { serverUrl } from '../App'
import toast from 'react-hot-toast';
import { addMyOrder } from '../redux/userSlice';

function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap()
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null

}

const CheckOut = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_GEOAPIKEY
  const { location, address } = useSelector(state => state.map)
  const [loading, setLoding] = useState(false)
  const { cartItems } = useSelector(state => state.user)
  const [addressInput, setAddressInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity), 0
  )

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLating(lat, lng)
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      dispatch(setLocation({ lat: latitude, lon: longitude }))
      getAddressByLating(latitude, longitude)
    })
  }

  const getAddressByLating = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GEOAPIKEY
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
      dispatch(setAddress(result?.data?.results[0].address_line2 || result?.data.results[0].address_line1))
    } catch (error) {
      console.log(error);

    }
  }

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
      const { lat, lon } = result.data.features[0].properties
      dispatch(setLocation({ lat, lon }))
    } catch (error) {
      console.log(error);

    }
  }


  const handlePlaceOrder = async () => {
    setLoding(true)
    try {
      const result = await axios.post(`${serverUrl}/api/order/place-order`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount,
        cartItems,
      },
        { withCredentials: true }
      )
      toast.success(result.data.message);
      //  dispatch(addMyOrder(result.data))
      console.log(result);

      setTimeout(() => {
        navigate("/order-placed");
      }, 1500);
    } catch (error) {
      setLoding(false)
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoding(false);
    }
  }

  useEffect(() => {
    setAddressInput(address)
  }, [address])


  return (
    <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
      <div className='absolute top-5 left-5 z-10 ' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
      </div>
      <div className='w-full max-w-225 bg-white rounded-2xl shadow-xl p-6 space-y-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Checkout</h1>
        <section>
          <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><FaLocationDot className='text-[#ff4d2d]' />Delivery Location</h2>
          <div className='flex gap-2 mb-3'>
            <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline focus:ring-2 focus:ring-[#ff4d2d]' value={addressInput} placeholder='Enter Your Delivery Address..' onChange={(e) => {
              setAddressInput(e.target.value)
            }} />
            <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getLatLngByAddress}><IoIosSearch size={17} /></button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getCurrentLocation}><TbCurrentLocation size={17} /></button>
          </div>
          <div className='rounded-xl border overflow-hidden'>
            <div className='h-64 w-full flex items-center justify-center'>
              <MapContainer className={"w-full h-full"} center={[location?.lat, location?.lon]} zoom={15}>
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker position={[location?.lat, location?.lon]} draggable={true} eventHandlers={{
                  dragend: onDragEnd
                }}>
                  <Popup>Your Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("cod")}>

              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                <MdDeliveryDining className='text-lg text-green-600' />
              </span>
              <div>
                <p>Cash On Delivery</p>
                <p>Pay when your food arrives</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`} onClick={() => setPaymentMethod("online")}>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'><FaMobileScreenButton className='text-purple-500 text-lg' /></span>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'><FaCreditCard className='text-blue-700 text-lg' /></span>
              <div>
                <p className='font-medium text-gray-800
                '>UPI / Credit / Debit Card</p>
                <p className='text-xs text-gray-500'>Pay Securely Online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-3'>Order Summary</h2>
          <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
            {cartItems.map((item, index) => (
              <div key={index} className='flex justify-between text-sm text-gray-700'>
                <span>{item.name} x Qty:{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr className='border-gray-200 my-2' />

          </div>
        </section>
        <button disabled={loading} className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl
        font-semibold' onClick={handlePlaceOrder}>{loading ? "Placing Order" : paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}</button>
      </div>
    </div>
  )
}

export default CheckOut