import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icons in React bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({ services, selectedService, onSelect }) {
    // Prague / Středočeský kraj center
    const defaultCenter = [50.0755, 14.4378]; // Praha

    // when user selects service, you could auto-pan later if you want

    return (
        <MapContainer
            center={defaultCenter}
            zoom={10}
            className="map-container"
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {services
                .filter((s) => s.lat && s.lng)
                .map((service) => (
                    <Marker
                        key={service.id}
                        position={[service.lat, service.lng]}
                        eventHandlers={{
                            click: () => onSelect(service),
                        }}
                    >
                        <Popup>
                            <strong>{service.name}</strong>
                            <br />
                            {service.address}, {service.city}
                            <br />
                            <button
                                className="popup-button"
                                onClick={() => onSelect(service)}
                            >
                                Detail servisu
                            </button>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
}
