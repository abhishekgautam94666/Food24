import axios from "axios"
import React, { useEffect } from 'react'
import { serverUrl } from "../App"
import { useDispatch } from "react-redux"
import { setMyOrders } from "../redux/userSlice"

function useGetMyOrders() {
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/order/user-orders`, { withCredentials: true });
                dispatch(setMyOrders(result.data?.orders))
                console.log(result.data);

            } catch (error) {

                console.log(error.response?.data);
            }

        }
        fetchOrders()
    }, [])
}

export default useGetMyOrders