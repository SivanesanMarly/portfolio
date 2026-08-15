export function LiveLocationMap() {
  return (
    <div className="live-map-shell">
      <div className="live-map-status-row">
        <p className="live-map-status">Default location: Edamalaipatti Pudur, Trichy.</p>
        <a
          className="live-map-link"
          href="https://www.google.com/maps/search/?api=1&query=Edamalaipatti+Pudur+Trichy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Maps
        </a>
      </div>

      <iframe
        className="live-map-canvas"
        title="Edamalaipatti Pudur, Trichy map"
        src="https://www.google.com/maps?q=10.77222,78.66778&z=13&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
