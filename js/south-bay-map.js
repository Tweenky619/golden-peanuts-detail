const southBayCities = [
  { name: 'Chula Vista', lat: 32.6401, lng: -117.0842 },
  { name: 'National City', lat: 32.6781, lng: -117.0992 },
  { name: 'Bonita', lat: 32.6592, lng: -117.0033 },
  { name: 'Imperial Beach', lat: 32.5836, lng: -117.1131 },
  { name: 'Otay Mesa', lat: 32.5706, lng: -117.0533 },
];

const southBayMapEl = document.getElementById('south-bay-map');

if (southBayMapEl && window.L) {
  const map = L.map('south-bay-map', { scrollWheelZoom: false }).setView([32.63, -117.07], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  L.polyline(southBayCities.map((c) => [c.lat, c.lng]), {
    color: '#1c93a0',
    weight: 5,
    opacity: 0.55,
    lineCap: 'round',
  }).addTo(map);

  southBayCities.forEach((city) => {
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
