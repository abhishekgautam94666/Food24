import axios from "axios"
import React, { useEffect } from 'react'
import { serverUrl } from "../App"
import { useDispatch, useSelector } from "react-redux"
import { setMYShopData } from "../redux/ownerSlice"



function useGetMyShop() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user);
    useEffect(() => {

        const fetchShop = async () => {
            try {
                if (userData?.role !== "owner") {
                    dispatch(setMYShopData(null));
                    return;
                }

                const result = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true });


                dispatch(setMYShopData(result.data))

            } catch (error) {
                dispatch(setMYShopData(null));
                console.log(error.response?.data);
            }

        }
        fetchShop()
    }, [userData, dispatch])
}

export default useGetMyShop