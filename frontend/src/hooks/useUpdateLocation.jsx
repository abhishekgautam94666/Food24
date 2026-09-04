
import React, { useEffect } from 'react'
import axios from "axios"
import { serverUrl } from "../App"
import { useSelector } from "react-redux"
import { latLng } from 'leaflet'


function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        if (!userData || userData.role !== "deliveryBoy") return;

        const updateLocation = async (lat, lon) => {
            try {
                const result = await
                
                
                axios.post(`${serverUrl}/api/user/update-location`, { lat, lon }, { withCredentials: true })
                console.log("Location updated:", result);
            } catch (error) {
                console.log(
                    "Location update error:",
                    error.response?.data || error.message
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
                console.log("Location error:", error.message);

            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 10000
            }

        );

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }

    }, [userData])

}


export default useUpdateLocation