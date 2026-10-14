
import React, { useEffect } from 'react'
import axios from "axios"
import { serverUrl } from "../App"
import { useSelector } from "react-redux"



function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        if (!userData || userData.role !== "deliveryBoy") return;
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser");
            return;
        }

        const updateLocation = async (lat, lon) => {
            try {
                const result = await axios.post(`${serverUrl}/api/user/update-location`, { lat, lon }, { withCredentials: true })
                console.log("LOCATION SAVED:", lat, lon);
                console.log("Location updated:", result);
            } catch (error) {
                console.log(
                    "Location update error:",
                    error?.response?.data || error?.message
                );
            }
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                console.log("Current location:", lat, lon);
                updateLocation(lat, lon)

            },
            (error) => {
                console.log("Location error:", error.code, error.message);

            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 10000
            }

        );

        return () => {
            navigator.geolocation.clearWatch(watchId)
            console.log("LOCATION WATCH CLEARED");
        }

    }, [userData?._id, userData?.role])

}


export default useUpdateLocation