import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useNavigate } from 'react-router-dom';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { CircleMarker } from 'react-leaflet'; 
import '../components/styles/Location.css';




const safeIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [20,30],
    iconAnchor: [12,25],
    popupAnchor: [0,-25],
});

const hospitalIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/3809/3809392.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const policeIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/11618/11618268.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const fireStationIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/12247/12247281.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const storeIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2639/2639570.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const libraryIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1164/1164651.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const schoolIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/8907/8907406.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

const pharmacyIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/2805/2805080.png',
    iconSize: [20, 30],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
});

function getMarkerIcon(type) {
    switch (type) {
        case 'hospital':
            return hospitalIcon;
        case 'police':
            return policeIcon;
        case 'fire_station':
            return fireStationIcon;
        case 'pharmacy':
            return pharmacyIcon;
        case 'library':
            return libraryIcon;
        case 'school':
            return schoolIcon;
        case 'college':
            return schoolIcon;
        case 'supermarket':
            return storeIcon;
        case 'convenience':
            return storeIcon;
        default:
            return safeIcon;
    }
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Routing({ start, end }) {
    const map = useMap();

    useEffect(() => {
        if (!start || !end) return;
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng),
            ],
            routeWhileDragging: true,
            show: true,
            addWaypoints: false,
            draggableWaypoints: false,
            lineOptions: { styles: [{ color: '#000000ff', opacity: 0.6, weight: 4 }] },
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, start, end]);
    return null;
}

function useCurrentLocation() {
    const [location, setLocation] = useState(null);
    

    useEffect(() => {
        if(!navigator.geolocation) {
            alert("Geolocation not supported by this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => console.error(err),
            {enableHighAccuracy: true, timeout: 1000, maximumAge:0}
        );
        
        const watchID = navigator.geolocation.watchPosition(
            (pos) => {
                if (pos.coords.accuracy <= 1000) {
                    setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                } else {
                    console.log("Ignoring inaccurate position:", pos.coords.accuracy);
                }
            },
            (err) => console.error(err),
            { enableHighAccuracy: true, maximumAge: 0, timeout:10000 }
        );

        return () => navigator.geolocation.clearWatch(watchID);
    }, []);

    return location;
}

function RecenterMap({ position}) {
    const map = useMap();
    const [hasCentered, setHasCentered] = useState(false);

    useEffect(() => {
         if (position && !hasCentered) {
            map.setView([position.lat, position.lng], 15);
            setHasCentered(true);
        }
    }, [map, position]);
    return null;
}
    
async function fetchSafeLocations(lat, lng, radius = 3000) {
    const query = `
        [out:json][timeout:25];
        (
            node["amenity"="police"](around:${radius},${lat},${lng});
            way["amenity"="police"](around:${radius},${lat},${lng});
            node["amenity"="hospital"](around:${radius},${lat},${lng});
            way["amenity"="hospital"](around:${radius},${lat},${lng});
            node["amenity"="library"](around:${radius},${lat},${lng});
            way["amenity"="library"](around:${radius},${lat},${lng});
            node["amenity"="fire_station"](around:${radius},${lat},${lng});
            way["amenity"="fire_station"](around:${radius},${lat},${lng});

            node["shop"="supermarket"](around:${radius},${lat},${lng});
            way["shop"="supermarket"](around:${radius},${lat},${lng});
            node["amenity"="pharmacy"](around:${radius},${lat},${lng});
            way["amenity"="pharmacy"](around:${radius},${lat},${lng});
            node["shop"="convenience"](around:${radius},${lat},${lng});
            way["shop"="convenience"](around:${radius},${lat},${lng});

            node["amenity"="school"](around:${radius},${lat},${lng});
            way["amenity"="school"](around:${radius},${lat},${lng});
            node["amenity"="college"](around:${radius},${lat},${lng});
            way["amenity"="college"](around:${radius},${lat},${lng});

        );
        out center;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
    )}`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Overpass API response:", data);

        const locations = data.elements
            .map((el) => ({
                id: el.id,
                name: el.tags?.name || el.tags?.amenity || "Safe Place",
                type: el.tags?.amenity || el.tags?.shop || "safe",
                lat: el.lat ?? el.center?.lat,
                lng: el.lon ?? el.center?.lon,
            }))
            .filter((loc) => loc.lat && loc.lng);

        console.log("Processed safe locations:", locations);
        return locations;
    } catch (err) {
        console.error("Error fetching safe locations:", err);
        return [];
    }
}

//Main Component
export default function Location() {
    const userLocation = useCurrentLocation();
    const [safeLocations, setSafeLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedDestination, setSelectedDestination] = useState(null);

    useEffect(() => {
        console.log("User location updated:", userLocation);
    }, [userLocation]);

    useEffect(() => {
        if (!userLocation) return;

        // Skip fetching if we already have locations
        if (safeLocations.length > 0) return;

        console.log("Fetching safe locations for:", userLocation);

        fetchSafeLocations(userLocation.lat, userLocation.lng)
            .then((locations) => {
                console.log("Safe locations fetched raw:", locations);
                setSafeLocations(locations);
            })
            .catch((err) => {
                console.error("Error fetching safe locations:", err);
            });
    }, [userLocation]);

    if (!userLocation) return <p style={{ padding: 12 }}>Loading your location...</p>;


    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <div style ={{ 
                padding: '10px', 
                position: 'absolute', 
                top: '5px',
                left: '40px',
                zIndex: 1000 
                }}
            >
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#1b7c7cff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Home
                </button>
            </div>
            <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={15}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/*User's marker */}
               <CircleMarker
                    center={[userLocation.lat, userLocation.lng]}
                    radius={10}
                    pathOptions={{
                        color: '#3388ff',
                        fillColor: '#3388ff',
                        fillOpacity: 0.9,
                        weight: 2,
                    }}
                >
                    <Popup>Your Location</Popup>
                </CircleMarker>

                <Circle
                    center={[userLocation.lat, userLocation.lng]}
                    radius = {userLocation.accuracy ?? 50}
                    pathOptions = {{ color: '#3388ff33', fillColor: '#3388ff33' , fillOpacity: 0.2}}
                />
                {/*Recenter map when user moves */ }
                <RecenterMap position={userLocation} />

                {/* Safe locations markers */ }
                
                {safeLocations.map((loc) => (
                    <Marker 
                        key={loc.id} 
                        position={[loc.lat, loc.lng]} 
                        icon={getMarkerIcon(loc.type)}
                        eventHandlers={{
                            click: () =>  
                                setSelectedDestination({ lat: loc.lat, lng: loc.lng }),
                        }}
                    >
                        <Popup>{loc.name}</Popup>
                    </Marker>
                ))}
                {userLocation && selectedDestination && (
                    <Routing start={userLocation} end={selectedDestination} />
                )}
            </MapContainer>
        </div>
    );
}
    