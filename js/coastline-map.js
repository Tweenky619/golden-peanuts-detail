const coastlineCities = [
  { name: 'Oceanside', lat: 33.1959, lng: -117.3795 },
  { name: 'Carlsbad', lat: 33.1581, lng: -117.3506 },
  { name: 'Encinitas', lat: 33.0370, lng: -117.2920 },
  { name: 'Solana Beach', lat: 32.9912, lng: -117.2711 },
  { name: 'Del Mar', lat: 32.9595, lng: -117.2653 },
  { name: 'La Jolla', lat: 32.8328, lng: -117.2713 },
  { name: 'Pacific Beach', lat: 32.8026, lng: -117.2570 },
  { name: 'Mission Beach', lat: 32.7709, lng: -117.2520 },
];

const coastlineMapEl = document.getElementById('coastline-map');

if (coastlineMapEl && window.L) {
  const map = L.map('coastline-map', { scrollWheelZoom: false }).setView([32.98, -117.28], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  L.polyline(coastlineCities.map((c) => [c.lat, c.lng]), {
    color: '#1c93a0',
    weight: 5,
    opacity: 0.55,
    lineCap: 'round',
  }).addTo(map);

  coastlineCities.forEach((city) => {
    const icon = L.divIcon({
      className: 'mascot-pin',
      html: `<img src="images/step-shine-mascot.png" alt="" style="border-color:#1c93a0">`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20],
    });

    L.marker([city.lat, city.lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${city.name}</strong><br>Mobile Service Available`);
  });
}
