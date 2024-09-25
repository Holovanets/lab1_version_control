export default function calculateDistance(latUser: number, lonUser: number, latPlace: number, lonPlace: number) {
  const earthRadius = 6371e3; // радиус Земли в метрах
  const phi1 = latUser * Math.PI / 180; // φ, λ в радианах
  const phi2 = latPlace * Math.PI / 180;
  const deltaPhi = (latPlace - latUser) * Math.PI / 180;
  const deltaLambda = (lonPlace - lonUser) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c; // в метрах
  
  return distance;
}

