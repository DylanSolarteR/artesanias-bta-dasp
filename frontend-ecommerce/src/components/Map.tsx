import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@/app/icons/UserIcon.svg?url";

interface GoogleMapProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers: { position: google.maps.LatLngLiteral; title: string }[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, center, zoom, markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = (): void => {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.id = "google-maps-script";
        script.async = true;
        script.defer = true;

        script.onload = initMap;

        document.body.appendChild(script);
      } else if (window.google) {
        initMap();
      }
    };

    const initMap = (): void => {
      if (mapRef.current && !map) {
        const newMap = new google.maps.Map(mapRef.current, {
          center,
          zoom,
        });
        setMap(newMap);

        const renderer = new google.maps.DirectionsRenderer();
        renderer.setMap(newMap);
        setDirectionsRenderer(renderer);

        markers.forEach(({ position, title }) => {
          const marker = new google.maps.Marker({
            position,
            map: newMap,
            title,
            icon: {
              url: "https://img.icons8.com/?size=100&id=65004&format=png&color=000000",
              scaledSize: new google.maps.Size(50, 50),
              anchor: new google.maps.Point(25, 50),
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="info-window">
                <Image src=${SearchIcon.src} alt="search" width={20} height={20} />
                <p>${title}</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(newMap, marker);
          });
        });
      }
    };

    const getUserLocation = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location: google.maps.LatLngLiteral = {
              lat: latitude,
              lng: longitude,
            };
            setUserLocation(location);

            if (map) {
              map.setCenter(location);
              new google.maps.Marker({
                position: location,
                map,
                title: "Mi ubicación",
                icon: {
                  url: "https://img.icons8.com/?size=100&id=IFhxBaYSUYkJ&format=png&color=000000",
                  scaledSize: new google.maps.Size(50, 50),
                  anchor: new google.maps.Point(25, 50),
                },
              });
            }
          },
          (error) => {
            console.error("Error obteniendo la ubicación del usuario:", error);
          }
        );
      } else {
        console.error("Geolocalización no soportada por este navegador.");
      }
    };

    loadGoogleMapsScript();
    getUserLocation();

    return () => {
      if (map) {
        directionsRenderer?.setMap(null);
        setMap(null);
      }
    };
  }, [apiKey, center, zoom, markers, map]);

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }} ref={mapRef} />
    </div>
  );
};

export default GoogleMap;
