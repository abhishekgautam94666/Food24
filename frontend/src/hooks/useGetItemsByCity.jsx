import axios from "axios"
import React, { useEffect } from 'react'
import { serverUrl } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setMYShopData } from "../redux/ownerSlice"
import { setItemsInMyCity } from "../redux/userSlice"



function useGetItemsByCity() {
    const dispatch = useDispatch()
    const { userData, currentCity } = useSelector(state => state.user);
    useEffect(() => {
        if (!currentCity) return;
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`, { withCredentials: true })
                dispatch(setItemsInMyCity(result?.data))
                console.log("result Data", result.data);

            } catch (error) {

                console.log(error.response?.data || error.message);
            }

        }
        fetchShop()
    }, [currentCity, dispatch])
}

export default useGetItemsByCity