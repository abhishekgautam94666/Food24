import React, { useEffect, useState } from 'react'
import scooter from "../assets/scooter.png"
import home from "../assets/home.png"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

const deliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const DeliveryBoyTracking = ({ data }) => {

    const deliveryBoyLat = data.deliveryBoyLocation.lat
    const deliveryBoyLon = data.deliveryBoyLocation.lon
    const customerlon = data.customerLocation.lon
    const customerlat = data.customerLocation.lat

    const path = [
        [deliveryBoyLat, deliveryBoyLon],
        [customerlat, customerlon]
    ]
    const center = [deliveryBoyLat, deliveryBoyLon]


    const [route, setRoute] = useState([]);
    useEffect(() => {

        if (
            !deliveryBoyLat ||
            !deliveryBoyLon ||
            !customerlat ||
            !customerlon
        ) {
            return;
        }

        const getRoute = async () => {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/` +
                    `${deliveryBoyLon},${deliveryBoyLat};` +
                    `${customerlon},${customerlat}` +
                    `?overview=full&geometries=geojson`;

                const response = await fetch(url);
                const result = await response.json();
                if (result.code === "Ok") {

                    const coordinates =
                        result.routes[0].geometry.coordinates;

                    // OSRM gives [longitude, latitude]
                    // Leaflet needs [latitude, longitude]

                    const leafletCoordinates = coordinates.map(
                        ([lon, lat]) => [lat, lon]
                    );

                    setRoute(leafletCoordinates);
                }
            } catch (error) {
                console.log("Route error:", error);
            }
        };
        getRoute();
    }, [deliveryBoyLat, deliveryBoyLon, customerlat, customerlon])

    if (
        !deliveryBoyLat ||
        !deliveryBoyLon ||
        !customerlat ||
        !customerlon
    ) {
        return <p>Location not available</p>;
    }





    return (
        <div className='w-full h-100 mt-3 rounded-b-xl overflow-hidden shadow-md'>
            <MapContainer className={"w-full h-full"} center={center} zoom={15}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
                    <Popup>Delivery Boy</Popup>
                </Marker>

                <Marker position={[customerlat, customerlon]} icon={customerIcon}>
                    <Popup>Customer</Popup>
                </Marker>

                {/* <Polyline positions={path} /> */}
                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        pathOptions={{
                            color: "blue",
                            weight: 5,
                        }}
                    />
                )}
            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking