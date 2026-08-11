"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";

export function LiveLocationMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const coordinates = { lat: 10.77222, lng: 78.66778 };
  const locationState = "Default location: Edamalaipatti Pudur, Trichy.";

  const mapsUrl = useMemo(() => {
    const query = encodeURIComponent("Edamalaipatti Pudur, Tiruchirappalli, Tamil Nadu");
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 13,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
      fadeAnimation: false,
      zoomAnimation: false,
    //   markerDragAnimation: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      keepBuffer: 2,
    }).addTo(map);

    const marker = L.circleMarker([coordinates.lat, coordinates.lng], {
      radius: 10,
      color: "#1f4de8",
      fillColor: "#1aa58d",
      fillOpacity: 0.9,
      weight: 3,
    }).addTo(map);

    marker.bindPopup(`Edamalaipatti Pudur, Trichy<br />Lat: ${coordinates.lat.toFixed(5)}<br />Lng: ${coordinates.lng.toFixed(5)}`);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [coordinates.lat, coordinates.lng]);

  return (
    <div className="live-map-shell">
      <div className="live-map-status-row">
        <p className="live-map-status">{locationState}</p>
        <a className="live-map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open in Maps</a>
      </div>
      <div ref={mapContainerRef} className="live-map-canvas" />
    </div>
  );
}