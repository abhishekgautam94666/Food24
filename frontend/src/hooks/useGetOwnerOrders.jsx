import axios from "axios"
import React, { useEffect } from 'react'
import { serverUrl } from "../App"
import { useDispatch } from "react-redux"
import { setOwnerOrders } from "../redux/userSlice"

function useGetOwnerOrders() {
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/order/owner-orders`, { withCredentials: true });
                dispatch(setOwnerOrders(result.data?.orders))
                console.log(result.data);

            } catch (error) {

                console.log(error.response?.data);
            }

        }
        fetchOrders()
    }, [])
}

export default useGetOwnerOrders