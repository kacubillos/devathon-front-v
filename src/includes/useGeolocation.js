export async function useGeolocation() {
  let coords = { lat: 0, lng: 0 }; // Default coords

  return new Promise((resolve, reject) => {
    // Checks if navigator & geolocation are supported by the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.lat = position.coords.latitude;
          coords.lng = position.coords.longitude;

          resolve(coords);
        },
        () => {
          reject({
            error:
              "El servicio de Geolocalización ha fallado. Verifica que el navegador tenga permiso para tener tu localización.",
          });
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      reject({ error: "Tu navegador no soporta el servicio de Geolocalización." });
      // Browser doesn't support Geolocation
    }
  });
}
