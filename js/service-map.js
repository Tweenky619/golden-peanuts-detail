const serviceAreas = [
  { name: 'North County', color: '#2e8b57', cities: [
    { name: 'Poway', lat: 32.9628, lng: -117.0359 },
    { name: 'Ramona', lat: 33.0417, lng: -116.8676 },
    { name: 'Carlsbad', lat: 33.1581, lng: -117.3506 },
    { name: 'Oceanside', lat: 33.1959, lng: -117.3795 },
    { name: 'Rancho Santa Fe', lat: 33.0197, lng: -117.2020 },
    { name: 'Temecula', lat: 33.4936, lng: -117.1484 },
  ]},
  { name: 'East County', color: '#f5a623', cities: [
    { name: 'La Mesa', lat: 32.7678, lng: -117.0231 },
    { name: 'El Cajon', lat: 32.7948, lng: -116.9625 },
    { name: 'Santee', lat: 32.8384, lng: -116.9739 },
    { name: 'Spring Valley', lat: 32.7448, lng: -116.9989 },
    { name: 'Lemon Grove', lat: 32.7425, lng: -117.0314 },
    { name: 'Rancho San Diego', lat: 32.7581, lng: -116.9436 },
    { name: 'Lakeside', lat: 32.8628, lng: -116.9231 },
    { name: 'Alpine', lat: 32.8353, lng: -116.7664 },
  ]},
  { name: 'Central San Diego', color: '#7c5cf0', cities: [
    { name: 'Pacific Beach', lat: 32.7981, lng: -117.2359 },
    { name: 'La Jolla', lat: 32.8328, lng: -117.2713 },
    { name: 'Mira Mesa', lat: 32.9106, lng: -117.1417 },
    { name: 'Scripps Ranch', lat: 32.9067, lng: -117.1108 },
    { name: 'Mission Beach', lat: 32.7703, lng: -117.2515 },
    { name: 'Kearny Mesa', lat: 32.8203, lng: -117.1425 },
    { name: 'Clairemont', lat: 32.8261, lng: -117.2019 },
    { name: 'City Heights', lat: 32.7489, lng: -117.1108 },
    { name: 'Allied Gardens', lat: 32.7900, lng: -117.0817 },
    { name: 'Skyline', lat: 32.7089, lng: -117.0500 },
  ]},
  { name: 'South Bay', color: '#1c93a0', cities: [
    { name: 'Bonita', lat: 32.6592, lng: -117.0033 },
    { name: 'National City', lat: 32.6781, lng: -117.0992 },
    { name: 'Chula Vista', lat: 32.6401, lng: -117.0842 },
    { name: 'San Ysidro', lat: 32.5544, lng: -117.0325 },
    { name: 'La Presa', lat: 32.6892, lng: -117.0114 },
  ]},
];

const mapEl = document.getElementById('service-map');

if (mapEl && window.L) {
  const map = L.map('service-map', { scrollWheelZoom: false }).setView([32.82, -117.05], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  serviceAreas.forEach((area) => {
    area.cities.forEach((city) => {
      const icon = L.divIcon({
        className: 'mascot-pin',
        html: `<img src="images/step-shine-mascot.png" alt="" style="border-color:${area.color}">`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      L.marker([city.lat, city.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${city.name}</strong><br>${area.name}`);
    });
  });
}
