let map;
let kpuLibraryLocation = { lat: 49.1743, lng: -122.8492 }; // KPU Surrey Library location coordinates
let userLocation;

// Initialize map
function initMap() {
  map = document.getElementById("map");
  map.innerHTML = ""; // Clear map container

  // Create map element
  let mapElement = document.createElement("div");
  mapElement.style.width = "100%";
  mapElement.style.height = "100%";
  map.appendChild(mapElement);

  // Create map using Leaflet library
  let leafletMap = L.map(mapElement).setView(kpuLibraryLocation, 15);

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>",
    subdomains: ["a", "b", "c"],
  }).addTo(leafletMap);

  // Add marker for KPU Surrey Library
  let libraryMarker = L.marker(kpuLibraryLocation).addTo(leafletMap);

  // Get user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Add marker for user location
        let userMarker = L.marker(userLocation).addTo(leafletMap);

        // Calculate distance
        calculateDistance();
      },
      () => {
        console.error("Error getting user location");
      }
    );
  } else {
    console.error("Geolocation not supported");
  }
}

// Calculate distance between user location and KPU Surrey Library
function calculateDistance() {
  let distance = getDistance(userLocation, kpuLibraryLocation);
  document.getElementById("distance").innerHTML = `You are ${distance.toFixed(2)} km away from KPU Surrey Library`;
}

// Calculate distance between two points using Haversine formula
function getDistance(point1, point2) {
  let R = 6371; // Radius of the earth in km
  let lat1 = point1.lat * Math.PI / 180;
  let lon1 = point1.lng * Math.PI / 180;
  let lat2 = point2.lat * Math.PI / 180;
  let lon2 = point2.lng * Math.PI / 180;

  let dLat = lat2 - lat1;
  let dLon = lon2 - lon1;

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  return distance;
}

initMap();
