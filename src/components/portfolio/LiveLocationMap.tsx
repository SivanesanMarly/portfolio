"use client";

import { useEffect, useMemo } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

type Coordinates = {
  lat: number;
  lng: number;
  accuracy: number;
};

const fallbackCoordinates: Coordinates = {
  lat: 10.77222,
  lng: 78.66778,
  accuracy: 0,
};

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);

  return null;
}

export function LiveLocationMap() {
  const coordinates = fallbackCoordinates;
  const locationState = "Default location: Edamalaipatti Pudur, Trichy.";

  const mapsUrl = useMemo(() => {
    const query = encodeURIComponent("Edamalaipatti Pudur, Tiruchirappalli, Tamil Nadu");
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, []);

  return (
    <div className="live-map-shell">
      <div className="live-map-status-row">
        <p className="live-map-status">{locationState}</p>
        <a className="live-map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Maps
        </a>
      </div>
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="live-map-canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker
          center={[coordinates.lat, coordinates.lng]}
          radius={10}
          pathOptions={{
            color: "#1f4de8",
            fillColor: "#1aa58d",
            fillOpacity: 0.9,
            weight: 3,
          }}
        >
          <Popup>
            Edamalaipatti Pudur, Trichy
            <br />
            Lat: {coordinates.lat.toFixed(5)}
            <br />
            Lng: {coordinates.lng.toFixed(5)}
          </Popup>
        </CircleMarker>
        <RecenterMap lat={coordinates.lat} lng={coordinates.lng} />
      </MapContainer>
    </div>
  );
}
