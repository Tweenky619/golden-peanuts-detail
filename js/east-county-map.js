const eastCountyCities = [
  { name: 'El Cajon', lat: 32.7948, lng: -116.9625 },
  { name: 'La Mesa', lat: 32.7678, lng: -117.0231 },
  { name: 'Santee', lat: 32.8384, lng: -116.9739 },
  { name: 'Lemon Grove', lat: 32.7425, lng: -117.0314 },
  { name: 'Spring Valley', lat: 32.7448, lng: -116.9989 },
];

const eastCountyMapEl = document.getElementById('east-county-map');

if (eastCountyMapEl && window.L) {
  const map = L.map('east-county-map', { scrollWheelZoom: false }).setView([32.79, -117.0], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  L.polyline(eastCountyCities.map((c) => [c.lat, c.lng]), {
    color: '#f5a623',
    weight: 5,
    opacity: 0.55,
    lineCap: 'round',
  }).addTo(map);

  eastCountyCities.forEach((city) => {
    const icon = L.divIcon({
      className: 'mascot-pin',
      html: `<img src="images/step-shine-mascot.png" alt="" style="border-color:#f5a623">`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20],
    });

    L.marker([city.lat, city.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${city.name}</strong><br>Mobile Service Available`);
  });
}
